<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

include_once('../../model/es/es_userIncidentsModel.php');

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$reason = $data['reason'];
$details = $data['details'];

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['success'] = false;
    $response['message'] = "Correo electrónico inválido o vacío.";
    echo json_encode($response);
    exit;
}

$incidents = new es_userIncidentsModel();
$incidents->setCorreo($email);
$incidents->setRazon($reason);
$incidents->setDetalles($details);

$result = $incidents->saveUserIncident();

$response = array();

if ($result) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'contactosilverhand@gmail.com'; // Tu email SMTP completo
        $mail->Password = 'immk slrb ilgo ogmp';     // Contraseña de aplicación generada
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;           

        $mail->setFrom('contactosilverhand@gmail.com', 'Soporte');
        $mail->addAddress($email); 
        
        $mail->isHTML(true);                                  
        $mail->Subject = 'Confirmación de incidencia recibida';
        $mail->Body    = 'Gracias por ponerte en contacto con nosotros. Hemos recibido tu incidencia y la atenderemos lo antes posible.';

        $mail->send();
        $response['success'] = true;
        $response['message'] = 'Incidencia guardada y correo enviado correctamente.';
    } catch (Exception $e) {
        $response['success'] = false;
        $response['message'] = "Incidencia guardada pero fallo en el envío del correo: {$mail->ErrorInfo}";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Error al guardar la incidencia.";
}

header('Content-Type: application/json'); 
echo json_encode($response);



?>