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
$services = filter_var($_POST["services"], FILTER_SANITIZE_STRING);

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

$mail->Subject = 'Kaliforniadoll - Appointment made by '.$name;
$mail->Body    = $name.' wants to make an appointment on '.$time.'. Customers phone number is '.$phone;

// Send an email
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

?>