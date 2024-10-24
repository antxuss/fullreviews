<?php
// Iniciar sesión si es necesario
session_start();

// Verificar que la solicitud sea una DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Obtener los datos de la solicitud JSON
    $input = json_decode(file_get_contents('php://input'), true);

    // Verificar que se haya recibido el nombre de la imagen
    if (isset($input['imageName'])) {
        $imageName = $input['imageName'];
        $imagePath = '../view/img/img-users/' . $imageName; // Asegúrate de que esta ruta sea correcta

        // Verificar si la imagen existe
        if (file_exists($imagePath)) {
            // Intentar eliminar la imagen
            if (unlink($imagePath)) {
                // Imagen eliminada con éxito
                echo json_encode(['success' => true]);
            } else {
                // Error al eliminar la imagen
                echo json_encode(['success' => false, 'error' => 'No se pudo eliminar la imagen.']);
            }
        } else {
            // La imagen no existe
            echo json_encode(['success' => false, 'error' => 'La imagen no existe.']);
        }
    } else {
        // No se recibió el nombre de la imagen
        echo json_encode(['success' => false, 'error' => 'No se recibió el nombre de la imagen.']);
    }
} else {
    // Método no permitido
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido.']);
}
?>
