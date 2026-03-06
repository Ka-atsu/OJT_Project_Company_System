<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use App\Mail\OtpMail;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request)
    {
        $request->ensureIsNotRateLimited();

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        if ($user->two_factor_enabled) {
            $code = rand(100000, 999999);
            $email = $user->email;

            $user->otp_code = $code;
            $user->otp_purpose = 'two_factor';
            $user->otp_expires_at = now()->addMinutes(5);
            $user->save();

            $request->session()->put('pending_2fa_user_id', $user->id);
            $request->session()->put('pending_2fa_remember', $request->boolean('remember'));

            Mail::to($email)->queue(new OtpMail($code, 'two_factor'));

            return response()->json([
                'requires_2fa' => true,
            ]);
        }

        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        return response()->noContent();
    }

    public function verifyTwoFactor(Request $request)
    {
        $request->validate([
            'code' => ['required'],
        ]);

        $userId = $request->session()->get('pending_2fa_user_id');

        if (! $userId) {
            return response()->json([
                'message' => 'No pending two-factor authentication request found.',
            ], 422);
        }

        $user = User::find($userId);

        if (! $user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        if (
            $user->otp_code != $request->code ||
            $user->otp_purpose !== 'two_factor' ||
            ! $user->otp_expires_at ||
            now()->gt($user->otp_expires_at)
        ) {
            return response()->json([
                'message' => 'Invalid or expired two-factor code.',
            ], 422);
        }

        $remember = $request->session()->pull('pending_2fa_remember', false);

        $user->otp_code = null;
        $user->otp_purpose = null;
        $user->otp_expires_at = null;
        $user->save();

        $request->session()->forget('pending_2fa_user_id');

        Auth::login($user, $remember);
        $request->session()->regenerate();

        return response()->noContent();
    }

    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
