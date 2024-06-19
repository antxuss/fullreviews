
document.addEventListener("DOMContentLoaded", function (event) {
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
  var nameInput = document.getElementById('modal-add-user-content-form-column-2-input-name');
  var firstLastNameInput = document.getElementById('modal-add-user-content-form-column-2-input-first-last-name');
  var secondLastNameInput = document.getElementById('modal-add-user-content-form-column-2-input-second-last-name');
  nameInput.addEventListener('input', addUserFirstLetter);
  firstLastNameInput.addEventListener('input', addUserFirstLetter);
  secondLastNameInput.addEventListener('input', addUserFirstLetter);
  addUserTlf();


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

            if (Usuarios.length === 0) {
              showAlert("No hay usuarios, crea uno", 5000);
              document.getElementById("control-panel-content-list").style.display = "none";
              document.getElementById("control-panel-content-list-no-user").style.display = "flex";
              document.getElementById("control-panel-content-list-no-user").style.overflowY = "hidden";

              var newRow1 = "";
              newRow1 += "<div id='card-add-user' class='card'>";
              newRow1 += "<div class='card-add-user-icon'>";
              newRow1 += "<svg class='card-add-user-icon-icons' viewBox='0 0 448 512'>";
              newRow1 += "<path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />";
              newRow1 += "</svg>";
              newRow1 += "</div>";
              newRow1 += "<div class='card-add-user-title'>";
              newRow1 += "<label>Añadir usuario</label>";
              newRow1 += "</div>";
              newRow1 += "</div>";

              for (let i = 0; i < 4; i++) {
                newRow1 += "<div class='card' style='display: block; visibility: hidden;'>"
                  + "<img src=>"
                  + "<div class='card-info'>"
                  + "<label class='card-name'></label>"
                  + "<label id='card-subname' class='card-name'></label>"
                  + "</div>"
                  + "<label class='card-username'>Usuario:</label>"
                  + "<hr class='card-hr'>"
                  + "<div class='card-icons-container'>"
                  + "<div class='card-icons-container-user-delete'>"
                  + "<svg id='card-delete-user' class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>"
                  + "<path d='M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-info'>"
                  + "<svg class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>"
                  + "<path d='M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z'/>"
                  + "</svg>"
                  + "</div>"
                  + "<div class='card-icons-container-info'>"
                  + "<svg class='card-icons' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>"
                  + "<path id='card-info-user' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'/>"
                  + "</svg>"
                  + "</div>"
                  + "</div>"
                  + "</div>";
              }

              document.getElementById("control-panel-content-list-no-user").insertAdjacentHTML('afterbegin', newRow1);
              document.getElementById("control-panel-content-list").innerHTML += newRow1;

              var addUserModals = document.querySelectorAll('.card-add-user-icon');
              addUserModals.forEach(function (addUserModal) {
                addUserModal.addEventListener("click", ModalAddUser);
              });



            } else {
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
                  + "<img src=" + Usuarios[i].foto_perfil + ">"
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

function deleteUser() {

  console.log("hhhhhh");

  var idValue = document.querySelector('#modal-delete-user-button-yes').value;
  console.log("idvalueee" + idValue);

  var id = idValue;
  console.log("id::" + id);
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

};

function imgDeleteUser() {
  console.log("ttyytytyt");

  var idValue = document.querySelector('#modal-delete-user-button-yes').value;
  console.log("idvalueee11" + idValue);

  var id = idValue;
  console.log("id111::" + id);
  var url = "../controller/es/es_img_delete_user.php";

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
      return response.text();
    })
    .then(result => {

      console.log(result.error);
      deleteUser();
    })
    .catch(error => console.error('Error:', error));
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



function addUserUsernameCheck(input) {
  const valorOriginal = input.value.trim();

  const valorLimpio = valorOriginal.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ]/g, '');

  input.value = valorLimpio;
}

const inputNombreUsuario = document.getElementById('modal-add-user-content-form-column-3-input-username');

inputNombreUsuario.addEventListener('input', function () {
  addUserUsernameCheck(inputNombreUsuario);
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


var btnAddUser = document.querySelector('#modal-add-user-content-form-button');
btnAddUser.addEventListener('click', addUser);

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

    // Verificar condiciones adicionales
    if (name != "" || firstLastName != "" || secondLastName != "" || mail != "" || tlf != "" || username != "" || password != "" || passwordConfirm != "" || userImg != "" || userType != "" || address != "") {
      // Resto del código para enviar el formulario
      if (isTlfValid && isPasswordValid && isCorreoValid) {
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
        showAlert('Hay errores en los datos ingresados.', 5000);
      }

    } else {
      //console.log("Hay errores en los datos ingresados.");  
      // Muestra la alerta con el mensaje de error
      showAlert('Faltan campos por rellenar.', 5000);
    }
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

    var confirmPasswordInput = document.querySelector('#modal-info-user-content-form-column-3-input-password-confirm');
    confirmPasswordInput.style.display = "none";
    confirmPasswordInput.value = "";

    var btnEdit = document.querySelector('#modal-info-user-content-form-button-edit');
    btnEdit.style.display = "flex";
    var btnSave = document.querySelector('#modal-info-user-content-form-button-save');
    btnSave.style.display = "none";
    var btnExit = document.querySelector('#modal-info-user-content-form-button-exit');
    btnExit.style.display = "none";
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
        //document.getElementsByClassName("modal-info-user-content-form-column-1-img").src = result.usuario.foto_perfil;

        var profileImages = document.getElementsByClassName("modal-info-user-content-form-column-1-img");
        if (profileImages.length > 0) {
          profileImages[0].src = result.usuario.foto_perfil;
        } else {
          profileImages[0].src = "../view/img/img-users/user_photo_error_profile.webp";
        }

      }
    })
    .catch(error => console.error('Error status:', error));


}


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


function ModalUserProfile() {

  var modal = document.getElementById("modal-user-profile");
  modal.style.zIndex = "2";

  var btnModal = document.querySelector('#modal-user-profile-close-button');

  // // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("modal-close-button")[0];

  modal.style.display = "flex";


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  btnModal.onclick = function () {
    modal.style.display = "none";

  }

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

function ModalInfoUser() {

  var userId = event.currentTarget.dataset.userId;
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

