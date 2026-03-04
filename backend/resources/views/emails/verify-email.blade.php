<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
            <td align="center">

                <table width="520" cellpadding="0" cellspacing="0" style="background:white; border-radius:8px; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

                    <tr>
                        <td align="center">

                            <h2 style="margin:0; color:#333;">Verify Your Email</h2>

                            <p style="color:#666; margin-top:10px;">
                                Use the verification code below to confirm your email address.
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:30px 0;">

                            <div style="
display:inline-block;
font-size:32px;
letter-spacing:8px;
font-weight:bold;
background:#f4f6f8;
padding:16px 30px;
border-radius:6px;
color:#333;
">
                                {{ $code }}
                            </div>

                        </td>
                    </tr>

                    <tr>
                        <td align="center">

                            <p style="color:#777; font-size:14px;">
                                This code will expire in a few minutes.
                            </p>

                            <p style="color:#999; font-size:13px;">
                                If you didn't request this verification, you can safely ignore this email.
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-top:30px; font-size:12px; color:#aaa;">
                            © {{ date('Y') }} Cliberduche. All rights reserved.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>