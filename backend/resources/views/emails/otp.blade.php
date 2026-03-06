<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>
        {{ $purpose === 'two_factor' ? 'Two-Factor Authentication Code' : 'Email Verification Code' }}
    </title>
</head>

<body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
    <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:40px; border-radius:12px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

        <h1 style="color:#1e3a8a; margin-bottom:16px;">
            {{ $purpose === 'two_factor' ? 'Two-Factor Authentication' : 'Verify Your Email' }}
        </h1>

        <p style="font-size:16px; color:#444; margin-bottom:24px;">
            {{ $purpose === 'two_factor'
                ? 'Use the code below to complete your sign in.'
                : 'Use the verification code below to confirm your email address.' }}
        </p>

        <div style="display:inline-block; padding:18px 32px; background:#f3f4f6; border-radius:10px; font-size:36px; font-weight:bold; letter-spacing:10px; color:#222; margin-bottom:24px;">
            {{ $code }}
        </div>

        <p style="font-size:14px; color:#666; margin-bottom:12px;">
            This code will expire in a few minutes.
        </p>

        <p style="font-size:14px; color:#999;">
            If you did not request this, you can safely ignore this email.
        </p>

        <hr style="margin:32px 0; border:none; border-top:1px solid #eee;">

        <p style="font-size:12px; color:#aaa;">
            © {{ date('Y') }} Cliberduche. All rights reserved.
        </p>
    </div>
</body>

</html>