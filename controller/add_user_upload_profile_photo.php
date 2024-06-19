<?php
// Establecer el directorio de destino para las imágenes
$uploadDirectory = realpath('../view/img/img-users/') . '/';

header('Content-Type: application/json');  // Agrega esta línea

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Verificar si no hubo errores en la carga
    if ($file['error'] === UPLOAD_ERR_OK) {
        // Obtener información del archivo
        $fileName = basename($file['name']);
        $uniqueFileName = pathinfo($fileName, PATHINFO_FILENAME); // Utiliza el nombre único del cliente

        // Añadir la extensión ".jpg" al nombre del archivo
        $uploadPath = $uploadDirectory . $uniqueFileName . '.jpg';

        // Mover la imagen al directorio de destino
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            // Devolver la información en formato JSON
            echo json_encode([
                'status' => 'success',
                'imageUrl' => $uploadPath,
                'uniqueFileName' => $uniqueFileName,
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Error al mover la imagen al directorio de destino.',
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error en la carga de la imagen.',
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Solicitud no válida.',
    ]);
}
?>
