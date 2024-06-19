<?php

function generateUniqueFileName($originalName) {
  $randomString = bin2hex(random_bytes(8));
  $timestamp = time();
  $fileExtension = pathinfo($originalName, PATHINFO_EXTENSION);

  // Elimina la extensión del nombre original
  $originalNameWithoutExtension = pathinfo($originalName, PATHINFO_FILENAME);

  $uniqueFileName = $randomString . '_' . $timestamp . '_' . $originalNameWithoutExtension;
  return $uniqueFileName;
}

// Obtiene el nombre original del archivo del formulario
$originalFileName = $_FILES['file']['name'];

// Genera el nombre único
$uniqueFileName = generateUniqueFileName($originalFileName);

// Devuelve el nombre único en formato JSON
echo json_encode(['status' => 'success', 'uniqueFileName' => $uniqueFileName]);
