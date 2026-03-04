<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class EmailVerificationMail extends Mailable
{
    public $code;

    public function __construct($code)
    {
        $this->code = $code;
    }

    public function build()
    {
        return $this->subject('Email Verification Code')
            ->view('emails.verify-email')
            ->with([
                'code' => $this->code
            ]);
    }
}
