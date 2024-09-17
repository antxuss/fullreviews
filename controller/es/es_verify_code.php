<?php
session_start();

try {
    header('Content-Type: application/json');

    $data = json_decode(file_get_contents("php://input"), true);

    // Depuración: Verifica si los datos JSON fueron recibidos correctamente
    if ($data === null) {
        echo json_encode(['success' => false, 'error' => 'Datos JSON no válidos.']);
        exit;
    }

    $email = $data['correo'] ?? null;
    $codigo = $data['codigo'] ?? null;

    // Depuración: Asegúrate de que el correo y código no sean nulos
    if (is_null($email) || is_null($codigo)) {
        echo json_encode(['success' => false, 'error' => 'Correo o código no proporcionados.']);
        exit;
    }

    if (isset($_SESSION['verification_code']) && isset($_SESSION['verification_email'])) {
        // Depuración: Comprobando la correspondencia de correo y código
        if ($_SESSION['verification_email'] === $email && $_SESSION['verification_code'] == $codigo) {
            echo json_encode(['success' => true]);

            unset($_SESSION['verification_code']);
            unset($_SESSION['verification_email']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Código de verificación incorrecto.']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No se encontró un código de verificación válido.']);
    }
} catch (Exception $e) {
    // Depuración: Capturando la excepción y mostrando el mensaje
    echo json_encode(['success' => false, 'error' => 'Excepción del servidor: ' . $e->getMessage()]);
}
