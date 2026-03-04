<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\Notification;

class NotificationService
{
    public static function send(
        User $user,
        string $type,
        string $message,
        $relatedId = null,
        $relatedType = null
    ) {

        /*
        |-----------------------------------------
        | Save notification in database
        |-----------------------------------------
        */
        Notification::create([
            'user_id' => $user->id,
            'type' => $type,
            'message' => $message,
            'related_id' => $relatedId,
            'related_type' => $relatedType,
        ]);

        /*
        |-----------------------------------------
        | Only send email if user enabled it
        |-----------------------------------------
        */

        if (!$user->account_activity_notifications) {
            return;
        }

        Mail::raw($message, function ($mail) use ($user, $type) {
            $mail->to($user->email)
                ->subject("Notification: {$type}");
        });
    }
}
