<?php
session_start();
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        throw new Exception('Datos no válidos.');
    }

    $email = $data['correo'];
    $purpose = $data['propósito'];

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Correo electrónico no válido.');
    }

    $verificationCode = rand(100000, 999999);
    $_SESSION['verification_code'] = $verificationCode;
    $_SESSION['verification_email'] = $email;

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'contactosilverhand@gmail.com'; // CAMBIAR POR CORREO DE SITIO WEB
    $mail->Password = 'immk slrb ilgo ogmp'; // Contraseña de aplicación acvt fzpm slhs lzpm
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('contactosilverhand@gmail.com', 'Servicio Tecnico');
    $mail->addAddress($email);

    $mail->isHTML(true);

    switch ($purpose) {
        case 'forgot-password':
            $mail->Subject = 'Código de Recuperación de Contraseña';
            $mail->Body    = "Hola,<br><br>Tu código de recuperación de contraseña es: <strong>$verificationCode</strong>.<br><br>Utiliza este código para recuperar tu contraseña.<br><br>Saludos,<br>Tu equipo";
            break;
        case 'forgot-username':
            $mail->Subject = 'Código de Recuperación de Nombre de Usuario';
            $mail->Body    = "Hola,<br><br>Tu código de recuperación de nombre de usuario es: <strong>$verificationCode</strong>.<br><br>Utiliza este código para recuperar tu nombre de usuario.<br><br>Saludos,<br>Tu equipo";
            break;
        case 'account-create-problem':
            $mail->Subject = 'Código para Problema de Creación de Cuenta';
            $mail->Body    = "Hola,<br><br>Tu código para resolver el problema de creación de cuenta es: <strong>$verificationCode</strong>.<br><br>Utiliza este código para resolver el problema.<br><br>Saludos,<br>Tu equipo";
            break;
        case 'account-suspended':
            $mail->Subject = 'Código para Problema de Cuenta Suspendida';
            $mail->Body    = "Hola,<br><br>Tu código para resolver el problema de cuenta suspendida es: <strong>$verificationCode</strong>.<br><br>Utiliza este código para resolver el problema.<br><br>Saludos,<br>Tu equipo";
            break;
        default:
            throw new Exception('Propósito no válido.');
    }

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Correo de verificación enviado.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'No se pudo enviar el correo de verificación. Error: ' . $e->getMessage()]);
}
?>
