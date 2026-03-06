<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $code;
    public string $purpose;

    public function __construct(string $code, string $purpose)
    {
        $this->code = $code;
        $this->purpose = $purpose;
    }

    public function build()
    {
        $subject = $this->purpose === 'two_factor'
            ? 'Your Two-Factor Authentication Code'
            : 'Email Verification Code';

        return $this->subject($subject)
            ->view('emails.otp');
    }
}
