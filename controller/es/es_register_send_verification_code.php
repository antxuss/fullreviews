<?php
session_start(); // Iniciar la sesión al principio del script
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        throw new Exception('Datos no válidos.');
    }

    $name = $data['nombre'];
    $firstlastname = $data['apellido1'];
    $secondlastname = $data['apellido2'];    
    $email = $data['correo'];
    $username = $data['usuario'];
    $password = $data['password'];

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
    $mail->Username = 'contactosilverhand@gmail.com'; //CAMBIAR POR CORREO DE SITIO WEB
    $mail->Password = 'immk slrb ilgo ogmp'; // Contraseña de aplicación
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('contactosilverhand@gmail.com', 'Servicio Tecnico');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'Código de Verificación';
    $mail->Body    = "Hola $name $firstlastname $secondlastname,<br><br>Tu código de verificación es: <strong>$verificationCode</strong>.<br><br>Utiliza este código para completar tu registro.<br><br>Saludos,<br>Tu equipo";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Correo de verificación enviado.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'No se pudo enviar el correo de verificación. Error: ' . $e->getMessage()]);
}
?>
