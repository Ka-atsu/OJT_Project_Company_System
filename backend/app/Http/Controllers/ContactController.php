<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'captcha' => 'required'
        ]);

        // Send email
        Mail::raw(
            "Name: {$validated['name']}\n" .
                "Email: {$validated['email']}\n\n" .
                "Message:\n{$validated['message']}",
            function ($message) use ($validated) {
                $message->to('tallaferkent775@gmail.com')
                    ->subject($validated['subject']);
            }
        );

        return response()->json([
            'message' => 'Message sent successfully!'
        ]);
    }
}
