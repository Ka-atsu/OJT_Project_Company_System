<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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
}
