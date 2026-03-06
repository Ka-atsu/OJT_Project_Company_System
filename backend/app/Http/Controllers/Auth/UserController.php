<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;

class UserController extends Controller
{
    /* Get authenticated user */
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    /* Update name */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $user = $request->user();

        $user->update([
            'name' => $request->name,
        ]);

        return response()->json($user);
    }

    /* Update email */
    public function updateEmail(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:users,email'],
        ]);

        $user = $request->user();

        $user->update([
            'email' => $request->email,
            'email_verified_at' => null,
            'otp_code' => null,
            'otp_purpose' => null,
            'otp_expires_at' => null,
        ]);

        return response()->json($user);
    }

    /* Change password */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect.'],
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password updated successfully.',
        ]);
    }

    /* Toggle 2FA */
    public function toggleTwoFactor(Request $request)
    {
        $request->validate([
            'enabled' => ['required', 'boolean'],
        ]);

        $user = $request->user();

        $user->update([
            'two_factor_enabled' => $request->enabled,
        ]);

        return response()->json([
            'message' => 'Two-factor authentication updated.',
        ]);
    }

    /* Delete account */
    public function destroy(Request $request)
    {
        $user = $request->user();
        $user->delete();

        return response()->json([
            'message' => 'Account deleted successfully.',
        ]);
    }

    public function toggleNotifications(Request $request)
    {
        $request->validate([
            'enabled' => ['required', 'boolean'],
        ]);

        $user = $request->user();

        $user->update([
            'account_activity_notifications' => $request->enabled,
        ]);

        return response()->json([
            'message' => 'Notification settings updated.',
            'account_activity_notifications' => $user->account_activity_notifications,
        ]);
    }

    public function sendVerification(Request $request)
    {
        $user = $request->user();

        $code = rand(100000, 999999);

        $user->otp_code = $code;
        $user->otp_purpose = 'email_verification';
        $user->otp_expires_at = now()->addMinutes(10);
        $user->save();

        Mail::to($user->email)->send(new OtpMail($code, 'email_verification'));

        return response()->json([
            'message' => 'Verification code sent'
        ]);
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'code' => ['required']
        ]);

        $user = $request->user();

        if (
            $user->otp_code != $request->code ||
            $user->otp_purpose !== 'email_verification' ||
            !$user->otp_expires_at ||
            now()->gt($user->otp_expires_at)
        ) {
            return response()->json([
                'message' => 'Invalid or expired verification code'
            ], 422);
        }

        $user->email_verified_at = now();
        $user->otp_code = null;
        $user->otp_purpose = null;
        $user->otp_expires_at = null;
        $user->save();

        return response()->json([
            'message' => 'Email verified successfully'
        ]);
    }

    public function sendTwoFactorCode(Request $request)
    {
        $user = $request->user();

        if (!$user->two_factor_enabled) {
            return response()->json([
                'message' => 'Two-factor authentication is not enabled.'
            ], 422);
        }

        $code = rand(100000, 999999);

        $user->otp_code = $code;
        $user->otp_purpose = 'two_factor';
        $user->otp_expires_at = now()->addMinutes(5);
        $user->save();

        Mail::to($user->email)->send(new OtpMail($code, 'two_factor'));

        return response()->json([
            'message' => 'Two-factor code sent.'
        ]);
    }

    public function verifyTwoFactorCode(Request $request)
    {
        $request->validate([
            'code' => ['required']
        ]);

        $user = $request->user();

        if (
            $user->otp_code != $request->code ||
            $user->otp_purpose !== 'two_factor' ||
            !$user->otp_expires_at ||
            now()->gt($user->otp_expires_at)
        ) {
            return response()->json([
                'message' => 'Invalid or expired two-factor code'
            ], 422);
        }

        $user->otp_code = null;
        $user->otp_purpose = null;
        $user->otp_expires_at = null;
        $user->save();

        return response()->json([
            'message' => 'Two-factor authentication successful'
        ]);
    }
}
