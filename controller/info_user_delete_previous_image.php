<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
$response = [];

try {
    // Definir la ruta base para las imágenes
    define('IMG_UPLOADS_PATH', '../view/img/img-users/');

    // Obtener el nombre de la imagen anterior del cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['imageName'])) {
        throw new Exception('No se proporcionó un nombre de imagen válido.');
    }
    $oldImageName = $data['imageName'];

    // Verificar si existe un nombre de imagen anterior
    if (!empty($oldImageName)) {
        $target_file = IMG_UPLOADS_PATH . $oldImageName;

        // Verificar si el archivo existe y eliminarlo
        if (file_exists($target_file) && unlink($target_file)) {
            $response['success'] = 'Imagen anterior eliminada correctamente.';
        } else {
            throw new Exception('Error al eliminar imagen anterior.');
        }
    } else {
        throw new Exception('No se proporcionó un nombre de imagen anterior válido.');
    }

} catch (Exception $e) {
    $response['error'] = 'Excepción capturada: ' . $e->getMessage();
}

echo json_encode($response);
?>
