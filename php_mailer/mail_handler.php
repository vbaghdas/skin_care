<?php

require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail->Host = 'smtp.gmail.com';
$mail->isSMTP();
$mail->SMTPAuth = true;

$name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
$visitor_email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
$phone = filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
$time = filter_var($_POST["time"], FILTER_SANITIZE_STRING);

$mail->Username = EMAIL_USER;
$mail->Password = EMAIL_PASS;

$mail->SMTPSecure = 'tls';
$mail->Port = 587;
$mail->smtpConnect($options);

$mail->From = $visitor_email;
$mail->FromName = $name;
$mail->addAddress('skinbykandice@yahoo.com', 'Kandice Sullivan');
$mail->addReplyTo($visitor_email);                          

$mail->isHTML(true);

$message  = "<html><body>";
$message .= "<table width='100%' bgcolor='#e0e0e0' cellpadding='0' cellspacing='0' border='0'>";
$message .= "<tr><td>";
$message .= "<table align='center' width='100%' border='0' cellpadding='0' cellspacing='0' style='max-width:650px; background-color:#fff; font-family:Verdana, Geneva, sans-serif;'>";
$message .= "<thead>
                <tr height='80'>
                <th colspan='4' style='background-color:#7a7a7a; border-bottom: dashed #FFB6C1 2px;' >
                    <h1 style='color: #fff'>Appointment</h1>
                </th>
                </tr>
             </thead>";
    
$message .= "<tbody>
                <tr>
                <td colspan='4' style='padding:15px 30px; color: #333;'>
                    <p style='font-size: 14px; color: #333;'>Name: ".$name."</p>
                    <p style='font-size: 14px; color: #333;'>Time: ".$time."</p>
                    <p style='font-size: 14px; color: #333;'>Phone:".$phone."</p>
                    <p style='font-size: 14px; color: #333;'>Email: ".$visitor_email."</p>
                </td>
                </tr>
                
                <tr height='80'>
                    <td colspan='4' align='center' style='background-color:#f5f5f5; border-top: dashed #FFB6C1 2px; font-size:14px;'>
                        <label></label>
                    </td>
                </tr>
            </tbody>";
    
$message .= "</table>";
$message .= "</td></tr>";
$message .= "</table>";
$message .= "</body></html>";

$mail->Subject = 'Kaliforniadoll - Appointment made by '.$name;
$mail->Body    = $message;

// Send an email
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

?>