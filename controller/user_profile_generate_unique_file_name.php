<?php

function generateUniqueFileName($originalName) {
  $randomString = bin2hex(random_bytes(8)); // Genera una cadena aleatoria
  $timestamp = time(); // Obtiene el timestamp actual

  // Cambia la extensión a jpg
  $fileExtension = 'jpg'; // Usar .jpg en lugar de la extensión original

  // Estructura del nombre de archivo deseada
  $uniqueFileName = $randomString . '_' . $timestamp . '_blob.' . $fileExtension; // Crea el nombre siguiendo el formato requerido
  return $uniqueFileName;
}

// Obtiene el nombre original del archivo del cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);
$originalFileName = $input['fileName'] ?? 'default.jpg'; // Valor por defecto si no se recibe

// Genera el nombre único
$uniqueFileName = generateUniqueFileName($originalFileName);

// Devuelve el nombre único en formato JSON
echo json_encode(['status' => 'success', 'uniqueFileName' => $uniqueFileName]);
