
document.addEventListener("DOMContentLoaded", function (event) {

  loggedVerify();
  showUserModal();
  document.querySelector('#modal-delete-button-yes').addEventListener('click', logOut);
  document.querySelector('#logout').addEventListener('click', ModalLogout);
  document.querySelector('#bars-icon').addEventListener('click', DeploySidebarMenu);
  document.querySelector('#bars-icon-sidebar').addEventListener('click', HideSidebarMenu);
  document.querySelector('.slidebar-menu-next-menu').addEventListener('click', Sidebarmenuicon);
  document.querySelector('#user-profile-info').addEventListener('click', ModalUserProfile);
  document.querySelector('#sidebar-menu-home').addEventListener('click', SideBarShowHome);
  document.querySelector('#sidebar-menu-tasks').addEventListener('click', SideBarShowTasks);
  //document.querySelector('#modal-delete-user-button-yes').addEventListener('click', deleteUser);
  var boton = document.querySelector('#modal-delete-user-button-yes');
  boton.addEventListener('click', function () {
    imgDeleteUser();
  });
  var cardIconsContainers = document.querySelectorAll('.card-icons-container-user-favorite');

  cardIconsContainers.forEach(function (container) {
    container.addEventListener('click', function () {
      var idValue = this.getAttribute('data-value-id');
      console.log("idvalueee11: " + idValue);
    });
  });
  usersList();
  addUserProfileImage(); //HACE QUE addUserFirstLetter DEJE DE FUNCIONAR NO SE PORQUE
  filterChechboxUsersAdmin();

  // Add event listeners to ensure "Usuarios" and "Administradores" cannot be selected at the same time
  var usersCheckbox = document.getElementById('filter-users');
  var adminsCheckbox = document.getElementById('filter-admins');

  usersCheckbox.addEventListener('change', function () {
    if (this.checked) {
      adminsCheckbox.disabled = true;
    } else {
      adminsCheckbox.disabled = false;
    }
  });

  adminsCheckbox.addEventListener('change', function () {
    if (this.checked) {
      usersCheckbox.disabled = true;
    } else {
      usersCheckbox.disabled = false;
    }
  });

  function loggedVerify() {
    var url = "../controller/es/es_logged_verify.php";

    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);

        if (result.error !== "logged") {
          window.location.href = "../es/login.html"; // Redirige si no está logueado
        } else {
          console.log("tipoo " + result.tipo_usuario);
          if (result.tipo_usuario !== "Administrador") {
            window.location.href = "../es/index.html"; // Si no es administrador, redirige a la página principal
          }
        }
      })
      .catch(error => console.error('Error status:', error));
  }

  function logOut() {

    var url = "../controller/es/es_log_out.php";

    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json()).then(result => {

        window.location.href = "../es/index.html";
      })
      .catch(error => console.error('Error status:', error));

  }


  var nameInput = document.getElementById('modal-add-user-content-form-column-2-input-name');
  var firstLastNameInput = document.getElementById('modal-add-user-content-form-column-2-input-first-last-name');
  var secondLastNameInput = document.getElementById('modal-add-user-content-form-column-2-input-second-last-name');
  var addressInput = document.getElementById('modal-add-user-content-form-column-3-input-address');
  nameInput.addEventListener('input', addUserFirstLetter);
  firstLastNameInput.addEventListener('input', addUserFirstLetter);
  secondLastNameInput.addEventListener('input', addUserFirstLetter);
  addressInput.addEventListener('input', addUserAddressCheck);
  var infonameInput = document.getElementById('modal-info-user-content-form-column-2-input-name');
  var infofirstLastNameInput = document.getElementById('modal-info-user-content-form-column-2-input-first-last-name');
  var infosecondLastNameInput = document.getElementById('modal-info-user-content-form-column-2-input-second-last-name');
  var infoaddressInput = document.getElementById('modal-info-user-content-form-column-3-input-address');
  infonameInput.addEventListener('input', addUserFirstLetter);
  infofirstLastNameInput.addEventListener('input', addUserFirstLetter);
  infosecondLastNameInput.addEventListener('input', addUserFirstLetter);
  infoaddressInput.addEventListener('input', addUserAddressCheck);

  addUserTlf();
  infoUserFixErrorTlf();

})
// Obtén los elementos del menú superior y lateral
const topbarItems = document.querySelectorAll('.control-panel-topbar a');
const sidebarItems = document.querySelectorAll('.control-panel-sidebar a');

// Agrega un event listener a cada elemento del menú superior
topbarItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    // Oculta todos los elementos del menú lateral
    sidebarItems.forEach(sidebarItem => sidebarItem.classList.add('hidden'));
    // Muestra el elemento correspondiente del menú lateral
    const target = e.target.getAttribute('data-target');
    document.querySelector(`.control-panel-sidebar a[data-id="${target}"]`).classList.remove('hidden');
  });
});

function DeploySidebarMenu() {

  var sidebar = document.querySelector('.control-panel-sidebar');
  var barsicon = document.querySelector('#bars-icon');
  var sidebarbarsicon = document.querySelector('.sidebar-bars-icon');
  var barsiconsidebar = document.querySelector('#bars-icon-sidebar');

  barsiconsidebar.style.cursor = "pointer";

  sidebarbarsicon.style.display = "flex";
  sidebarbarsicon.style.justifyContent = "center";
  sidebarbarsicon.style.transform = "translateY(-90px)";

  barsicon.style.display = "none";
  barsicon.style.cursor = "pointer";

  sidebar.style.transform = "translateX(0px)";
  sidebar.style.transition = "0.5s";
  sidebar.style.position = "fixed";
  sidebar.style.zIndex = 2;


}

function HideSidebarMenu() {

  var sidebar = document.querySelector('.control-panel-sidebar');
  var barsicon = document.querySelector('#bars-icon');

  sidebar.style.transform = "translateX(-300px)";
  sidebar.style.transition = "0.5s";

  barsicon.style.display = "flex";
  barsicon.style.transition = "0.5s";


}

window.addEventListener('resize', function () {
  var sidebar = document.querySelector('.control-panel-sidebar');
  var barsicon = document.querySelector('#bars-icon');
  if (window.innerWidth > 650) {
    sidebar.style.transform = "translateX(0px)";
    sidebar.style.transition = "0s";
  } else {
    sidebar.style.transform = "translateX(-300px)";
    sidebar.style.transition = "0s";
    barsicon.style.display = "flex";
  }
});


function Sidebarmenuicon() {
  var sidebarhover = document.querySelector('.sidebar-menu-next-menu-click-menu');
  var sidebarmenunext = document.querySelector('.slidebar-menu-next-menu');
  var sidebarmenu = document.querySelector('sidebar-menu');
  var sidebarmenuexpand = document.querySelectorAll('.sidebar-menu-expand');

  // sidebarmenu.style.backgroundColor="white";
  // sidebarhover.style.position="relative";
  // sidebarhover.style.marginTop="5px";
  // sidebarhover.style.display="block";

  for (var i = 0; i < sidebarmenuexpand.length; i++) {
    sidebarmenuexpand[i].style.display = "none";

    if (sidebarmenuexpand[i].value == "0") { //si el menú está oculto
      sidebarmenuexpand[i].style.display = "block"; //muestra el menú
      sidebarmenunext.style.transform = "rotate(90deg)";
      sidebarmenuexpand[i].value = "1";

    } else { //si el menú está visible
      sidebarmenuexpand[i].style.display = "none"; //oculta el menú
      sidebarmenunext.style.transform = "rotate(0deg)";
      sidebarmenuexpand[i].value = "0";
    }

  }

}

/************************USERS LIST*********************************** */

//PROBLEMAS: CUANDO ACTUALIZO NOMBRE USUARIO DE ADMIN Y RECARGO LA PAGINA SE VUELVE USUARIO AUTOMATICAMENTE Y ENCIMA NO SE ACTUALIZA AUTOMARICAMENTE LA INFO EN EL PERFIL

document.getElementById("modal-user-profile-close-button").addEventListener("click", function () {
  document.getElementById("modal-user-profile").style.display = "none";
});

let actualPassword = '';

//ASIGNAR EL VALOR DE LA IMAGEN EN VALUE O ALGO PARA DESPUES EN OTRAS FUNCIONES RECOGERLO PARA PODER BORRAR LA IMAGEN ANTERIOR

function showUserModal() {
  fetch('../controller/es/es_logged_verify.php')
    .then(res => res.json())
    .then(result => {
      if (result.error === "logged") {
        // Actualizamos los campos con los datos del perfil
        document.getElementById("user-profile-info-img").src = result.foto_perfil || "../view/img/logoProvisional.jpg";
        document.getElementById("user-profile-info-name").innerText = result.nombre_usuario;
        document.getElementById("modal-user-profile-content-form-container-1-username").innerText = result.nombre_usuario;
        document.getElementById("modal-user-profile-content-form-container-2-user-profile-img").src = result.foto_perfil;

        const profileImageElement = document.getElementById("modal-user-profile-content-form-container-2-user-profile-img");

// Extraer solo el nombre del archivo de la URL
const imageUrl = result.foto_perfil;
const imageName = imageUrl ? imageUrl.split('/').pop() : "logoProvisional.jpg"; // Si no hay imagen, usar "logoProvisional.jpg"

// Asignar el nombre de la imagen como valor del atributo 'data-profile-image'
profileImageElement.setAttribute('data-profile-image', imageName);


        // Actualizamos los inputs con los valores de perfil
        document.getElementById("modal-user-profile-content-form-container-2-info-column-label-name").value = result.nombre;
        document.getElementById("modal-user-profile-content-form-container-2-info-column-label-first-last-name").value = result.apellido_1;
        document.getElementById("modal-user-profile-content-form-container-2-info-column-label-second-last-name").value = result.apellido_2;
        document.getElementById("modal-user-profile-content-form-container-2-info-column-label-mail").value = result.correo;
        document.getElementById("modal-user-profile-content-form-container-2-info-column-label-tlf").value = result.telefono;
        document.getElementById("modal-user-profile-content-form-container-2-info-column-label-address").value = result.direccion;

        // Actualizamos la contraseña y tipo de usuario
        // Obtiene la contraseña real
actualPassword = result.contrasena; 
console.log("actualPassworddd "+actualPassword);

// Encriptar la contraseña
var encryptedPassword = CryptoJS.AES.encrypt(actualPassword, 'your-secret-key').toString(); 

console.log("encryptedPasswordddd "+encryptedPassword);

// Establecer la contraseña encriptada en el input
document.getElementById("modal-user-profile-password").setAttribute('data-encrypted-password', encryptedPassword);

// Establecer la contraseña real (no visible) en un atributo del input
document.getElementById("modal-user-profile-password").setAttribute('data-original-password', actualPassword);

  //SE VEN ** Y NO LA CONTRASEÑA REAL, y data-original-password="********" se ve asi, pinta estar mal
        document.getElementById("modal-user-profile-content-form-container-2-info-column-label-user-type").value = result.tipo_usuario;

        // Asignamos el valor del ID al botón "Editar"
        var editButton = document.getElementById("edit-profile-button");
        editButton.setAttribute('data-id', result.id_usuario);  // Asignar el ID del usuario como atributo

      } else {
        window.location.href = "../es/index.html";
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}



document.getElementById('toggle-password-visibility').addEventListener('click', function () {
  const passwordInput = document.getElementById("modal-user-profile-password");
    const currentType = passwordInput.getAttribute('type');

    if (currentType === 'password') {
        // Obtener la contraseña encriptada
        const encryptedPassword = passwordInput.getAttribute('data-encrypted-password');
        
        // Desencriptar la contraseña usando la clave secreta
        const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, 'your-secret-key').toString(CryptoJS.enc.Utf8);

        // Mostrar la contraseña desencriptada
        passwordInput.setAttribute('type', 'text');
        passwordInput.value = decryptedPassword;
    } else {
        // Volver a ocultar la contraseña con asteriscos
        passwordInput.setAttribute('type', 'password');
        //passwordInput.value = '********';
    }
});


document.getElementById('edit-profile-button').addEventListener('click', function () {
  toggleEditMode(true);
});

document.getElementById('exit-edit-mode-button').addEventListener('click', function () {
  toggleEditMode(false);
});

function toggleEditMode(editMode) {
  const fields = [
    document.getElementById("modal-user-profile-content-form-container-2-info-column-label-name"),
    document.getElementById("modal-user-profile-content-form-container-2-info-column-label-first-last-name"),
    document.getElementById("modal-user-profile-content-form-container-2-info-column-label-second-last-name"),
    document.getElementById("modal-user-profile-content-form-container-2-info-column-label-mail"),
    document.getElementById("modal-user-profile-content-form-container-2-info-column-label-tlf"),
    document.getElementById("modal-user-profile-content-form-container-2-info-column-label-address"),
    document.getElementById("modal-user-profile-content-form-container-2-info-column-label-user-type"),
    document.getElementById("modal-user-profile-password")
  ];

  const overlay = document.getElementById('overlay-edit');

  if (editMode) {
    fields.forEach(function (field) {
      field.removeAttribute('readonly');
      field.classList.add('editable');
    });

    overlay.style.display = 'flex';
    document.getElementById('exit-edit-mode-button').style.display = 'flex';
    document.getElementById('edit-profile-button').style.display = 'none';
    document.getElementById('save-profile-button').style.display = 'flex'; // Mostrar botón Guardar

  } else {
    fields.forEach(function (field) {
      field.setAttribute('readonly', true);
      field.classList.remove('editable');
    });

    overlay.style.display = 'none'; // Ocultar overlay en modo normal
    document.getElementById('exit-edit-mode-button').style.display = 'none';
    document.getElementById('edit-profile-button').style.display = 'flex';
    document.getElementById('save-profile-button').style.display = 'none'; // Ocultar botón Guardar
  }
}

var originalValues = {}; // Para almacenar los valores originales
var editoriginalImageSrc = ""; // Para almacenar la URL de la imagen original
var editoriginalImageDataValue = ""; // Para almacenar el atributo data-value de la imagen original

var btnEdit = document.querySelector('#edit-profile-button');
var btnExit = document.querySelector('#exit-edit-mode-button'); // Selecciona el botón de salir
var overlay = document.getElementById('overlay-user-profile-edit'); // Selecciona el overlay
var profileImgWrapper = document.querySelector('.profile-img-wrapper');

btnEdit.addEventListener('click', function () {
  // Solo guardar los valores originales si no se han guardado ya
  if (Object.keys(originalValues).length === 0) {
    console.log("Guardando valores originales..."); // Depuración

    var inputs = document.querySelectorAll('.modal-user-profile-content-form-container-2-info-column-1 input, .modal-user-profile-content-form-container-2-info-column-2 input');
    inputs.forEach(function (input) {
      originalValues[input.id] = input.value; // Guardar el valor original
      console.log("Guardado:", input.id, input.value); // Depuración
    });

    // Guardar el valor original de la contraseña
    var passwordInput = document.querySelector('#modal-user-profile-password');
    if (passwordInput) {
      originalValues[passwordInput.id] = passwordInput.value; // Guardar contraseña (aunque puede ser asteriscos)
      console.log("Guardado valor de contraseña:", passwordInput.value); // Depuración
    }

    // Guardar la imagen de perfil original
    var editProfileImage = document.querySelector('.profileImage-edit');
    editoriginalImageSrc = editProfileImage.src; // Guardar la URL original de la imagen
    editoriginalImageDataValue = editProfileImage.getAttribute('data-value'); // Guardar el data-value original
    console.log("Guardada imagen de perfil original:", editoriginalImageSrc);
  }

  // Añadir los bordes a los inputs y habilitar edición
  var inputs = document.querySelectorAll('.modal-user-profile-content-form-container-2-info-column-1 input, .modal-user-profile-content-form-container-2-info-column-2 input');
  inputs.forEach(function (input) {
    input.removeAttribute('readonly'); // Permitir edición
    input.style.border = "1px solid #ccc"; // Añadir borde en modo edición
  });

  // Permitir edición de la contraseña
  var passwordInput = document.querySelector('#modal-user-profile-password');
  if (passwordInput) {
    passwordInput.removeAttribute('readonly');
    passwordInput.style.border = "1px solid #ccc"; // Añadir borde en modo edición
  }

  // Reemplazar el input de tipo de usuario por un select
  var userTypeInput = document.querySelector('#modal-user-profile-content-form-container-2-info-column-label-user-type');
  originalValues[userTypeInput.id] = userTypeInput.value; // Guardar el valor original
  var userTypeSelect = document.createElement('select');
  userTypeSelect.className = "modal-add-user-content-form-column-3-select";
  userTypeSelect.innerHTML = `
        <option value="Usuario" ${userTypeInput.value === 'Usuario' ? 'selected' : ''}>Usuario</option>
        <option value="Administrador" ${userTypeInput.value === 'Administrador' ? 'selected' : ''}>Administrador</option>
    `;
  userTypeSelect.id = userTypeInput.id;
  userTypeInput.replaceWith(userTypeSelect); // Reemplazar input por select

  // Mostrar botones de guardar y salir
  document.querySelector('#save-profile-button').style.display = "flex";
  btnExit.style.display = "flex"; // Mostrar botón de salir

  // Ocultar el botón de editar
  btnEdit.style.display = "none";

  // Mostrar el overlay
  overlay.style.display = 'flex';
  overlay.style.opacity = '1'; // Asegúrate de que la opacidad sea visible
});

// Manejador para el botón de salir
// btnExit.addEventListener('click', function () {
//   // Revertir cambios y restaurar valores originales
//   var inputs = document.querySelectorAll('.modal-user-profile-content-form-container-2-info-column-1 input, .modal-user-profile-content-form-container-2-info-column-2 input');
//   inputs.forEach(function (input) {
//     input.value = originalValues[input.id] || ""; // Restaurar el valor original
//     input.setAttribute('readonly', 'readonly'); // Volver a poner readonly
//     input.style.border = "none"; // Quitar borde
//   });

//   // Restaurar la contraseña
//   var passwordInput = document.querySelector('#modal-user-profile-password');
//   if (passwordInput) {
//     passwordInput.value = originalValues[passwordInput.id] || ""; // Restaurar contraseña
//     passwordInput.setAttribute('readonly', 'readonly');
//     passwordInput.style.border = "none"; // Quitar borde
//   }

//   // Restaurar el input de tipo de usuario
//   var userTypeSelect = document.querySelector('.modal-add-user-content-form-column-3-select');
//   if (userTypeSelect) {
//     var userTypeInput = document.createElement('input');
//     userTypeInput.type = 'text'; // Cambia a 'text' o el tipo original que tenías
//     userTypeInput.id = userTypeSelect.id;
//     userTypeInput.value = originalValues[userTypeSelect.id] || ""; // Restaurar valor original
//     userTypeSelect.replaceWith(userTypeInput); // Reemplazar select por input
//   }

//   // Ocultar los botones de guardar y salir
//   document.querySelector('#save-profile-button').style.display = "none";
//   btnExit.style.display = "none"; // Ocultar botón de salir

//   // Mostrar el botón de editar
//   btnEdit.style.display = "flex";

//   // Ocultar el overlay
//   overlay.style.display = 'none'; // Ocultar el overlay al salir del modo de edición
// });


// Función para salir del modo de edición y restaurar valores originales
var btnExit = document.querySelector('#exit-edit-mode-button');
btnExit.addEventListener('click', function () {
  console.log("Saliendo del modo de edición..."); // Depuración

  var overlay = document.querySelector('#overlay-edit');
  overlay.style.display = "none";

  var inputs = document.querySelectorAll('.modal-user-profile-content-form-container-2-info-column-1 input, .modal-user-profile-content-form-container-2-info-column-2 input');
  inputs.forEach(function (input) {
    if (originalValues[input.id] !== undefined) {
      console.log("Restaurando:", input.id, "a", originalValues[input.id]); // Depuración
      input.value = originalValues[input.id]; // Restaurar el valor original
      input.setAttribute('readonly', 'readonly'); // Volver a bloquear edición
      input.style.border = "none"; // Quitar borde en modo no edición
    }
  });

  // Restaurar el valor original de la contraseña
  var passwordInput = document.querySelector('#modal-user-profile-password');
  if (passwordInput && originalValues[passwordInput.id] !== undefined) {
    passwordInput.value = originalValues[passwordInput.id]; // Restaurar contraseña original
    console.log("Restaurando valor de contraseña a:", originalValues[passwordInput.id]); // Depuración
    passwordInput.setAttribute('readonly', 'readonly'); // Bloquear edición de la contraseña
    passwordInput.style.border = "none"; // Quitar borde en modo no edición
  }

  // Restaurar el select de tipo de usuario a un input de texto con readonly
  var userTypeSelect = document.querySelector('.modal-add-user-content-form-column-3-select');
  if (userTypeSelect) {
    var userTypeInput = document.createElement('input');
    userTypeInput.id = userTypeSelect.id;
    userTypeInput.className = 'modal-user-profile-content-form-container-2-info-column-label-user-type';
    userTypeInput.value = originalValues[userTypeSelect.id]; // Restaurar el valor original
    userTypeInput.setAttribute('readonly', 'readonly'); // Volver a solo lectura
    userTypeInput.style.border = "none"; // Quitar borde para que parezca solo lectura
    userTypeSelect.replaceWith(userTypeInput); // Reemplazar select por input
  }

  // Restaurar la imagen de perfil original solo si no ha sido cambiada
  var editProfileImage = document.querySelector('.profileImage-edit');
  if (editoriginalImageSrc && editProfileImage.src !== editoriginalImageSrc) {
    editProfileImage.src = editoriginalImageSrc; // Restaurar la URL de la imagen original
    editProfileImage.setAttribute('data-value', editoriginalImageDataValue); // Restaurar el data-value original
    console.log("Imagen de perfil restaurada a:", editoriginalImageSrc);
  }

  // Mostrar u ocultar el icono de eliminar imagen según el estado original
  var editRemoveImageIcon = document.querySelector('.removeImageIcon-edit');
  if (editoriginalImageSrc.includes('perfil-de-usuario-provisional.webp')) {
    editRemoveImageIcon.style.display = 'none';
  } else {
    editRemoveImageIcon.style.display = 'block';
  }

  // Destruir el cropper si estaba en uso
  if (editcropper) {
    editcropper.destroy();
    editcropper = null;
  }

  resetFileInput(); // Restablecer el input de archivos

  // Mostrar botón de editar y ocultar los de guardar y salir
  btnEdit.style.display = "flex";
  document.querySelector('#save-profile-button').style.display = "none";
  btnExit.style.display = "none";
});


var userProfileUniqueFileName = ''; // Variable global para almacenar el nombre único

function userProfileGenerateUniqueFileName() {
  return fetch('../controller/user_profile_generate_unique_file_name.php', {
    method: 'POST',
    body: JSON.stringify({}), // Puedes enviar un cuerpo vacío o algún valor si lo necesitas
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener el nombre único: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    if (data.status === 'success') {
      userProfileUniqueFileName = data.uniqueFileName; // Guardar el nombre en la variable global
      return userProfileUniqueFileName; // Devolver el nombre único generado
    } else {
      throw new Error('Error en la respuesta del servidor: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error en la generación del nombre único:', error);
  });
}



document.getElementById("save-profile-button").addEventListener('click', saveUserProfileChanges);

var userProfileUniqueFileName = '';
var foto_perfil_src;

// Función para guardar los cambios en el perfil de usuario
var previousProfileImageName = ''; // Asegúrate de tener esta variable en un alcance accesible

// function saveUserProfileChanges() {
//   // Capturar los valores de los campos del perfil
//   var nombre = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-name").value;
//   var primerApellido = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-first-last-name").value;
//   var segundoApellido = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-second-last-name").value;
//   var correo = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-mail").value;
//   var telefono = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-tlf").value;
//   var direccion = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-address").value;

//   // Capturar correctamente el valor de la contraseña
//   const encryptedPassword = document.getElementById("modal-user-profile-password").getAttribute('data-encrypted-password');
    
//   // Desencriptar la contraseña justo antes de enviarla
//   const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, 'your-secret-key').toString(CryptoJS.enc.Utf8);

//   // Capturar el tipo de usuario
//   var tipoUsuario = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-user-type").value;

//   // Capturar el nombre de usuario
//   var nombre_usuario = document.getElementById("modal-user-profile-content-form-container-1-username") ? document.getElementById("modal-user-profile-content-form-container-1-username").innerText : null;

//   // Obtener solo el nombre del archivo de la imagen
//   foto_perfil_src = document.getElementById("modal-user-profile-content-form-container-2-user-profile-img").src;
  
//   // Generar un nombre único para la imagen
//   var tipo_imagen = foto_perfil_src.split(';')[0].split('/')[1]; // Extraer el tipo de imagen (e.g., 'png')
//   var nombre_unico = `foto_perfil_${Date.now()}.${tipo_imagen}`;

//   // Llamar al controlador para obtener un nombre único para la foto de perfil
//   fetch('../controller/user_profile_generate_unique_file_name.php', {  //CUANDO NO CAMBIO LA FOTO DE PERFIL EVITARLO DE ALGUNA FORMA
//       method: 'POST',
//       body: JSON.stringify({ fileName: nombre_unico }), // Enviar el nombre único
//       headers: {
//           'Content-Type': 'application/json'
//       }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Error al llamar al controlador: ' + response.statusText);
//     }
//     return response.json();
//   })
//   .then(data => {
//     if (data.status === 'success') {
//       var foto_perfil = data.uniqueFileName;

//       userProfileUniqueFileName = foto_perfil;

//       // Recuperar el ID del usuario desde el botón "Editar"
//       var userId = document.getElementById("edit-profile-button").getAttribute('data-id');

//       // Crear objeto con los datos del perfil
//       var userData = {
//         'id': userId,
//         'nombre': nombre,
//         'primerApellido': primerApellido,
//         'segundoApellido': segundoApellido,
//         'correo': correo,
//         'telefono': telefono,
//         'direccion': direccion,
//         'tipo': tipoUsuario,
//         'nombre_usuario': nombre_usuario,
//         'password': decryptedPassword,
//         'foto_perfil': foto_perfil // Usar el nombre único de la imagen
//       };

//       // Enviar los datos al servidor usando fetch
//       return fetch('../controller/es/es_update_user.php', {
//         method: 'POST',
//         body: JSON.stringify(userData),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//     } else {
//       throw new Error('Error al obtener el nombre único del archivo: ' + data.message);
//     }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Error al actualizar el perfil: ' + response.statusText);
//     }
//     return response.json();
//   })
//   .then(result => {
//     // if (result.success) {
//       showNotification('Perfil actualizado correctamente', 5000);
//       // Guardar la imagen en local después de la actualización del perfil
//       console.log("actualizado!");
//       userProfileSaveImage();
      
//       // Actualiza el nombre de la imagen anterior con el nuevo nombre
//       var imageElement = document.getElementById("modal-user-profile-content-form-container-2-user-profile-img");
//       previousProfileImageName = imageElement.getAttribute('data-profile-image'); // Asumiendo que este atributo se actualiza con el nuevo nombre de archivo

//       var userId = document.getElementById("edit-profile-button").getAttribute('data-id');
//       fetchUpdatedUserProfile(userId);

//       //deletePreviousProfileImage(foto_perfil_src);
//     // } else {
//     //   showNotification('Error al actualizar el perfil', 5000);
//     // }
//   })
//   .catch(error => {
//     console.error("Error al actualizar el perfil:", error);
//     showNotification('Error al actualizar el perfil', 5000);
//   });
// }
var profileImageChanged = false; // Variable para indicar si la imagen ha sido cambiada


function saveUserProfileChanges() {
  // Capturar los valores de los campos del perfil
  var nombre = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-name").value;
  var primerApellido = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-first-last-name").value;
  var segundoApellido = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-second-last-name").value;
  var correo = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-mail").value;
  var telefono = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-tlf").value;
  var direccion = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-address").value;

  // Capturar correctamente el valor de la contraseña
  const encryptedPassword = document.getElementById("modal-user-profile-password").getAttribute('data-encrypted-password');
  const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, 'your-secret-key').toString(CryptoJS.enc.Utf8);

  var tipoUsuario = document.getElementById("modal-user-profile-content-form-container-2-info-column-label-user-type").value;
  var nombre_usuario = document.getElementById("modal-user-profile-content-form-container-1-username") ? document.getElementById("modal-user-profile-content-form-container-1-username").innerText : null;

  // Obtener el src actual de la imagen de perfil
  var currentProfileImageSrc = document.getElementById("modal-user-profile-content-form-container-2-user-profile-img").src;

  // Obtener el nombre de archivo de la imagen actual y de la imagen original
  var imageElement = document.getElementById('modal-user-profile-content-form-container-2-user-profile-img');
  var originalProfileImageSrc = imageElement.getAttribute('data-profile-image'); // Nombre original
  var currentProfileImageName = currentProfileImageSrc.split('/').pop(); // Nombre actual

  // Verificar si la imagen ha cambiado comparando el nombre de archivo
  // Verificar si la imagen ha cambiado comparando el nombre de archivo
if (currentProfileImageName !== originalProfileImageSrc) {
  profileImageChanged = true; // La imagen ha sido cambiada

  // La imagen ha cambiado, generar un nuevo nombre único para la imagen
  var tipo_imagen = currentProfileImageSrc.split(';')[0].split('/')[1]; // Extraer el tipo de imagen (e.g., 'png')
  var nombre_unico = `foto_perfil_${Date.now()}.${tipo_imagen}`;

  // Llamar al controlador para obtener un nombre único para la foto de perfil
  fetch('../controller/user_profile_generate_unique_file_name.php', {
    method: 'POST',
    body: JSON.stringify({ fileName: nombre_unico }), // Enviar el nombre único
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al llamar al controlador: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    if (data.status === 'success') {
      // Asignar el nombre único a la variable global y continuar con la actualización
      userProfileUniqueFileName = data.uniqueFileName;
      guardarPerfil(userProfileUniqueFileName, nombre, primerApellido, segundoApellido, correo, telefono, direccion, tipoUsuario, nombre_usuario, decryptedPassword);
    } else {
      throw new Error('Error al obtener el nombre único del archivo: ' + data.message);
    }
  })
  .catch(error => {
    console.error("Error al actualizar el perfil:", error);
    showNotification('Error al actualizar el perfil', 5000);
  });
} else {
  profileImageChanged = false; // La imagen no ha sido cambiada
  // La imagen no ha cambiado, usa el nombre de la imagen existente
  guardarPerfil(originalProfileImageSrc, nombre, primerApellido, segundoApellido, correo, telefono, direccion, tipoUsuario, nombre_usuario, decryptedPassword);
}

}

function guardarPerfil(foto_perfil, nombre, primerApellido, segundoApellido, correo, telefono, direccion, tipoUsuario, nombre_usuario, decryptedPassword) {
  var userId = document.getElementById("edit-profile-button").getAttribute('data-id');
  var userData = {
    'id': userId,
    'nombre': nombre,
    'primerApellido': primerApellido,
    'segundoApellido': segundoApellido,
    'correo': correo,
    'telefono': telefono,
    'direccion': direccion,
    'tipo': tipoUsuario,
    'nombre_usuario': nombre_usuario,
    'password': decryptedPassword,
    'foto_perfil': foto_perfil // Nombre de la imagen actual o nueva
  };

  fetch('../controller/es/es_update_user.php', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(result => {
    // if (result.success) {
      showNotification('Perfil actualizado correctamente', 5000);

      // Solo guardar la imagen si cambió
      if (profileImageChanged) {
        userProfileSaveImage(); // Guardar la nueva imagen
      }

      fetchUpdatedUserProfile(userId); // Actualizar el perfil
    // } else {
    //   showNotification('Error al actualizar el perfil', 5000);
    // }
  })
  .catch(error => {
    console.error("Error al actualizar el perfil:", error);
    showNotification('Error al actualizar el perfil', 5000);
  });
}



function fetchUpdatedUserProfile(userId) {
  console.log("fetchUpdatedUserProfileeee ");
  
  return fetch('../controller/user_profile_refresh_profile_save.php', {
    method: 'POST',
    body: JSON.stringify({ "id": userId }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos del perfil: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    if (data.status === 'success') {
    
      // Actualizar la imagen de perfil y su atributo data-profile-image
      var imageElement = document.getElementById("modal-user-profile-content-form-container-2-user-profile-img");
      
      // Ruta completa de la imagen (Ajusta esta ruta según sea necesario)
      var fullImageSrc = data.foto_perfil;

      console.log("fetchUpdatedUserProfileeee fullImageSrccc "+data.foto_perfil);
      
      // Extraer el nombre del archivo de la ruta completa
      var imageName = data.foto_perfil.split('/').pop(); // Solo el nombre del archivo
    
      // Actualizar el src con la ruta completa y el atributo data-profile-image con el nombre de archivo
      imageElement.src = fullImageSrc; // Actualiza la ruta completa de la imagen
      imageElement.setAttribute('data-profile-image', imageName); // Actualiza solo el nombre del archivo
    
      // Actualizar previousProfileImageName con el nuevo nombre de imagen
      previousProfileImageName = imageName;

      // Borra la imagen anterior si existe y si se ha actualizado la imagen de perfil
      if (data.previous_foto_perfil && data.previous_foto_perfil !== imageName) {
        console.log("Eliminando imagen anterior: " + data.previous_foto_perfil);
        deletePreviousImage(data.previous_foto_perfil);
      }
      
      console.log("Perfil actualizado con éxito. Nombre de la imagen: " + imageName);
    } else {
      throw new Error('Error al obtener los datos actualizados: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error al obtener los datos actualizados del perfil:', error);
  });
}

// Función para eliminar la imagen anterior en el servidor
function deletePreviousImage(imageName) {
  fetch('../controller/delete_user_profile_image.php', {
    method: 'POST',
    body: JSON.stringify({ "image_name": imageName }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al eliminar la imagen: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    if (data.status === 'success') {
      console.log("Imagen anterior eliminada con éxito: " + imageName);
    } else {
      console.error("Error al eliminar la imagen anterior: " + data.message);
    }
  })
  .catch(error => {
    console.error('Error al eliminar la imagen anterior:', error);
  });
}






function initCropper(event) {
  var image = document.getElementById('modal-user-profile-content-form-container-2-user-profile-img');
  originalImageSrc = image.src;

  var reader = new FileReader();
  reader.onload = function (e) {
    image.src = e.target.result;
    if (cropper) {
      cropper.destroy();
    }

    cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 2,
      ready: function () {
        document.getElementById('overlay-user-profile-edit').style.display = 'none';
        document.getElementById('cancel-button').style.display = 'inline-block';
        document.getElementById('save-button').style.display = 'inline-block';
      }
    });
  };
  reader.readAsDataURL(event.target.files[0]);
}

//RECOGER DE ALGUNA FORMA EL SRC Y LUEGO SOLO EL NOMBRE PARA LA FUNCION deletePreviousProfileImage
//NO ACTUALIZA EL VALOR DEL NOMBRE DE LA FOTO ACTUAL DESPUES DE CAMBIARLO 1 VEZ

var previousProfileImageName = '';

function userProfileCropImage() {
  if (cropper) {
    // Obtener el nombre actual de la imagen de perfil desde el atributo 'data-profile-image'
    var imageElement = document.getElementById('modal-user-profile-content-form-container-2-user-profile-img');
    var currentProfileImageName = imageElement.getAttribute('data-profile-image');

    // Almacenar el nombre de la imagen anterior en una variable global para su uso posterior
    previousProfileImageName = currentProfileImageName;
    console.log("Imagen de perfil original guardada:", previousProfileImageName);

    // Obtener los datos de la imagen recortada en base64
    var croppedImageDataURL = cropper.getCroppedCanvas().toDataURL('image/jpeg');

    // Convertir los datos de la imagen base64 a un archivo Blob
    croppedImageBlob = dataURLtoBlob(croppedImageDataURL); // Guardar el blob en una variable global

    // Mostrar la imagen recortada temporalmente usando la cadena base64
    imageElement.src = croppedImageDataURL; // Mostrar la imagen recortada directamente

    // Guardar el nombre actualizado globalmente para su uso posterior
    saveEditOriginalImageSrc = currentProfileImageName;

    // Limpiar el cropper
    cropper.destroy();
    cropper = null;

    // Ocultar los botones de "Cancelar" y "Guardar"
    document.getElementById('cancel-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'none';

    // Asegúrate de que el overlay se mantenga visible
    var overlayElement = document.getElementById('overlay-user-profile-edit'); // Reemplaza 'overlay-id' con el ID real de tu overlay
    overlayElement.style.display = 'block';

    // Habilitar el botón para seleccionar una nueva imagen
    // document.getElementById('select-new-image-button').style.display = 'flex'; // Asegúrate de que este botón esté correctamente configurado

    // Mostrar mensaje de éxito
    showNotification('Imagen recortada, ahora guarda los cambios del perfil', 5000);
  }
}






function userProfileSaveImage() {
  console.log("userProfileSaveImageee1");

  // Verifica si croppedImageBlob está definido
  if (typeof croppedImageBlob !== 'undefined' && croppedImageBlob) {
    console.log("userProfileSaveImageee2");

    // Crear un objeto FormData para enviar el archivo al servidor
    var formData = new FormData();
    formData.append('file', croppedImageBlob, userProfileUniqueFileName); // Usa el nombre único

    // Realizar la solicitud POST para subir la imagen al servidor
    return fetch('../controller/add_user_upload_profile_photo.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // Actualizar la imagen de perfil con la nueva imagen
        var image = document.getElementById('modal-user-profile-content-form-container-2-user-profile-img');
        image.src = URL.createObjectURL(croppedImageBlob); // Mostrar la imagen recortada en el perfil

        deletePreviousProfileImage();

        // Limpiar el cropper
        if (cropper) {
          cropper.destroy();
          cropper = null;
        }

        // Mostrar el overlay y ocultar botones de guardar/cancelar
        document.getElementById('overlay-user-profile-edit').style.display = 'flex';
        document.getElementById('cancel-button').style.display = 'none';
        document.getElementById('save-button').style.display = 'none';

        // Reiniciar el input de imagen
        document.getElementById('editImageInputEdit').value = null;

        // Mostrar mensaje de éxito
        showNotification('Imagen guardada correctamente', 5000);
      } else {
        throw new Error('Error al guardar la imagen: ' + data.message);
      }
    })
    .catch(error => {
      console.error("Error al guardar la imagen:", error);
      showNotification('Error al guardar la imagen', 5000);
    });
  } else {
    // Si no hay imagen recortada, no realizar ninguna acción relacionada con la imagen
    console.log("No se ha recortado ninguna imagen, omitiendo guardado de imagen.");
    return Promise.resolve(); // Continuar sin realizar la acción de guardar imagen
  }
}


function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}


function deletePreviousProfileImage() {
  // Asegurarse de que el nombre de la imagen anterior está definido
  if (previousProfileImageName) {
    console.log("Nombre de la imagen anterior:", previousProfileImageName);

    // Hacer una solicitud al controlador para eliminar la imagen anterior
    fetch('../controller/user_profile_delete_previous_image.php', {
      method: 'DELETE', // Cambia esto si es necesario
      body: JSON.stringify({ imageName: previousProfileImageName }), // Usar el nombre del archivo
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("Imagen anterior eliminada con éxito:", data.success);
      } else {
        console.error("Error al eliminar la imagen anterior:", data.error);
      }
    })
    .catch(error => {
      console.error("Error en la solicitud para eliminar la imagen anterior:", error);
    });
  } else {
    console.log("No hay imagen anterior para eliminar.");
  }
}





function userProfileCancelCrop() {
  if (cropper) {
    // Destruir el cropper
    cropper.destroy();
    cropper = null;

    // Ocultar los botones de guardar/cancelar y mostrar el overlay
    document.getElementById('overlay-user-profile-edit').style.display = 'flex';
    document.getElementById('cancel-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'none';

    // Revertir la imagen al estado original (antes de cualquier recorte)
    var image = document.getElementById('modal-user-profile-content-form-container-2-user-profile-img');
    
    // Siempre revertimos a la imagen original, ignorando cualquier cambio
    if (originalImageSrc) {
      image.src = originalImageSrc;  // Revertir a la imagen original
    }

    // Reiniciar el input de selección de archivo
    document.getElementById('editImageInputEdit').value = null;

    // Reiniciar cualquier variable relacionada con imágenes recortadas
    croppedImageSrc = null; // Limpiar croppedImageSrc para evitar que se use accidentalmente
    croppedImageBlob = null; // Limpiar el blob del recorte
  }
}


function deleteUserProfileImage() {
  var img = document.getElementById('modal-user-profile-content-form-container-2-user-profile-img');
  img.src = "../view/img/logoProvisional.jpg";
  originalImageSrc = img.src;
  croppedImageSrc = '';

  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  document.getElementById('cancel-button').style.display = 'none';
  document.getElementById('save-button').style.display = 'none';
  document.getElementById('overlay-user-profile-edit').style.display = 'flex';
}

var deletedProfileImageSrc = ''; // Variable global para almacenar la imagen eliminada

function deleteProfileEditUserImage() {
  var profileImgContainer = document.querySelector('.profile-img-container');
  var profileImage = profileImgContainer.querySelector('#modal-user-profile-content-form-container-2-user-profile-img');
  var removeImageIcon = profileImgContainer.querySelector('#removeImageIconEdit');

  // Guardar el src actual (nombre de la imagen original) en la variable global
  deletedProfileImageSrc = profileImage.src;
  console.log("Imagen eliminada: " + deletedProfileImageSrc); // Mensaje de depuración

  // Reemplazar con la imagen predeterminada
  profileImage.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');
  profileImage.src = '../view/img/img-users/perfil-de-usuario-provisional.webp';
  removeImageIcon.style.display = 'none';
}





// Variables globales para almacenar valores originales
// Variables globales para almacenar valores originales
var originalValues = {};
var editoriginalImageSrc = '';
var editoriginalImageDataValue = '';
var originalUserTypeValue = '';  // Nueva variable para guardar el valor original del tipo de usuario

function actionEnterEditUserProfile() {
  console.log("Entrando en el modo de edición de user profile...");

  var inputIds = [
    'modal-user-profile-content-form-container-2-info-column-label-name',
    'modal-user-profile-content-form-container-2-info-column-label-first-last-name',
    'modal-user-profile-content-form-container-2-info-column-label-second-last-name',
    'modal-user-profile-content-form-container-2-info-column-label-mail',
    'modal-user-profile-content-form-container-2-info-column-label-tlf',
    'modal-user-profile-content-form-container-2-info-column-label-address'
  ];

  inputIds.forEach(function (inputId) {
    var input = document.getElementById(inputId);
    if (input) {
      originalValues[inputId] = input.value;  // Guardar el valor original
      input.removeAttribute('readonly');
      input.style.border = "1px solid #ccc";
      input.style.backgroundColor = "#fff";
    }
  });

  // Convertir input de tipo usuario a select
  var userTypeInput = document.querySelector('#user-type-input');
  if (userTypeInput) {
    originalUserTypeValue = userTypeInput.value;  // Guardar el valor original del tipo de usuario
    var selectElement = document.createElement('select');
    selectElement.id = 'user-type-input';
    selectElement.className = 'modal-add-user-content-form-column-3-select';

    var options = ['Administrador', 'Usuario'];
    options.forEach(function (optionValue) {
      var optionElement = document.createElement('option');
      optionElement.value = optionValue;
      optionElement.textContent = optionValue;
      if (optionValue === originalUserTypeValue) {
        optionElement.selected = true;
      }
      selectElement.appendChild(optionElement);
    });

    userTypeInput.parentNode.replaceChild(selectElement, userTypeInput);
  }


  // Habilitar la edición de la contraseña
  var passwordInput = document.getElementById('modal-user-profile-password');
  if (passwordInput) {
    passwordInput.removeAttribute('readonly');
    passwordInput.style.border = "1px solid #ccc";
    passwordInput.style.backgroundColor = "#fff";

    // Mostrar el icono de visibilidad
    var eyeIcon = document.querySelector('#toggle-password-visibility');
    if (eyeIcon) {
      eyeIcon.style.display = 'inline-block'; // Asegura que el ícono esté visible
    }

    // Asegurar que el evento para alternar la visibilidad esté funcionando
    eyeIcon.addEventListener('click', function () {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    });
  }

  // Cambiar la visibilidad de los botones de guardar y salir
  document.getElementById('edit-profile-button').style.display = "none";
  document.getElementById('save-profile-button').style.display = "flex";
  document.getElementById('exit-edit-mode-button').style.display = "flex";
}


function actionExitEditUserProfile() {
  console.log("Saliendo del modo de edición de user profile...");

  var overlay = document.querySelector('#overlay-user-profile-edit');
  if (overlay) {
    overlay.style.display = "none";
  }

  // Resto del código para restaurar otros campos...
  var inputIds = [
    'modal-user-profile-content-form-container-2-info-column-label-name',
    'modal-user-profile-content-form-container-2-info-column-label-first-last-name',
    'modal-user-profile-content-form-container-2-info-column-label-second-last-name',
    'modal-user-profile-content-form-container-2-info-column-label-mail',
    'modal-user-profile-content-form-container-2-info-column-label-tlf',
    'modal-user-profile-content-form-container-2-info-column-label-user-type',
    'modal-user-profile-content-form-container-2-info-column-label-address'
  ];

  inputIds.forEach(function (inputId) {
    var input = document.getElementById(inputId);
    if (input && originalValues.hasOwnProperty(inputId)) {
      input.value = originalValues[inputId];  // Restaurar el valor original
      input.setAttribute('readonly', 'readonly');
      input.style.border = "none";
      input.style.backgroundColor = "#f9f9f9";
    }
  });

  // Restaurar el tipo de usuario a input
  var userTypeSelect = document.querySelector('#modal-user-profile-content-form-container-2-info-column-label-user-type');
  if (userTypeSelect) {
    var selectedValue = userTypeSelect.value;
    var inputElement = document.createElement('input');
    inputElement.id = 'modal-user-profile-content-form-container-2-info-column-label-user-type';
    inputElement.className = 'modal-add-user-content-form-column-3-input';
    inputElement.setAttribute('readonly', 'readonly');
    inputElement.value = selectedValue;
    inputElement.style.width = '90%';  
    inputElement.style.border = 'none';
    userTypeSelect.parentNode.replaceChild(inputElement, userTypeSelect);
  }

  // Destruir el cropper solo si está inicializado
  if (cropper) {
    cropper.destroy();
    cropper = null;

    // Ocultar botones
    document.getElementById('cancel-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'none';
  }

  // Ahora manejar la restauración de la imagen
  var image = document.getElementById('modal-user-profile-content-form-container-2-user-profile-img');

  // Comprobar si hay una imagen eliminada para restaurar
  if (deletedProfileImageSrc) {
    image.src = deletedProfileImageSrc;  // Restaurar a la imagen eliminada
    console.log("Restaurando imagen original: " + deletedProfileImageSrc); 
  } else {
    console.log("No hay imagen original para restaurar.");
  }

  var removeImageIcon = document.querySelector('#removeImageIconEdit');
  if (removeImageIcon) {
    removeImageIcon.style.display = 'block';  // Asegurarse de que el icono sea visible
  }

  // Deshabilitar interacción con la imagen
  var imageContainer = document.querySelector('.modal-info-user-content-form-column-1-input-file-image-container');
  if (imageContainer) {
    imageContainer.style.pointerEvents = 'none';
  }

  // Reiniciar el input de selección de archivo
  document.getElementById('editImageInputEdit').value = null;

  // Limpiar cualquier variable relacionada con imágenes
  croppedImageSrc = null; 
  croppedImageBlob = null; 

  // Restablecer la contraseña al valor original
  var passwordInput = document.getElementById('modal-user-profile-password');
  if (passwordInput) {
    passwordInput.value = '********'; 
    passwordInput.setAttribute('readonly', 'readonly');
    passwordInput.setAttribute('type', 'password'); 
    passwordInput.style.border = "none";
    passwordInput.style.backgroundColor = "#f9f9f9";
  }

  // Cambiar la visibilidad de los botones
  document.getElementById('edit-profile-button').style.display = "flex";
  document.getElementById('save-profile-button').style.display = "none";
  document.getElementById('exit-edit-mode-button').style.display = "none";

  // Restablecer el input de archivo
  resetFileInput();
}







// Función para restablecer el input de archivo
function resetFileInput() {
  var fileInput = document.querySelector('#editImageInputEdit');
  if (fileInput) {
    fileInput.value = ""; // Limpiar el valor del input de archivo
  }
}




//CUANDO ACTIVO EL MODO EDICION EN USER PROFILE SE ACTIVA TAMBIEN EN INFO USER


function actionProfileExitEdit() {
  console.log("Saliendo del modo de edición...");

  var overlay = document.querySelector('#overlay-edit');
  overlay.style.display = "none";

  var inputs = document.querySelectorAll('.modal-user-profile-content-form-container-2-info-column-1 input, .modal-user-profile-content-form-container-2-info-column-2 input');
  inputs.forEach(function (input) {
    if (originalValues[input.id] !== undefined) {
      console.log("Restaurando:", input.id, "a", originalValues[input.id]);
      input.value = originalValues[input.id];
      input.setAttribute('readonly', 'readonly');
    } else {
      console.error("No se encontró valor original para:", input.id);
    }
  });

  var passwordInput = document.querySelector('#modal-user-profile-password');
  if (originalValues[passwordInput.id] !== undefined) {
    console.log("Restaurando contraseña:", passwordInput.value, "a", originalValues[passwordInput.id]);
    passwordInput.value = originalValues[passwordInput.id];
    passwordInput.setAttribute('readonly', 'readonly');
  }

  var confirmPasswordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password-confirm');
  confirmPasswordInput.style.display = "none";
  confirmPasswordInput.value = "";

  document.querySelector('#edit-profile-button').style.display = "flex";
  document.querySelector('#save-profile-button').style.display = "none";
  document.querySelector('#exit-edit-mode-button').style.display = "none";

  var editProfileImage = document.querySelector('.profileImage-edit');
  var editRemoveImageIcon = document.querySelector('.removeImageIcon-edit');

  editProfileImage.src = editoriginalImageSrc;
  editProfileImage.setAttribute('data-value', editoriginalImageDataValue);

  if (editoriginalImageSrc.includes('perfil-de-usuario-provisional.webp')) {
    editRemoveImageIcon.style.display = 'none';
  } else {
    editRemoveImageIcon.style.display = 'block';
  }

  if (editcropper) {
    editcropper.destroy();
    editcropper = null;
  }
  resetFileInput();
}




let isFavorite = false;
let isSuspended = false;
let userType = '';

function filterChechboxUsersAdmin() {
  const favoriteCheckbox = document.getElementById('filter-favorites');
  const suspendedCheckbox = document.getElementById('filter-suspended');
  const userCheckbox = document.getElementById('filter-users');
  const adminCheckbox = document.getElementById('filter-admins');

  function handleCheckboxChange() {
    isFavorite = favoriteCheckbox.checked ? 'Si' : '';
    isSuspended = suspendedCheckbox.checked ? 'Si' : '';

    if (userCheckbox.checked) {
      userType = 'Usuario';
    } else if (adminCheckbox.checked) {
      userType = 'Administrador';
    } else {
      userType = '';
    }

    displayUsers();
  }

  favoriteCheckbox.addEventListener('change', handleCheckboxChange);
  suspendedCheckbox.addEventListener('change', handleCheckboxChange);
  userCheckbox.addEventListener('change', function () {
    if (userCheckbox.checked) {
      adminCheckbox.checked = false;
      adminCheckbox.disabled = true;
    } else {
      adminCheckbox.disabled = false;
    }
    handleCheckboxChange();
  });

  adminCheckbox.addEventListener('change', function () {
    if (adminCheckbox.checked) {
      userCheckbox.checked = false;
      userCheckbox.disabled = true;
    } else {
      userCheckbox.disabled = false;
    }
    handleCheckboxChange();
  });
}


function filterUsers() {
  var input = document.getElementById("search-user-input").value;
  var userListContainer = document.getElementById("control-panel-content-list");
  userListContainer.innerHTML = '';

  if (input.trim() === "") {
    console.log("ejecuta userlist");
    var userListContainer = document.getElementById("control-panel-content-list");
    userListContainer.innerHTML = '';
    usersList();
  } else {
    console.log("ejecuta el otro list");
    var userListContainer = document.getElementById("control-panel-content-list");
    userListContainer.innerHTML = '';
    inputSearchUsersList(input);
  }
}

function validateInput(input) {
  const validCharacters = /[^a-zA-Z0-9\s]/g;
  return input.replace(validCharacters, '');
}

function handleInputChange(event) {
  const searchInput = event.target;
  const inputValue = searchInput.value;

  if (!validateInput(inputValue)) {
    searchInput.value = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');
    return;
  }

  filterUsers();
}

let conexionExitosa;

async function checkConexion() {
  try {
    const response = await fetch('../controller/es/es_connection_check.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    if (data.success) {
      console.log('Conexión exitosa:', data.message);
      conexionExitosa = true;
    } else {
      console.error('Error de conexión:', data.message);
      conexionExitosa = false;
    }
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    console.error('Error específico:', error.message);
    conexionExitosa = false;
  }
}

function usersList() {

  var url = "../controller/es/es_userList.php";

  fetch(url)
    .then(res => res.json())
    .then(result => {
      var Usuarios = result.list;
      checkConexion()
        .then(() => {
          if (conexionExitosa === false) {
            console.log("La conexión fue exitosa");

            var userListContainer = document.getElementById("control-panel-content-list");
            userListContainer.innerHTML = '';

            if (Usuarios.length === 0) {
              showAlert("No hay usuarios, crea uno", 5000);
              document.getElementById("search-user-input").disabled = false;
              document.getElementById("control-panel-content-list").style.display = "none";
              document.getElementById("control-panel-content-list-no-user").style.display = "flex";
              document.getElementById("control-panel-content-list-no-user").style.overflowY = "hidden";

              document.getElementById("control-panel-content-list-no-user").insertAdjacentHTML('afterbegin', newRow1);
              document.getElementById("control-panel-content-list").innerHTML += newRow1;

              var addUserModals = document.querySelectorAll('.card-add-user-icon');
              addUserModals.forEach(function (addUserModal) {
                addUserModal.addEventListener("click", ModalAddUser);
              });



            } else {
              document.getElementById("search-user-input").disabled = false;
              document.getElementById("control-panel-content-list-no-user").style.display = "none";
              var cardLoadingElements = document.getElementsByClassName("card-loading");
              for (var i = 0; i < cardLoadingElements.length; i++) {
                cardLoadingElements[i].style.display = "none";
              }


              var newRow = "";

              newRow += "<div id='card-add-user' class='card'>";
              newRow += "<div class='card-add-user-icon'>";
              newRow += "<svg class='card-add-user-icon-icons' viewBox='0 0 448 512'>";
              newRow += "<path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />";
              newRow += "</svg>";
              newRow += "</div>";
              newRow += "<div class='card-add-user-title'>";
              newRow += "<label>Añadir usuario</label>";
              newRow += "</div>";
              newRow += "</div>";

              for (let i = 0; i < Usuarios.length; i++) {
                newRow += "<div class='card' id='main-card' >"
                  + "<img id='" + Usuarios[i].id_usuario + "' src=" + Usuarios[i].foto_perfil + ">"
                  + "<div class='card-info'>"
                  + "<label class='card-name'>" + Usuarios[i].nombre + "</label>"
                  + "<label id='card-subname' class='card-name'> " + Usuarios[i].apellido_1 + "</label>"
                  + "</div>"
                  + "<label class='card-username'>Usuario: " + Usuarios[i].nombre_usuario + "</label>"
                  + "<hr class='card-hr'>"
                  + "<div class='card-icons-container'>"
                  + "<div class='card-icons-container-user-delete' data-user-id='" + Usuarios[i].id_usuario + "'>"
                  + "<svg id='card-delete-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>"
                  + "<path d='M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-user-ban' data-user-id='" + Usuarios[i].id_usuario + "' data-ban-info='" + Usuarios[i].suspendido + "' >"
                  + "<svg id='card-ban-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>"
                  + "<path d='M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-user-favorite' data-user-id='" + Usuarios[i].id_usuario + "' data-favorite-info='" + Usuarios[i].favorito + "'>"
                  + "<svg id='card-favorite-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>"
                  + "<path id='acard-favorite-user-path' d='M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-info' data-user-id='" + Usuarios[i].id_usuario + "'>"
                  + "<svg class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>"
                  + "<path id='card-info-user' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'/>"
                  + "</svg>"
                  + "</div>"
                  + "</div>"
                  + "</div>";
              }

              document.getElementById("control-panel-content-list").innerHTML += newRow;

              /*ICONO EDITAR*/
              //+ "<svg id='card-show-update-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>"
              //+ "<path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z'/></svg>"


              var deleteUserModal = document.querySelectorAll('.card-icons-container-user-delete');
              var addUserModal = document.querySelectorAll('.card-add-user-icon');
              var banUserModal = document.querySelectorAll('.card-icons-container-user-ban');
              var favoriteUserModal = document.querySelectorAll('.card-icons-container-user-favorite');
              //var banUserModal = document.querySelectorAll('.card-icons-container-user-ban');
              var infoUserModal = document.querySelectorAll('.card-icons-container-info');

              for (let i = 0; i < deleteUserModal.length; i++) {
                deleteUserModal[i].addEventListener("click", ModalDeleteUser);
              }

              for (let i = 0; i < addUserModal.length; i++) {
                addUserModal[i].addEventListener("click", ModalAddUser);
              }

              for (let i = 0; i < infoUserModal.length; i++) {
                infoUserModal[i].addEventListener("click", ModalInfoUser);
              }


              banUserModal.forEach(function (container) {
                if (container.getAttribute('data-ban-info') === 'Si') {
                  container.style.background = 'red';
                }

                container.addEventListener('click', function () {
                  var idValue = this.getAttribute('data-user-id');
                  console.log("idvalueee11: " + idValue);
                  banUser(idValue);
                });
              });


              favoriteUserModal.forEach(function (container) {
                // Aplicar fondo amarillo a los usuarios favoritos
                if (container.getAttribute('data-favorite-info') === 'Si') {
                  container.style.background = 'yellow';
                }

                // Agregar evento de clic para marcar/desmarcar favorito
                container.addEventListener('click', function () {
                  var idValue = this.getAttribute('data-user-id');
                  console.log("idvalueee11: " + idValue);
                  favoriteUser(idValue);
                });
              });




              //document.getElementById("loading-message").style.display = "none";

            }
          } else {
            console.log("La conexión falló");
            showAlert("Error con la conexión a la base de datos", 5000);
          }
        })
        .catch(error => console.error('Error status:', error));
    });
}

function inputSearchUsersList(input) {
  var url = "../controller/es/es_input_search_users_list.php";
  var data = { 'username': input };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(result => {
      var Usuarios = result.list;
      checkConexion()
        .then(() => {
          if (conexionExitosa === false) {
            console.log("La conexión fue exitosa");

            var userListContainer = document.getElementById("control-panel-content-list");
            userListContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

            if (Usuarios.length === 0 && input.trim() === "") {
              showAlert("No hay usuarios, crea uno", 5000);
              document.getElementById("control-panel-content-list").style.display = "none";
              document.getElementById("control-panel-content-list-no-user").style.display = "flex";
              document.getElementById("control-panel-content-list-no-user").style.overflowY = "hidden";
            } else {
              document.getElementById("control-panel-content-list-no-user").style.display = "none";
              document.getElementById("control-panel-content-list").style.display = "flex";

              var newRow = "";

              // Asegurarse de que el card de "Añadir usuario" esté al principio
              newRow += "<div id='card-add-user' class='card'>";
              newRow += "<div class='card-add-user-icon'>";
              newRow += "<svg class='card-add-user-icon-icons' viewBox='0 0 448 512'>";
              newRow += "<path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />";
              newRow += "</svg>";
              newRow += "</div>";
              newRow += "<div class='card-add-user-title'>";
              newRow += "<label>Añadir usuario</label>";
              newRow += "</div>";
              newRow += "</div>";

              for (let i = 0; i < Usuarios.length; i++) {
                newRow += "<div class='card' id='main-card'>"
                  + "<img id='" + Usuarios[i].id_usuario + "' src=" + Usuarios[i].foto_perfil + ">"
                  + "<div class='card-info'>"
                  + "<label class='card-name'>" + Usuarios[i].nombre + "</label>"
                  + "<label id='card-subname' class='card-name'> " + Usuarios[i].apellido_1 + "</label>"
                  + "</div>"
                  + "<label class='card-username'>Usuario: " + Usuarios[i].nombre_usuario + "</label>"
                  + "<hr class='card-hr'>"
                  + "<div class='card-icons-container'>"
                  + "<div class='card-icons-container-user-delete' data-user-id='" + Usuarios[i].id_usuario + "'>"
                  + "<svg id='card-delete-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>"
                  + "<path d='M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-user-ban' data-user-id='" + Usuarios[i].id_usuario + "' data-ban-info='" + Usuarios[i].suspendido + "'>"
                  + "<svg id='card-ban-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>"
                  + "<path d='M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-user-favorite' data-user-id='" + Usuarios[i].id_usuario + "' data-favorite-info='" + Usuarios[i].favorito + "'>"
                  + "<svg id='card-favorite-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>"
                  + "<path id='acard-favorite-user-path' d='M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-info' data-user-id='" + Usuarios[i].id_usuario + "'>"
                  + "<svg class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>"
                  + "<path id='card-info-user' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'/>"
                  + "</svg>"
                  + "</div>"
                  + "</div>"
                  + "</div>";
              }

              userListContainer.innerHTML = newRow;

              var addUserModals = document.querySelectorAll('.card-add-user-icon');
              addUserModals.forEach(function (addUserModal) {
                addUserModal.addEventListener("click", ModalAddUser);
              });

              var deleteUserModal = document.querySelectorAll('.card-icons-container-user-delete');
              var banUserModal = document.querySelectorAll('.card-icons-container-user-ban');
              var favoriteUserModal = document.querySelectorAll('.card-icons-container-user-favorite');
              var infoUserModal = document.querySelectorAll('.card-icons-container-info');

              deleteUserModal.forEach(function (container) {
                container.addEventListener("click", ModalDeleteUser);
              });

              banUserModal.forEach(function (container) {
                if (container.getAttribute('data-ban-info') === 'Si') {
                  container.style.background = 'red';
                }
                container.addEventListener('click', function () {
                  var idValue = this.getAttribute('data-user-id');
                  banUser(idValue);
                });
              });

              favoriteUserModal.forEach(function (container) {
                if (container.getAttribute('data-favorite-info') === 'Si') {
                  container.style.background = 'yellow';
                }
                container.addEventListener('click', function () {
                  var idValue = this.getAttribute('data-user-id');
                  favoriteUser(idValue);
                });
              });

              infoUserModal.forEach(function (container) {
                container.addEventListener('click', ModalInfoUser);
              });
            }
          } else {
            console.log("La conexión falló");
            showAlert("Error con la conexión a la base de datos", 5000);
          }
        })
        .catch(error => console.error('Error status:', error));
    });
}

//ERROR Uncaught (in promise) SyntaxError: Unexpected token 'E', "Error ejec"... is not valid JSON

function displayUsers() {
  console.log("displayUsersss");
  console.log("favorito " + isFavorite);
  console.log("suispendido " + isSuspended);
  console.log("tipo us " + userType);
  var url = "../controller/es/es_checkbox_filter.php";
  var data = { 'favorito': isFavorite, 'suspendido': isSuspended, 'tipo_usuario': userType };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(result => {
      var Usuarios = result.list;
      checkConexion()
        .then(() => {
          if (conexionExitosa == false) {
            console.log("La conexión fue exitosa");

            var userListContainer = document.getElementById("control-panel-content-list");
            userListContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

            if (Usuarios.length === 0) {
              showAlert("No hay usuarios que coincidan con los filtros seleccionados", 5000);
              usersList(); // Cargar la lista completa de usuarios si no hay coincidencias
            } else {
              document.getElementById("control-panel-content-list-no-user").style.display = "none";
              document.getElementById("control-panel-content-list").style.display = "flex";

              var newRow = "";

              // Asegurarse de que el card de "Añadir usuario" esté al principio
              newRow += "<div id='card-add-user' class='card'>";
              newRow += "<div class='card-add-user-icon'>";
              newRow += "<svg class='card-add-user-icon-icons' viewBox='0 0 448 512'>";
              newRow += "<path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />";
              newRow += "</svg>";
              newRow += "</div>";
              newRow += "<div class='card-add-user-title'>";
              newRow += "<label>Añadir usuario</label>";
              newRow += "</div>";
              newRow += "</div>";

              for (let i = 0; i < Usuarios.length; i++) {
                newRow += "<div class='card' id='main-card'>"
                  + "<img id='" + Usuarios[i].id_usuario + "' src=" + Usuarios[i].foto_perfil + ">"
                  + "<div class='card-info'>"
                  + "<label class='card-name'>" + Usuarios[i].nombre + "</label>"
                  + "<label id='card-subname' class='card-name'> " + Usuarios[i].apellido_1 + "</label>"
                  + "</div>"
                  + "<label class='card-username'>Usuario: " + Usuarios[i].nombre_usuario + "</label>"
                  + "<hr class='card-hr'>"
                  + "<div class='card-icons-container'>"
                  + "<div class='card-icons-container-user-delete' data-user-id='" + Usuarios[i].id_usuario + "'>"
                  + "<svg id='card-delete-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>"
                  + "<path d='M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-user-ban' data-user-id='" + Usuarios[i].id_usuario + "' data-ban-info='" + Usuarios[i].suspendido + "'>"
                  + "<svg id='card-ban-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>"
                  + "<path d='M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-user-favorite' data-user-id='" + Usuarios[i].id_usuario + "' data-favorite-info='" + Usuarios[i].favorito + "'>"
                  + "<svg id='card-favorite-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>"
                  + "<path id='acard-favorite-user-path' d='M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-info' data-user-id='" + Usuarios[i].id_usuario + "'>"
                  + "<svg class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>"
                  + "<path id='card-info-user' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'/>"
                  + "</svg>"
                  + "</div>"
                  + "</div>"
                  + "</div>";
              }

              userListContainer.innerHTML = newRow;

              var addUserModals = document.querySelectorAll('.card-add-user-icon');
              addUserModals.forEach(function (addUserModal) {
                addUserModal.addEventListener("click", ModalAddUser);
              });

              var deleteUserModal = document.querySelectorAll('.card-icons-container-user-delete');
              var banUserModal = document.querySelectorAll('.card-icons-container-user-ban');
              var favoriteUserModal = document.querySelectorAll('.card-icons-container-user-favorite');
              var infoUserModal = document.querySelectorAll('.card-icons-container-info');

              deleteUserModal.forEach(function (container) {
                container.addEventListener("click", ModalDeleteUser);
              });

              banUserModal.forEach(function (container) {
                if (container.getAttribute('data-ban-info') === 'Si') {
                  container.style.background = 'red';
                }
                container.addEventListener('click', function () {
                  var idValue = this.getAttribute('data-user-id');
                  banUser(idValue);
                });
              });

              favoriteUserModal.forEach(function (container) {
                if (container.getAttribute('data-favorite-info') === 'Si') {
                  container.style.background = 'yellow';
                }
                container.addEventListener('click', function () {
                  var idValue = this.getAttribute('data-user-id');
                  favoriteUser(idValue);
                });
              });

              infoUserModal.forEach(function (container) {
                container.addEventListener('click', ModalInfoUser);
              });
            }
          } else {
            console.log("La conexión falló");
            showAlert("Error con la conexión a la base de datos", 5000);
          }
        })
        .catch(error => console.error('Error status:', error));
    });
}


function imgDeleteUser() {
  console.log("Iniciando la eliminación de imagen y usuario");

  var idValue = document.querySelector('#modal-delete-user-button-yes').value;
  console.log("idValue: " + idValue);

  var id = idValue;

  var userImage = document.getElementById(id);
  var imageSrc = userImage ? userImage.src : '';

  console.log("Image source: " + imageSrc);

  var imageName = imageSrc.split('/').pop();
  console.log("Image name: " + imageName);
  if (imageName === 'perfil-de-usuario-provisional.webp') {
    console.log("Imagen predeterminada, solo se eliminará el usuario");
    deleteUser();
  } else {
    console.log("Eliminando imagen personalizada");

    var urlDeleteImage = "../controller/es/es_img_delete_user.php";
    var data = { 'id_usuario': id };

    fetch(urlDeleteImage, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud para eliminar la imagen');
        }
        return response.json();
      })
      .then(result => {
        if (result.error) {
          console.error('Error al eliminar la imagen del usuario:', result.message);
        } else {
          console.log("Resultado de la eliminación de la imagen: ", result.message);
        }
        deleteUser();
      })
      .catch(error => console.error('Error al eliminar la imagen del usuario:', error));
  }
}


function deleteUser() {
  console.log("Iniciando la eliminación del usuario");

  var idValue = document.querySelector('#modal-delete-user-button-yes').value;
  console.log("idValue: " + idValue);

  var id = idValue;
  console.log("id: " + id);
  var url = "../controller/es/es_delete_user.php";

  var data = { 'id_usuario': id };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json()).then(result => {
      console.log(result.error);
      var userListContainer = document.getElementById("control-panel-content-list");
      userListContainer.innerHTML = '';
      usersList();

      var modal = document.getElementById("modal-delete-user");
      modal.style.zIndex = "2";
      modal.style.display = "none";
    })
    .catch(error => console.error('Error status:', error));
}

//FALTA QUE EL ICONO DE FAVORITO CAMBIE https://jsfiddle.net/f9c5kqm6/
function favoriteUser(idValue) {
  console.log("66666666");

  var id = idValue;
  console.log("id111::" + id);
  var url = "../controller/es/es_favorite_user.php";

  var data = { 'id_usuario': id };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(result => {
      console.log("Respuesta del servidor:", result);
      console.log("Respuesta del favorito:", result.favorito);
      var favoriteIconContainer = document.querySelector(`.card-icons-container-user-favorite[data-user-id="${id}"]`);
      if (result.favorito === 'Si') {
        favoriteIconContainer.setAttribute('data-fav-info', 'Si');
        favoriteIconContainer.style.background = 'yellow';
      } else {
        favoriteIconContainer.setAttribute('data-fav-info', 'No');
        favoriteIconContainer.style.background = 'none';
      }
    })
    .catch(error => console.error('Error:', error));
}


function banUser(idValue) {
  console.log("1111hhh");

  var id = idValue;
  console.log("id112::" + id);
  var url = "../controller/es/es_ban_user.php";

  var data = { 'id_usuario': id };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(result => {
      console.log(result);
      console.log("supoendddoooo");

      var userBanIconContainer = document.querySelector(`.card-icons-container-user-ban[data-user-id="${id}"]`);
      if (result.suspendido === 'Si') {
        userBanIconContainer.setAttribute('data-ban-info', 'Si');
        userBanIconContainer.style.background = 'red';
      } else {
        userBanIconContainer.setAttribute('data-ban-info', 'No');
        userBanIconContainer.style.background = 'none';
      }
    })
    .catch(error => console.error('Error:', error));
}




function addUserFirstLetter(event) {
  var inputField = event.target;
  var inputValue = inputField.value.trim();

  // Eliminar cualquier carácter que no sea una letra
  var formattedValue = inputValue.replace(/[^a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]/g, '');

  // Convertir la primera letra de cada palabra a mayúsculas y el resto a minúsculas
  formattedValue = formattedValue.replace(/\b\w+/g, function (match) {
    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
  });

  inputField.value = formattedValue;
}

const inputCorreo = document.getElementById('modal-add-user-content-form-column-2-input-mail');

inputCorreo.addEventListener('input', function () {
  const correo = inputCorreo.value;

  const isCorreoValido = addUserMailCheck(correo);
  if (isCorreoValido) {
    inputCorreo.style.border = '2px solid green';
  } else {
    inputCorreo.style.border = '2px solid red';
  }
});

inputCorreo.addEventListener('blur', function () {
  const correo = inputCorreo.value;

  const isCorreoValido = addUserMailCheck(correo, true);
  if (isCorreoValido) {
    inputCorreo.style.border = '2px solid green';
  } else {
    inputCorreo.style.border = '2px solid red';
  }
});

const infoinputCorreo = document.getElementById('modal-info-user-content-form-column-2-input-mail');

infoinputCorreo.addEventListener('input', function () {
  const correo = infoinputCorreo.value;
  addUserMailCheck(correo);
});

function addUserMailCheck(correo, validarDominio = false) {
  const sintaxisValida = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  if (!sintaxisValida) {
    return false;
  }

  if (validarDominio) {
    const [nombreUsuario, dominio] = correo.split('@');
    const nombreUsuarioValido = nombreUsuario.replace(/[^a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s.]+/g, '');
    const correoValido = `${nombreUsuarioValido}@${dominio}`;

    const dominiosPermitidos = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    const dominioValido = dominiosPermitidos.includes(dominio.toLowerCase());

    if (dominioValido) {
      return true;
    } else {
      const registrosMXValidos = addUserMailCheckMXRegister(dominio);
      return registrosMXValidos;
    }
  }

  return true;
}

async function addUserMailCheckMXRegister(dominio) {
  try {
    const response = await fetch(`/tu-servidor/verificar-registros-mx?dominio=${dominio}`);
    const data = await response.json();

    return data.registrosMXValidos;
  } catch (error) {
    console.error('Error al verificar registros MX:', error.message);
    return false;
  }
}


function addUserTlf() {
  console.log("addtlgf");
  const countryCodes = [
    { code: '+1', country: 'Estados Unidos' },
    { code: '+44', country: 'Reino Unido' },
    { code: '+33', country: 'Francia' },
    { code: '+34', country: 'España' },
    { code: '+49', country: 'Alemania' },
    { code: '+39', country: 'Italia' },
    { code: '+81', country: 'Japón' },
    { code: '+86', country: 'China' },
    { code: '+91', country: 'India' },
  ];

  const selectElements = document.querySelectorAll('.countryCodesSelect');

  selectElements.forEach(selectElement => {
    selectElement.innerHTML = '';

    countryCodes.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.setAttribute('data-country', country.country);
      option.textContent = country.code;
      selectElement.appendChild(option);
    });

    selectElement.addEventListener('change', function () {
      const selectedOption = this.options[this.selectedIndex];
      console.log('Selected option changed to:', selectedOption.value); // Verifica que el evento change funciona
      this.previousElementSibling.textContent = selectedOption.value;
    });
  });
}

function updateUserTlf(input) {
  if (input) {
    const countrySelect = input.parentElement.querySelector('.countryCodesSelect');
    const selectedCountryCode = countrySelect ? countrySelect.value : "";
    const enteredPhoneNumber = input.value || "";

    const combinedValue = selectedCountryCode ? selectedCountryCode + " " + enteredPhoneNumber : enteredPhoneNumber;

    input.setAttribute('data-phone-value', combinedValue);

    console.log("Valor combinado (data-phone-value): " + combinedValue);
  } else {
    console.error("El elemento de entrada de teléfono no está definido.");
  }
}


function addUserTlfCheck(tlfElement) {
  console.log("aadd");
  if (tlfElement) {
    if (tlfElement.value !== undefined && tlfElement.value !== null) {
      var telefonoCompleto = tlfElement.value;
      var indiceEspacio = telefonoCompleto.indexOf(' ');
      if (indiceEspacio !== -1) {
        var numeroTelefono = telefonoCompleto.substring(indiceEspacio + 1);

        tlfElement.value = numeroTelefono;
      }

      tlfElement.value = tlfElement.value.replace(/\D/g, '');

      if (tlfElement.value.length > 9) {
        tlfElement.value = tlfElement.value.slice(0, 9);
      }

      updateUserTlf(tlfElement);

      if (tlfElement.value.length < 9) {
        console.log('El número de teléfono debe tener al menos 9 dígitos.');
        return false;
      } else {
        console.log('');
        return true;
      }
    } else {
      tlfElement.value = "";
      return false;
    }
  } else {
    console.error("El elemento de entrada de teléfono no está definido.");
    return false;
  }
}

function infoUserTlfCheck(tlfElement) {
  if (tlfElement) {
    if (tlfElement.value !== undefined && tlfElement.value !== null) {
      var telefonoCompleto = tlfElement.value.trim();

      var filteredValue = telefonoCompleto.replace(/[^+\d\s]/g, '');

      if (filteredValue.length > 13) {
        filteredValue = filteredValue.slice(0, 13);
      }

      tlfElement.value = filteredValue;

      var telefonoSoloNumeros = filteredValue.replace(/[+\s]/g, '');

      updateUserTlf(tlfElement);

      if (telefonoSoloNumeros.length < 9) {
        console.log('El número de teléfono debe tener al menos 9 dígitos.');
        return false;
      } else {
        console.log('');
        return true;
      }
    } else {
      tlfElement.value = "";
      return false;
    }
  } else {
    console.error("El elemento de entrada de teléfono no está definido.");
    return false;
  }
}

function addUserAddressCheck(event) {
  var input = event.target;
  var validCharacters = /^[a-zA-Z0-9.,\s]*$/;

  if (!validCharacters.test(input.value)) {
    input.value = input.value.replace(/[^a-zA-Z0-9.,\s]/g, '');
  }

  input.value = capitalizeFirstLetterOfEachWord(input.value);
}

function capitalizeFirstLetterOfEachWord(text) {
  return text.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}


function addUserUsernameCheck(input) {
  const valorOriginal = input.value.trim();

  const valorLimpio = valorOriginal.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ]/g, '');

  input.value = valorLimpio;
}

const inputNombreUsuario = document.getElementById('modal-add-user-content-form-column-3-input-username');

inputNombreUsuario.addEventListener('input', function () {
  addUserUsernameCheck(inputNombreUsuario);
});

function infoUserUsernameCheck(input) {
  const valorOriginal = input.value.trim();

  const valorLimpio = valorOriginal.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ]/g, '');

  input.value = valorLimpio;
}

const infoinputNombreUsuario = document.getElementById('modal-info-user-content-form-column-3-input-username');

infoinputNombreUsuario.addEventListener('input', function () {
  infoUserUsernameCheck(infoinputNombreUsuario);
});

function addUserPasswordCheck() {
  var password = document.getElementById("modal-add-user-content-form-column-3-input-password").value;
  var confirmPassword = document.getElementById("modal-add-user-content-form-column-3-input-password-confirm").value;

  if (password === confirmPassword) {
    console.log("Las contraseñas coinciden.");
    return true;
  } else {
    console.error("Las contraseñas no coinciden.");
    return false;
  }
}

document.getElementById("modal-add-user-content-form-column-3-input-password").addEventListener("input", addUserPasswordCheck);
document.getElementById("modal-add-user-content-form-column-3-input-password-confirm").addEventListener("input", addUserPasswordCheck);

function showAlert(message, duration) {
  var alertElement = document.getElementById('alert');
  alertElement.textContent = message;
  alertElement.classList.remove('hidden');
  setTimeout(function () {
    alertElement.style.opacity = 1;
  }, 100);

  setTimeout(function () {
    alertElement.style.opacity = 0;
  }, duration);

  setTimeout(function () {
    alertElement.classList.add('hidden');
  }, duration + 500);
}

function showNotification(message, duration) {
  var notification = document.getElementById('notification');
  notification.innerText = message;
  notification.classList.add('show');

  setTimeout(function () {
    notification.classList.remove('show');
  }, duration);
}

var btnAddUser = document.querySelector('#modal-add-user-content-form-button');
btnAddUser.addEventListener('click', checkUsernameAvailability);

var usernameExist = true;

function checkUsernameAvailability() {
  return new Promise((resolve, reject) => {
    var username = document.getElementById("modal-add-user-content-form-column-3-input-username").value;
    console.log("usrnameee" + username);

    var url = "../controller/es/es_check_username_availability.php";
    var data = { 'username': username };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(result => {
        console.log("Server response:", result);
        if (result.exists) {
          console.log("existe");
          showAlert('El nombre de usuario ya existe. Por favor elige otro.', 5000);
          resolve(false);
        } else {
          console.log("no existe");
          resolve(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showAlert("Error al verificar el nombre de usuario.", 5000);
        resolve(false);
      });
  });
}

var btnAddUser = document.querySelector('#modal-add-user-content-form-button');
btnAddUser.addEventListener('click', checkEmailAvailability);

function checkEmailAvailability() {
  return new Promise((resolve, reject) => {
    var email = document.getElementById("modal-add-user-content-form-column-2-input-mail").value;
    console.log("email: " + email);

    var url = "../controller/es/es_check_email_availability.php";
    var data = { 'email': email };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(result => {
        console.log("Server response:", result);
        if (result.exists) {
          console.log("Correo ya existe");
          showAlert('El correo electrónico ya existe. Por favor elige otro.', 5000);
          resolve(false);
        } else {
          console.log("Correo no existe");
          resolve(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showAlert("Error al verificar el correo electrónico.", 5000);
        resolve(false);
      });
  });
}



var btnAddUser = document.querySelector('#modal-add-user-content-form-button');
btnAddUser.addEventListener('click', addUser);

//COMPROBAR CORREO AL AÑADIR USUARIO????

function addUser() {
  console.log("auyrghnveh");

  var name = document.getElementById("modal-add-user-content-form-column-2-input-name").value;
  var firstLastName = document.getElementById("modal-add-user-content-form-column-2-input-first-last-name").value;
  var secondLastName = document.getElementById("modal-add-user-content-form-column-2-input-second-last-name").value;
  var mailAll = document.getElementById("modal-add-user-content-form-column-2-input-mail").value;
  var mail = mailAll.toLowerCase();
  //var tlf = document.getElementById("modal-add-user-content-form-column-2-input-tlf").value;
  //var tlfElement = document.getElementById('modal-add-user-content-form-column-2-input-tlf').getAttribute('data-phone-value');
  var tlfElement = document.getElementById('modal-add-user-content-form-column-2-input-tlf');
  console.log("tofelement " + tlfElement);
  //var tlf = tlfElement;  //https://jsfiddle.net/cqte5m2f/

  if (tlf) {
    console.log("Elemento de teléfono bien.");
  } else {
    console.error("Elemento de teléfono no encontrado.");
  }
  console.log("tff11: " + tlf);

  var address = document.getElementById("modal-add-user-content-form-column-3-input-address").value;
  var username = document.getElementById("modal-add-user-content-form-column-3-input-username").value;
  var password = document.getElementById("modal-add-user-content-form-column-3-input-password").value;
  var passwordConfirm = document.getElementById("modal-add-user-content-form-column-3-input-password-confirm").value;
  //var userType = document.getElementById("inputTipoUsuario").value;
  var userTypeSelect = document.querySelector('.modal-add-user-content-form-column-3-select');

  userTypeSelect.addEventListener('change', function () {
    var nuevoValor = userTypeSelect.value;
    console.log("new" + nuevoValor);
  });
  var userType = userTypeSelect.value;
  console.log("userType(adduser)" + userType);

  var userImgElement = document.getElementById('profileImage');
  var userImg = userImgElement.getAttribute('data-value');
  console.log(userImg);

  var nameElement = document.getElementById("modal-add-user-content-form-column-2-input-name");
  var firstLastNameElement = document.getElementById("modal-add-user-content-form-column-2-input-first-last-name");
  var secondLastNameElement = document.getElementById("modal-add-user-content-form-column-2-input-second-last-name");
  var mailElement = document.getElementById("modal-add-user-content-form-column-2-input-mail");
  var usernameElement = document.getElementById("modal-add-user-content-form-column-3-input-username");
  var passwordElement = document.getElementById("modal-add-user-content-form-column-3-input-password");
  var passwordConfirmElement = document.getElementById("modal-add-user-content-form-column-3-input-password-confirm");
  var addressElement = document.getElementById("modal-add-user-content-form-column-3-input-address");

  // Verificar campos vacíos
  if (nameElement.value == "" || firstLastNameElement.value == "" || secondLastNameElement.value == "" || mailElement.value == "" || tlf == "" || usernameElement.value == "" || passwordElement.value == "" || passwordConfirmElement.value == "" || userImg == "" || userType == "" || addressElement.value == "") {
    console.error("Faltan campos por rellenar.");
    showAlert('Faltan campos por rellenar.', 5000);
  } else {
    // Resto del código para verificar condiciones adicionales

    console.log("tlfElement data-phone-value: " + tlfElement.getAttribute('data-phone-value'));

    var tlf = tlfElement.getAttribute('data-phone-value');

    console.log("tlf: " + tlf);
    console.log("tlfElement.value: " + tlfElement.value);

    //console.log("tff: "+tlf);
    const isTlfValid = addUserTlfCheck(tlfElement);
    const isPasswordValid = addUserPasswordCheck();
    const isCorreoValid = addUserMailCheck(mail);

    checkUsernameAvailability().then(isUsernameValid => {
      console.log("usernameExistj " + usernameExist);
      checkEmailAvailability().then(isEmailValid => {
        // Verificar condiciones adicionales
        if (name != "" || firstLastName != "" || secondLastName != "" || mail != "" || tlf != "" || username != "" || password != "" || passwordConfirm != "" || userImg != "" || userType != "" || address != "") {
          // Resto del código para enviar el formulario
          if (isTlfValid && isPasswordValid && isCorreoValid && isUsernameValid && isEmailValid) {
            // Habilitar la función handleAddUserButtonClick
            console.log("Función handleAddUserButtonClick habilitada.");

            handleAddUserButtonClick();

            // document.getElementById("errorInsertarUsuarios").style.display="block";
            // document.getElementById("errorInsertarUsuarios").innerHTML="<p id='errorInsertarUsuarios' style='color:red;margin:3%;' >EREMU GUZTIAK BETETA EGON BEHAR DIRA</p>";

            //document.getElementById("errorInsertarUsuarios").style.display="block";

            var url = "../controller/es/es_add_user.php";
            var data = { 'name': name, 'firstLastName': firstLastName, 'secondLastName': secondLastName, 'mail': mail, 'tlf': tlf, 'username': username, 'password': password, 'userType': userType, 'userImg': userImg, 'address': address };
            console.log(data);
            fetch(url, {
              method: 'POST', // or 'POST'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers: { 'Content-Type': 'application/json' }  //input data
            })
              .then(res => res.json()).then(result => {

                console.log(result.error);
                //alert(result.error);

                // document.getElementById("errorInsertarUsuarios").innerHTML="<p id='errorInsertarUsuarios' style='color:green;margin:3%;' >DATUAK SARTU EGIN DIRA</p>";
                // document.getElementById("errorInsertarUsuarios").style.display="none";

                var searchInputValue = document.getElementById("search-user-input");
                searchInputValue.value = '';

                var userListContainer = document.getElementById("control-panel-content-list");
                userListContainer.innerHTML = '';

                usersList(); //EL PROBLEMA DE ESTO ES QUE SUMA LO QUE TENIA MAS TODO MAS EL NUEVO USUARIO
                document.getElementById("modal-add-user-content-form-column-2-input-name").value = "";
                document.getElementById("modal-add-user-content-form-column-2-input-first-last-name").value = "";
                document.getElementById("modal-add-user-content-form-column-2-input-second-last-name").value = "";
                document.getElementById("modal-add-user-content-form-column-2-input-mail").value = "";
                document.getElementById("modal-add-user-content-form-column-2-input-tlf").value = "";
                document.getElementById("modal-add-user-content-form-column-3-input-username").value = "";
                document.getElementById("modal-add-user-content-form-column-3-input-password").value = "";
                document.getElementById("modal-add-user-content-form-column-3-input-password-confirm").value = "";
                document.getElementById("modal-add-user-content-form-column-3-input-address").value = "";
                userImgElement.src = '../view/img/img-users/perfil-de-usuario-provisional.webp';

              })
              .catch(error => console.error('Error status:', error));

          } else {
            let errorMessage = 'Error: ';
            if (!isTlfValid) {
              errorMessage += 'Teléfono no válido. ';
            }
            if (!isPasswordValid) {
              errorMessage += 'Contraseña no válida. ';
            }
            if (!isCorreoValid) {
              errorMessage += 'Correo electrónico no válido. ';
            }
            if (!isUsernameValid) {
              errorMessage += 'Nombre de usuario no válido o ya existe. ';
            }
            if (!isEmailValid) {
              errorMessage += 'Correo electrónico ya existe. ';
            }
            showAlert(errorMessage, 5000);
          }

        } else {
          //console.log("Hay errores en los datos ingresados.");  
          // Muestra la alerta con el mensaje de error
          showAlert('Faltan campos por rellenar.', 5000);
        }

      })
    })

  }

}

var btnShowPasswordIconUser = document.querySelector('#modal-info-user-content-form-column-3-input-password-icon-id');
btnShowPasswordIconUser.addEventListener('click', ShowPasswordIconUser);

function ShowPasswordIconUser() {

  var passwordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }

}


var btnEditUser = document.querySelector('#modal-info-user-content-form-button-edit');
btnEditUser.addEventListener('click', actionEditUser);

var originalValues = {};

function actionEditUser() {
  console.log("editando user");

  var overlay = document.querySelector('#overlay-edit');
  overlay.style.display = "flex";

  var inputs1 = document.querySelectorAll('.modal-info-user-content-form-column-2-input');
  inputs1.forEach(function (input) {
    originalValues[input.id] = input.value; // Almacenar el valor original
    input.removeAttribute('readonly');
  });

  var inputs2 = document.querySelectorAll('.modal-info-user-content-form-column-3-input');
  inputs2.forEach(function (input) {
    originalValues[input.id] = input.value; // Almacenar el valor original
    input.removeAttribute('readonly');
  });

  var inputType = document.querySelector('#modal-info-user-content-form-column-3-select-a');
  inputType.style.display = "none";

  var selectType = document.querySelector('.modal-info-user-content-form-column-3-select');
  selectType.style.display = "flex";

  var profileImage = document.querySelector('.profileImage-edit');
  var removeImageIcon = document.querySelector('.removeImageIcon-edit');

  console.log("Profile Image src:", profileImage.src);
  if (profileImage.src.includes('perfil-de-usuario-provisional.webp')) {
    removeImageIcon.style.display = 'none';
  } else {
    removeImageIcon.style.display = 'inline';
  }

  // Almacenar el valor original de la imagen de perfil al entrar en el modo de edición
  editoriginalImageSrc = profileImage.src;
  editoriginalImageDataValue = profileImage.getAttribute('data-value'); // Asegurar que obtenga el data-value actualizado

  // Establecer el nombre de la foto actual en el data-value
  profileImage.setAttribute('data-value', editoriginalImageDataValue);

  var passwordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password');
  var confirmPasswordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password-confirm');

  // Obtener el valor inicial del campo de contraseña al cargar la página o abrir el modal
  var initialPasswordValue = passwordInput.value.trim();
  originalValues[passwordInput.id] = initialPasswordValue; // Almacenar el valor original del password

  // Función para mostrar u ocultar el input de confirmar contraseña
  function toggleConfirmPasswordInput() {
    var newPassword = passwordInput.value.trim();

    if (newPassword !== initialPasswordValue) {
      confirmPasswordInput.style.display = 'block';  // Mostrar el input de confirmar contraseña
    } else {
      confirmPasswordInput.style.display = 'none';   // Ocultar el input de confirmar contraseña
    }
  }

  // Escuchar cambios en el input de contraseña
  passwordInput.addEventListener('input', toggleConfirmPasswordInput);

  // Verificar el estado inicial del input de contraseña al abrir la edición
  toggleConfirmPasswordInput();

  var btnEdit = document.querySelector('#modal-info-user-content-form-button-edit');
  btnEdit.style.display = "none";
  var btnSave = document.querySelector('#modal-info-user-content-form-button-save');
  btnSave.style.display = "flex";
  var btnExit = document.querySelector('#modal-info-user-content-form-button-exit');
  btnExit.style.display = "flex";
}



var btnExit = document.querySelector('#modal-info-user-content-form-button-exit');
btnExit.addEventListener('click', actionExitEdit);

function actionExitEdit() {
  console.log("saliendo edit");

  var overlay = document.querySelector('#overlay-edit');
  overlay.style.display = "none";

  var inputs1 = document.querySelectorAll('.modal-info-user-content-form-column-2-input');
  inputs1.forEach(function (input) {
    input.setAttribute('readonly', 'readonly');
    input.value = originalValues[input.id]; // Restablecer el valor original
  });

  var inputs2 = document.querySelectorAll('.modal-info-user-content-form-column-3-input');
  inputs2.forEach(function (input) {
    input.setAttribute('readonly', 'readonly');
    input.value = originalValues[input.id]; // Restablecer el valor original
  });

  var inputType = document.querySelector('#modal-info-user-content-form-column-3-select-a');
  inputType.style.display = "flex";

  var selectType = document.querySelector('.modal-info-user-content-form-column-3-select');
  selectType.style.display = "none";

  // Restablecer la contraseña al valor original
  var passwordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password');
  passwordInput.value = originalValues[passwordInput.id];
  passwordInput.setAttribute('readonly', 'readonly');

  var confirmPasswordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password-confirm');
  confirmPasswordInput.style.display = "none";
  confirmPasswordInput.value = "";

  var btnEdit = document.querySelector('#modal-info-user-content-form-button-edit');
  btnEdit.style.display = "flex";
  var btnSave = document.querySelector('#modal-info-user-content-form-button-save');
  btnSave.style.display = "none";
  var btnExit = document.querySelector('#modal-info-user-content-form-button-exit');
  btnExit.style.display = "none";

  // Restablecer la imagen de perfil a su estado original
  var editprofileImage = document.querySelector('.profileImage-edit');
  var editremoveImageIcon = document.querySelector('.removeImageIcon-edit');

  editprofileImage.src = editoriginalImageSrc;
  editprofileImage.setAttribute('data-value', editoriginalImageDataValue);

  if (editoriginalImageSrc.includes('perfil-de-usuario-provisional.webp')) {
    editremoveImageIcon.style.display = 'none';
  } else {
    editremoveImageIcon.style.display = 'block';
  }

  if (editcropper) {
    editcropper.destroy();
    editcropper = null;
  }
  resetFileInput();
}



function showEditUser(userId) {


  console.log("editar btoon");

  var id = userId;

  console.log("consoleeee iddd " + id);
  var url = "../controller/es/controller_showEditUser_user.php";
  var data = { 'id': id };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' }  //input data
  })

    .then(res => res.json()).then(result => {

      if (result.error == "error") {
        alert("El usuario no existe");
      } else {
        document.getElementById("modal-info-user-content-form-column-2-input-name").value = result.usuario.nombre;
        document.getElementById("modal-info-user-content-form-column-2-input-first-last-name").value = result.usuario.apellido_1;
        document.getElementById("modal-info-user-content-form-column-2-input-second-last-name").value = result.usuario.apellido_2;
        document.getElementById("modal-info-user-content-form-column-2-input-mail").value = result.usuario.correo;
        document.getElementById("modal-info-user-content-form-column-2-input-tlf").value = result.usuario.telefono;
        document.getElementById("modal-info-user-content-form-column-3-input-address").value = result.usuario.direccion;
        document.getElementById("modal-info-user-content-form-column-3-input-username").value = result.usuario.nombre_usuario;
        document.getElementById("modal-info-user-content-form-column-3-input-password").value = result.usuario.contrasena;
        document.getElementById("modal-info-user-content-form-column-3-select-a").value = result.usuario.tipo_usuario;

        var profileImage = document.querySelector('.modal-info-user-content-form-column-1-img');
        profileImage.src = result.usuario.foto_perfil;
        profileImage.setAttribute('data-value', result.usuario.foto_perfil);

      }
    })
    .catch(error => console.error('Error status:', error));


}


function checkUsernameAvailabilityEdit(username) {
  return new Promise((resolve, reject) => {
    var url = "../controller/es/es_check_username_availability.php";
    var data = { 'username': username };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(result => {
        if (result.exists) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resolve(false);
      });
  });
}

function checkEmailAvailabilityEdit(email) {
  return new Promise((resolve, reject) => {
    var url = "../controller/es/es_check_email_availability.php";
    var data = { 'email': email };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(result => {
        if (result.exists) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resolve(false);
      });
  });
}


var btnSaveChanges = document.querySelector('#modal-info-user-content-form-button-save');
btnSaveChanges.addEventListener('click', saveChangesEdit);

var initialPassword = "";

function initializePassword() {
  var passwordInput = document.getElementById("modal-info-user-content-form-column-3-input-password");
  initialPassword = passwordInput.value;
}


function saveChangesEdit() {
  console.log("guardando edit");

  var nombre = document.getElementById("modal-info-user-content-form-column-2-input-name").value;
  var primerApellido = document.getElementById("modal-info-user-content-form-column-2-input-first-last-name").value;
  var segundoApellido = document.getElementById("modal-info-user-content-form-column-2-input-second-last-name").value;
  var correo = document.getElementById("modal-info-user-content-form-column-2-input-mail").value;
  var telefono = document.getElementById("modal-info-user-content-form-column-2-input-tlf").value;
  var direccion = document.getElementById("modal-info-user-content-form-column-3-input-address").value;
  var usuario = document.getElementById("modal-info-user-content-form-column-3-input-username").value;
  var password = document.getElementById("modal-info-user-content-form-column-3-input-password").value;
  var tipo = document.querySelector(".modal-info-user-content-form-column-3-select").value;

  var confirmPasswordInput = document.getElementById("modal-info-user-content-form-column-3-input-password-confirm");
  var confirmPassword = confirmPasswordInput.value;

  var initialPasswordValue = originalValues["modal-info-user-content-form-column-3-input-password"];

  var dataModified = false;

  var inputs1 = document.querySelectorAll('.modal-info-user-content-form-column-2-input');
  inputs1.forEach(function (input) {
    if (input.value !== originalValues[input.id]) {
      dataModified = true;
    }
  });

  var inputs2 = document.querySelectorAll('.modal-info-user-content-form-column-3-input');
  inputs2.forEach(function (input) {
    if (input.value !== originalValues[input.id]) {
      dataModified = true;
    }
  });

  // Verificar también el cambio en el tipo de usuario
  var selectTipo = document.querySelector('.modal-info-user-content-form-column-3-select');
  if (selectTipo.value !== originalValues["modal-info-user-content-form-column-3-select"]) {
    dataModified = true;
  }

  var profileImage = document.querySelector('.profileImage-edit');
  var imageDataValue = profileImage.getAttribute('data-value');
  if (imageDataValue !== editoriginalImageDataValue) {
    dataModified = true;
  }

  if (!dataModified) {
    showAlert('No se ha modificado ningún dato.', 5000);
    return;
  }

  var imageName = '';
  if (profileImage.src.includes('perfil-de-usuario-provisional.webp')) {
    imageName = editoriginalImageDataValue;
  } else {
    var imageNameParts = imageDataValue.split('/');
    imageName = imageNameParts[imageNameParts.length - 1];
  }

  var userId = currentUserIdsavechangesedit;
  var previousImageName = editoriginalImageDataValue;

  var data = {
    'id': userId,
    'nombre': nombre,
    'primerApellido': primerApellido,
    'segundoApellido': segundoApellido,
    'correo': correo,
    'telefono': telefono,
    'direccion': direccion,
    'nombre_usuario': usuario,
    'password': password,
    'tipo': tipo,
    'foto_perfil': imageName
  };

  console.log("Datos a guardar:", data);

  // Verificar nombre de usuario y correo solo si han sido modificados
  let usernameCheckPromise = Promise.resolve(true);
  let emailCheckPromise = Promise.resolve(true);

  if (usuario !== originalValues["modal-info-user-content-form-column-3-input-username"]) {
    usernameCheckPromise = checkUsernameAvailabilityEdit(usuario);
  }

  if (correo !== originalValues["modal-info-user-content-form-column-2-input-mail"]) {
    emailCheckPromise = checkEmailAvailabilityEdit(correo);
  }

  Promise.all([usernameCheckPromise, emailCheckPromise])
    .then(results => {
      const [isUsernameValid, isEmailValid] = results;

      let passwordsMatch = true;
      if (password !== initialPasswordValue && (confirmPassword.trim() === "" || password !== confirmPassword)) {
        passwordsMatch = false;
      }

      if (!isUsernameValid || !isEmailValid || !passwordsMatch) {
        let errorMessage = 'Error: ';
        if (!isUsernameValid) {
          errorMessage += 'Nombre de usuario ya existe. ';
        }
        if (!isEmailValid) {
          errorMessage += 'Correo electrónico ya existe. ';
        }
        if (!passwordsMatch) {
          errorMessage += 'Las contraseñas no coinciden. ';
        }
        showAlert(errorMessage, 5000);
        return;
      }

      var url = "../controller/es/es_update_user.php";

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(result => {
          console.log("Resultado completo:", result.error);
          showNotification('Usuario actualizado correctamente', 5000);
          EdithandleAddUserButtonClick();

          var newImageDataValue = profileImage.getAttribute('data-value');
          var imageChanged = newImageDataValue !== previousImageName;

          console.log("imageChanged:", imageChanged);
          console.log("Nueva imagen:", newImageDataValue);
          console.log("Imagen anterior:", previousImageName);

          if (imageChanged && previousImageName !== 'perfil-de-usuario-provisional.webp') {
            deletePreviousImageInfoUser(previousImageName);
          }

          if (imageDataValue === 'perfil-de-usuario-provisional.webp') {
            profileImage.src = '../view/img/img-users/perfil-de-usuario-provisional.webp';
            profileImage.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');

            if (editoriginalImageDataValue !== 'perfil-de-usuario-provisional.webp') {
              checkFixNoImageUser();
            }
          }

          var userListContainer = document.getElementById("control-panel-content-list");
          userListContainer.innerHTML = '';
          usersList();

          var overlay = document.querySelector('#overlay-edit');
          overlay.style.display = "none";

          var inputs1 = document.querySelectorAll('.modal-info-user-content-form-column-2-input');
          inputs1.forEach(function (input) {
            input.setAttribute('readonly', 'readonly');
          });

          var inputs2 = document.querySelectorAll('.modal-info-user-content-form-column-3-input');
          inputs2.forEach(function (input) {
            input.setAttribute('readonly', 'readonly');
          });

          var inputType = document.querySelector('#modal-info-user-content-form-column-3-select-a');
          inputType.style.display = "flex";

          var selectType = document.querySelector('.modal-info-user-content-form-column-3-select');
          selectType.style.display = "none";

          var passwordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password');
          if (password === initialPasswordValue) {
            passwordInput.value = initialPasswordValue;
          }
          passwordInput.setAttribute('readonly', 'readonly');

          var confirmPasswordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password-confirm');
          confirmPasswordInput.style.display = "none";
          confirmPasswordInput.value = "";

          var btnEdit = document.querySelector('#modal-info-user-content-form-button-edit');
          btnEdit.style.display = "flex";
          var btnSave = document.querySelector('#modal-info-user-content-form-button-save');
          btnSave.style.display = "none";
          var btnExit = document.querySelector('#modal-info-user-content-form-button-exit');
          btnExit.style.display = "none";
        })
        .catch(error => console.error('Error status:', error));
    });
}




function deletePreviousImageInfoUser(imageName) {
  var defaultImageName = "perfil-de-usuario-provisional.webp";

  var imageNameParts = imageName.split('/');
  var cleanImageName = imageNameParts[imageNameParts.length - 1];

  console.log("Nombre de la imagen a eliminar: " + cleanImageName);

  var deleteImageUrl = "../controller/info_user_delete_previous_image.php";
  fetch(deleteImageUrl, {
    method: 'POST',
    body: JSON.stringify({ imageName: cleanImageName }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(deleteResult => {
      console.log('Imagen anterior eliminada:', deleteResult);
    })
    .catch(error => console.error('Error al eliminar imagen anterior:', error));
}

function checkFixNoImageUser() {
  var userId = currentUserIdsavechangesedit;


  var url = "../controller/update_user_no_image.php";
  var data = {
    'id': userId,
    'foto_perfil': 'perfil-de-usuario-provisional.webp'
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(result => {
      console.log('Resultado de la actualización de la imagen:', result);
      if (result.success) {
        console.log('Imagen de perfil actualizada a la predeterminada en la base de datos.');
      } else {
        console.error('Error al actualizar la imagen de perfil en la base de datos:', result.error);
      }
    })
    .catch(error => console.error('Error en la solicitud para actualizar la imagen de perfil:', error));
}



/*************************ADD USER PHOTO FUNCTION***************************** */

var cropper = null;
var profileImage = document.getElementById('profileImage');

function addUserProfileImage() {
  var inputFile = document.getElementById('editImageInput');
  var profileImage = document.getElementById('profileImage');
  var confirmCropButton = document.getElementById('confirmCropButton');
  var cancelCropButton = document.getElementById('cancelCropButton');
  var cropper;
  var removeImageIcon = document.getElementById('removeImageIcon');
  confirmCropButton.style.display = 'none';
  cancelCropButton.style.display = 'none';
  removeImageIcon.style.display = 'none';

  profileImage.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');

  function resetFileInput() {
    inputFile.value = null;
    inputFile.disabled = false;
  }

  inputFile.addEventListener('change', function (event) {
    confirmCropButton.style.display = 'block';
    cancelCropButton.style.display = 'block';

    var file = event.target.files[0];

    if (file) {
      inputFile.disabled = true;

      var reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;

        if (cropper) {
          cropper.destroy();
        }

        cropper = new Cropper(profileImage, {
          aspectRatio: 1,
          viewMode: 2,
          autoCrop: true,
          dragMode: 'move',
          crop: function (event) { },
        });
        removeImageIcon.style.display = 'block';
      };

      reader.readAsDataURL(file);
    }
  });

  confirmCropButton.addEventListener('click', function () {
    if (cropper) {
      confirmCropButton.style.display = 'none';
      cancelCropButton.style.display = 'none'; // Oculta el botón de cancelar
      var croppedCanvas = cropper.getCroppedCanvas();

      var maxWidth = 500;
      var maxHeight = 500;

      if (croppedCanvas.width > maxWidth || croppedCanvas.height > maxHeight) {
        var aspectRatio = croppedCanvas.width / croppedCanvas.height;
        var newWidth = Math.min(maxWidth, croppedCanvas.width);
        var newHeight = Math.min(maxHeight, newWidth / aspectRatio);
        var resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = newWidth;
        resizedCanvas.height = newHeight;
        var ctx = resizedCanvas.getContext('2d');
        ctx.drawImage(croppedCanvas, 0, 0, newWidth, newHeight);
        croppedCanvas = resizedCanvas;
      }

      profileImage.src = croppedCanvas.toDataURL();

      cropper.destroy();
      cropper = null;

      resetFileInput();

      croppedCanvas.toBlob(function (blob) {
        var formData = new FormData();
        formData.append('file', blob);

        fetch('../controller/generate_unique_file_name.php', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            if (data.status === 'success') {
              profileImage.setAttribute('data-value', data.uniqueFileName + '.jpg');
            } else {
              console.error('Error:', data.message);
            }
          })
          .catch(error => console.error('Error en la solicitud Fetch:', error));
      }, 'image/jpeg');
    }
  });

  cancelCropButton.addEventListener('click', function () {
    profileImage.src = '../view/img/img-users/perfil-de-usuario-provisional.webp'; // Ruta relativa a la imagen predeterminada
    profileImage.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');
    removeImageIcon.style.display = 'none';
    cropper.destroy();
    cropper = null;
    inputFile.disabled = false;
    confirmCropButton.style.display = 'none';
    cancelCropButton.style.display = 'none';
    inputFile.value = ''; // Limpiar el valor del campo de entrada de archivos para permitir seleccionar la misma imagen nuevamente
  });

  // Restablecer la imagen predeterminada al cargar la página
  profileImage.src = '../view/img/img-users/perfil-de-usuario-provisional.webp'; // Cambia esto por tu ruta real
  profileImage.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');
}

function handleAddUserButtonClick() {

  var userImgElement = document.getElementById('profileImage');
  var userImgSrc = userImgElement.src;
  var userImgDataValue = userImgElement.getAttribute('data-value');
  console.log(userImgDataValue);

  console.log("111111111111111 handleAddUserButtonClick ejecutada.");
  console.log("Función handleAddUserButtonClick ejecutada.");

  var originalImageBase64 = userImgSrc.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  console.log("originalImageBase644444444444" + originalImageBase64);

  if (/^[A-Za-z0-9+/]+={0,2}$/.test(originalImageBase64)) {
    var blob = base64ToBlob(originalImageBase64);
    console.log("blobbbbbbbbbbb" + blob);

    var formData = new FormData();

    var uniqueFileName = userImgDataValue;

    formData.append('file', blob, uniqueFileName);
    console.log("formmmmmmm" + formData);

    fetch('../controller/add_user_upload_profile_photo.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          console.log(response.text());
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          console.log('Imagen añadida exitosamente:', data);

          userImgElement.src = '../view/img/img-users/perfil-de-usuario-provisional.webp';
          userImgElement.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud Fetch:', error);

        if (error instanceof Response) {
          error.text().then(errorMessage => {
            console.error('Error en el servidor:', errorMessage);
          });
        } else {
          console.error('Error en el servidor:', error);
        }
      });

  } else {
    console.error('La cadena no es una cadena base64 válida');
  }

}

function base64ToBlob(base64) {
  var binaryString = window.atob(base64);
  var length = binaryString.length;
  var bytes = new Uint8Array(length);

  for (var i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes]);
}

function deleteUserProfileImage() {
  console.log("aaa");
  var profileImage = document.getElementById('profileImage');
  var removeImageIcon = document.getElementById('removeImageIcon');

  profileImage.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');
  profileImage.src = '../view/img/img-users/perfil-de-usuario-provisional.webp';

  removeImageIcon.style.display = 'none';
}

/*************************END ADD USER PHOTO FUNCTION***************************** */

/*************************INFO USER PHOTO FUNCTION***************************** */

var editcropper = null;
var editprofileImage = document.getElementById('profileImageEdit');
var editinputFile = document.getElementById('modal-info-user-content-form-column-1-input-file-edit');
var editconfirmCropButton = document.getElementById('confirmCropButtonEdit');
var editcancelCropButton = document.getElementById('cancelCropButtonEdit');
var editremoveImageIcon = document.getElementById('removeImageIconEdit');
var editoriginalImageSrc = editprofileImage.src;
var editoriginalImageDataValue = editprofileImage.getAttribute('data-value');

// Función para restablecer la entrada de archivo
function resetFileInput() {
  editinputFile.value = null;
  editinputFile.disabled = false;
}

// Manejo del click en el label para abrir el explorador de archivos o manejar los iconos
document.getElementById('fileLabel').addEventListener('click', function (event) {
  var editIcon = event.target.closest('label[for="editImageInputEdit"]');
  var removeIcon = event.target.closest('label[onclick="EditdeleteUserProfileImage()"]');

  if (editIcon) {
    editinputFile.click();
  } else if (removeIcon) {
    EditdeleteUserProfileImage();
  } else {
    event.preventDefault(); // Evitar abrir el explorador de archivos si se hace clic en otra parte
  }
});

// Evitar propagación del evento en el input de archivo
editinputFile.addEventListener('click', function (event) {
  event.stopPropagation();
});

editinputFile.addEventListener('change', function (event) {
  var file = event.target.files[0];

  if (file) {
    editconfirmCropButton.style.display = 'block';
    editcancelCropButton.style.display = 'block';
    editinputFile.disabled = true;

    var reader = new FileReader();
    reader.onload = function (e) {
      editoriginalImageSrc = editprofileImage.src;
      editprofileImage.src = e.target.result;

      if (editcropper) {
        editcropper.destroy();
      }

      editcropper = new Cropper(editprofileImage, {
        aspectRatio: 1,
        viewMode: 2,
        autoCrop: true,
        dragMode: 'move',
        crop: function (event) { }
      });
      editremoveImageIcon.style.display = 'block';
    };

    reader.readAsDataURL(file);
  }
});

editconfirmCropButton.addEventListener('click', function () {
  if (editcropper) {
    editconfirmCropButton.style.display = 'none';
    editcancelCropButton.style.display = 'none';
    var croppedCanvas = editcropper.getCroppedCanvas();

    var maxWidth = 500;
    var maxHeight = 500;

    if (croppedCanvas.width > maxWidth || croppedCanvas.height > maxHeight) {
      var aspectRatio = croppedCanvas.width / croppedCanvas.height;
      var newWidth = Math.min(maxWidth, croppedCanvas.width);
      var newHeight = Math.min(maxHeight, newWidth / aspectRatio);
      var resizedCanvas = document.createElement('canvas');
      resizedCanvas.width = newWidth;
      resizedCanvas.height = newHeight;
      var ctx = resizedCanvas.getContext('2d');
      ctx.drawImage(croppedCanvas, 0, 0, newWidth, newHeight);
      croppedCanvas = resizedCanvas;
    }

    editprofileImage.src = croppedCanvas.toDataURL();

    editcropper.destroy();
    editcropper = null;

    resetFileInput();

    croppedCanvas.toBlob(function (blob) {
      var formData = new FormData();
      formData.append('file', blob);

      fetch('../controller/generate_unique_file_name.php', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {
            editprofileImage.setAttribute('data-value', data.uniqueFileName + '.jpg');
          } else {
            console.error('Error:', data.message);
          }
        })
        .catch(error => console.error('Error en la solicitud Fetch:', error));
    }, 'image/jpeg');
  }
});

editcancelCropButton.addEventListener('click', function () {
  editprofileImage.src = editoriginalImageSrc;
  if (editoriginalImageSrc.includes('perfil-de-usuario-provisional.webp')) {
    editremoveImageIcon.style.display = 'none';
  } else {
    editremoveImageIcon.style.display = 'block';
  }
  if (editcropper) {
    editcropper.destroy();
    editcropper = null;
  }
  resetFileInput();
  editconfirmCropButton.style.display = 'none';
  editcancelCropButton.style.display = 'none';
});

editprofileImage.src = '../view/img/img-users/perfil-de-usuario-provisional.webp';
editprofileImage.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');



var currentImageFileName = '';

function EdithandleAddUserButtonClick() {
  var edituserImgElement = document.getElementById('profileImageEdit');
  var edituserImgDataValue = edituserImgElement.getAttribute('data-value');
  currentImageFileName = edituserImgDataValue;

  console.log("111111111111111 handleAddUserButtonClick ejecutada.");
  console.log("Función handleAddUserButtonClick ejecutada.");

  var edituserImgSrc = edituserImgElement.src;
  var editoriginalImageBase64 = edituserImgSrc.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  console.log("editoriginalImageBase644444444444" + editoriginalImageBase64);

  if (/^[A-Za-z0-9+/]+={0,2}$/.test(editoriginalImageBase64)) {
    var editblob = editbase64ToBlob(editoriginalImageBase64);
    console.log("editblobbbbbbbbbbbb" + editblob);

    var editformData = new FormData();
    var edituniqueFileName = edituserImgDataValue;
    editformData.append('file', editblob, edituniqueFileName);
    console.log("formmmmmmm" + editformData);

    fetch('../controller/add_user_upload_profile_photo.php', {
      method: 'POST',
      body: editformData,
    })
      .then(response => {
        if (!response.ok) {
          console.log(response.text());
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          console.log('Imagen añadida exitosamente:', data);
          // edituserImgElement.src = '../view/img/img-users/perfil-de-usuario-provisional.webp';
          // edituserImgElement.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud Fetch:', error);
        if (error instanceof Response) {
          error.text().then(errorMessage => {
            console.error('Error en el servidor:', errorMessage);
          });
        } else {
          console.error('Error en el servidor:', error);
        }
      });

  } else {
    console.error('La cadena no es una cadena base64 válida');
  }
}

function editbase64ToBlob(editbase64) {
  var editbinaryString = window.atob(editbase64);
  var editlength = editbinaryString.length;
  var bytesedit = new Uint8Array(editlength);

  for (var i = 0; i < editlength; i++) {
    bytesedit[i] = editbinaryString.charCodeAt(i);
  }

  return new Blob([bytesedit]);
}

function EditdeleteUserProfileImage() {
  console.log("Eliminando imagen de perfil");
  var modalInfoUser = document.getElementById('modal-info-user');
  var editprofileImage = modalInfoUser.querySelector('#profileImageEdit');
  var editremoveImageIcon = modalInfoUser.querySelector('#removeImageIconEdit');

  editprofileImage.setAttribute('data-value', 'perfil-de-usuario-provisional.webp');
  editprofileImage.src = '../view/img/img-users/perfil-de-usuario-provisional.webp';

  editremoveImageIcon.style.display = 'none';
}


/*************************END INFO USER PHOTO FUNCTION***************************** */

function SideBarShowHome() {

  var users = document.querySelector(".control-panel-content");
  var tasks = document.querySelector(".control-panel-content-tasks");

  users.style.display = "flex";
  tasks.style.display = "none";

}


function SideBarShowTasks() {

  var users = document.querySelector(".control-panel-content");
  var tasks = document.querySelector(".control-panel-content-tasks");

  users.style.display = "none";
  tasks.style.display = "flex";

}



/*************************MODAL***************************** */

function ModalLogout() {

  var modal = document.getElementById("modal-logout");
  modal.style.zIndex = "2";

  var btnModal = document.querySelector('.modal-close-button');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("modal-close-button")[0];

  modal.style.display = "flex";


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  span.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }

  }

  btnModal.onclick = function () {
    modal.style.display = "none";

  }

}

function ModalDeleteUser() {

  var userId = event.currentTarget.dataset.userId;
  console.log("ID de usuario:", userId);

  var btnSi = document.querySelector('#modal-delete-user-button-yes');
  btnSi.value = userId;

  var modal = document.getElementById("modal-delete-user");
  modal.style.zIndex = "2";

  var btnModal = document.querySelector('#modal-delete-user-close-button');

  var btnNo = document.querySelector('#modal-delete-user-button-no');

  modal.style.display = "flex";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  btnModal.onclick = function () {
    console.log
    modal.style.display = "none";
  }

  btnNo.onclick = function () {
    console.log
    modal.style.display = "none";
  }

}

function ModalBanUser() {

  var userId = event.currentTarget.dataset.userId;
  console.log("ID de usuario:", userId);

  var btnSi = document.querySelector('#modal-ban-user-button-yes');
  btnSi.value = userId;

  var modal = document.getElementById("modal-ban-user");
  modal.style.zIndex = "2";

  var btnModal = document.querySelector('#modal-ban-user-close-button');

  var btnNo = document.querySelector('#modal-ban-user-button-no');

  modal.style.display = "flex";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  btnModal.onclick = function () {
    console.log
    modal.style.display = "none";
  }

  btnNo.onclick = function () {
    console.log
    modal.style.display = "none";
  }

}


var currentUserIdsavechangesedit = null;

function ModalUserProfile() {

  var btnEdit = document.querySelector('#modal-info-user-content-form-button-edit');
  if (btnEdit) {
  } else {
    console.error("No se encontró el botón de edición.");
  }

  var modal = document.getElementById("modal-user-profile");
  if (modal) {
    modal.style.zIndex = "2";
    modal.style.display = "flex";
  } else {
    console.error("No se encontró el modal de perfil de usuario.");
  }

  var btnModal = document.querySelector('#modal-user-profile-close-button');
  if (btnModal) {
    btnModal.onclick = function () {
      modal.style.display = "none";
      actionExitEditUserProfile();
    };
  } else {
    console.error("No se encontró el botón de cierre del modal.");
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      actionExitEditUserProfile();
    }
  };
}





function ModalAddUser() {

  var modal = document.getElementById("modal-add-user");
  modal.style.zIndex = "2";

  var btnModal = document.querySelector('#modal-add-user-close-button');

  modal.style.display = "flex";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  btnModal.onclick = function () {
    console.log
    modal.style.display = "none";
    // addUser();
  }

  /**************ADD USER FUNCTION***************/



}

var currentUserIdsavechangesedit = null;

function ModalInfoUser() {

  var userId = event.currentTarget.dataset.userId;
  currentUserIdsavechangesedit = event.currentTarget.dataset.userId;
  console.log("ID de usuario:", userId);

  showEditUser(userId);

  var btnEdit = document.querySelector('#modal-info-user-content-form-button-edit');
  btnEdit.value = userId;

  var modal = document.getElementById("modal-info-user");
  modal.style.zIndex = "2";

  var btnModal = document.querySelector('#modal-info-user-close-button');

  modal.style.display = "flex";

  var showPassword = document.querySelector('#modal-info-user-content-form-column-3-input-password');

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      showPassword.type = "password";
      actionExitEdit();
    }
  }

  btnModal.onclick = function () {
    console.log
    modal.style.display = "none";
    showPassword.type = "password";
    actionExitEdit();
  }




}

