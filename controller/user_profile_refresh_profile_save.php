<?php
include_once('../model/es/es_usersModel.php');

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);
$users = new es_usersModel();
$response = array();

if (isset($data['id'])) {
    $id = $data['id'];
    $users->setId_usuario($id);

    // Obtener datos del usuario
    if ($users->showUserProfile()) {
        // Obtener el nombre de la imagen de perfil anterior
        $previousProfileImage = $users->getFoto_perfil();

        // Comprobar si hay una nueva imagen en $_FILES
        if (isset($_FILES['nueva_imagen']) && !empty($_FILES['nueva_imagen']['name'])) {
            // Guardar la nueva imagen
            $newImageName = uniqid() . "_" . basename($_FILES['nueva_imagen']['name']);
            $targetPath = "../view/img/img-users/" . $newImageName;

            if (move_uploaded_file($_FILES['nueva_imagen']['tmp_name'], $targetPath)) {
                // Actualizar la imagen de perfil en la base de datos
                $users->setFoto_perfil($newImageName);
                if ($users->showUserProfile()) {
                    $response['status'] = 'success';
                    $response['message'] = 'Imagen actualizada con éxito';
                    $response['foto_perfil'] = $newImageName;

                    // Eliminar la imagen anterior si existe
                    if (!empty($previousProfileImage) && file_exists("../view/img/img-users/" . $previousProfileImage)) {
                        unlink("../view/img/img-users/" . $previousProfileImage);
                    }
                } else {
                    $response['status'] = 'error';
                    $response['message'] = 'No se pudo actualizar la imagen en la base de datos.';
                }
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Error al subir la nueva imagen.';
            }
        } else {
            // Si no se sube una nueva imagen, solo actualizar otros detalles del perfil
            if ($users->showUserProfile()) {
                $response['status'] = 'success';
                $response['message'] = 'Perfil actualizado con éxito';
                $response['foto_perfil'] = $previousProfileImage; // Mantener la imagen anterior
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Error al actualizar el perfil.';
            }
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error al obtener los datos del perfil.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'ID de usuario no proporcionado.';
}

echo json_encode($response);
unset($response);
unset($users);
?>
