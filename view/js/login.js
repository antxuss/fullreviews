document.addEventListener("DOMContentLoaded", function (event) {

    //loggedVerify();
    document.querySelector('#login-go').addEventListener('click', Buttonregistrer);
    document.querySelector('#registered-back').addEventListener('click', Buttonback);
    document.querySelector('#login-register-button').addEventListener('click', register);
    var nameInput = document.getElementById('login-register-input-name');
    var firstLastNameInput = document.getElementById('login-register-input-first-last-name');
    var secondLastNameInput = document.getElementById('login-register-input-second-last-name');
    nameInput.addEventListener('input', registerFirstLetter);
    firstLastNameInput.addEventListener('input', registerFirstLetter);
    secondLastNameInput.addEventListener('input', registerFirstLetter);

})

function Buttonregistrer() {

    var loginContainer = document.querySelector('.login-container');
    var loginRegisterContainer = document.querySelector('.login-register-container');

    loginContainer.style.display = "none";
    loginRegisterContainer.style.display = "flex";

}

function Buttonback() {

    var loginContainer = document.querySelector('.login-container');
    var loginRegisterContainer = document.querySelector('.login-register-container');

    loginContainer.style.display = "flex";
    loginRegisterContainer.style.display = "none";

}

function registerFirstLetter(event) {
    var inputField = event.target;
    var inputValue = inputField.value.trim();

    var formattedValue = inputValue.replace(/[^a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]/g, '');

    formattedValue = formattedValue.replace(/\b\w+/g, function (match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });

    inputField.value = formattedValue;
}

const inputCorreo = document.getElementById('login-register-input-mail');

inputCorreo.addEventListener('input', function () {
    const correo = inputCorreo.value;

    const isCorreoValido = registerMailCheck(correo);
    if (isCorreoValido) {
        inputCorreo.style.border = '2px solid green';
    } else {
        inputCorreo.style.border = '2px solid red';
    }
});

inputCorreo.addEventListener('blur', function () {
    const correo = inputCorreo.value;

    const isCorreoValido = registerMailCheck(correo, true);
    if (isCorreoValido) {
        inputCorreo.style.border = '2px solid green';
    } else {
        inputCorreo.style.border = '2px solid red';
    }
});

function registerMailCheck(correo, validarDominio = false) {
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
            const registrosMXValidos = registerMailCheckMXRegister(dominio);
            return registrosMXValidos;
        }
    }

    return true;
}

async function registerMailCheckMXRegister(dominio) {
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
  
    // Obtener todos los select de códigos de país
    const selectElements = document.querySelectorAll('.countryCodesSelect');
  
    selectElements.forEach(selectElement => {
        // Limpiar los elementos existentes
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
        const selectedCountryCode = countrySelect.value || "";
        const enteredPhoneNumber = input.value || "";
  
        const combinedValue = selectedCountryCode ? selectedCountryCode + " " + enteredPhoneNumber : enteredPhoneNumber;
  
        input.setAttribute('data-phone-value', combinedValue); // Actualiza el valor del atributo personalizado
  
        console.log(combinedValue);
    } else {
        console.error("El elemento de entrada de teléfono no está definido.");
    }
  }
  
  
  function addUserTlfCheck(input) {
    if (input) {
      input.value = input.value.replace(/\D/g, '');
  
      if (input.value.length > 9) {
        input.value = input.value.slice(0, 9);
      }
  
      updateUserTlf(input);
  
      if (input.value.length < 9) {
        console.log('El número de teléfono debe tener al menos 9 dígitos.');
        return false;
      } else {
        console.log('');
        return true;
      }
    } else {
      console.error("El elemento de entrada de teléfono no está definido.");
      return false;
    }
  }

function registerUsernameCheck(input) {
    const valorOriginal = input.value.trim();
  
    const valorLimpio = valorOriginal.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ]/g, '');
  
    input.value = valorLimpio;
  }
  
  const inputNombreUsuario = document.getElementById('login-register-input-username');
  
  inputNombreUsuario.addEventListener('input', function () {
    registerUsernameCheck(inputNombreUsuario);
  });


function registerPasswordConfirmCheck() {
    var password = document.getElementById("login-register-input-password").value;
    var confirmPassword = document.getElementById("login-register-input-passoword-confirm").value;

    if (password === confirmPassword) {
        console.log("Las contraseñas coinciden.");
        return true;
    } else {
        console.error("Las contraseñas no coinciden.");
        return false;
    }
}

document.getElementById("login-register-input-password").addEventListener("input", registerPasswordConfirmCheck);
document.getElementById("login-register-input-passoword-confirm").addEventListener("input", registerPasswordConfirmCheck);

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

// function login(){
//     console.log("intentos: "+intentos);
//         var userName = document.getElementById("userName").value;
//         var keyWord = document.getElementById("keyWord").value;
//         var respuesta = document.getElementById("respuesta").value;



//         var url = "controller/cLogin.php";
//         var data = { 'nombre': userName, 'password': keyWord};	

//         fetch(url, {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers:{'Content-Type': 'application/json'}
//             })
//       .then(res => res.json()).then(result => {

//         if ((intentos>0) && (intentos<=3)) {


//             if(result.error == "no error"){

//                 //alert("Your login is " + result.nombre);
//                 if(result.tipo == "admin"){
//                     location.href = "../listaUsuarios.html";
//                 }else if(result.tipo == "cliente"){
//                     document.getElementById("ocultarIcono").style.display="block";
//                     document.getElementById("nombreUsuario").style.display="block";
//                     document.getElementById("botonInicioSesion").style.display="none";
//                     document.getElementById("myModal").style.display="none";
//                     document.getElementById("nombreUsuario").innerHTML=result.nombre;
//                     document.getElementById('editarDatosUsuario').addEventListener('click', showDatosUsuario);
//                 }


//             }else if (result.error == "incorrect user"){
//                 document.getElementById("parrafoAlertUsuarios").style.display="block";
//                 document.getElementById("parrafoAlertUsuarios").innerHTML="<p style='color:red;' >"+ 'NOMBRE O CONTRASEÑA INCORRECTAS'+"</p>";
//                 intentos=intentos-1;
//             }else if (result.error="username or password not filled") {
//                 console.log("res: "+result.error);
//                 document.getElementById("parrafoAlertUsuarios").style.display="block";
//                 document.getElementById("parrafoAlertUsuarios").innerHTML="<p style='color:red;' >"+ 'NO SE ADMITE LOS CAMPOS VACIOS'+"</p>";

//             }

//         } else if (intentos==0) { 
//             document.getElementById("parrafoAlertUsuarios").style.display="block";
//             document.getElementById("parrafoAlertUsuarios").innerHTML="<p style='color:red;' >"+ 'INTENTOS AGOTADOS, INTRODUZCA LA PALABRA DE SEGURIDAD'+"</p>";
//             document.getElementById('usuario').style.display="block";
//             document.getElementById('contrasenia').style.display="none";
//             document.getElementById('pregunta').style.display="block";
//             intentos=intentos-1;
//         }else {

//             respuestaCorrecta();

//         }


//       })
//       .catch(error => console.error('Error status:', error));

//     }

function register() {
    console.log("yyrr");
    var name = document.getElementById("login-register-input-name").value;
    var firstLastName = document.getElementById("login-register-input-first-last-name").value;
    var secondLastName = document.getElementById("login-register-input-second-last-name").value;
    var mail = document.getElementById("login-register-input-mail").value;
    var tlf = document.getElementById("login-register-input-tlf").value;
    var address = document.getElementById("login-register-input-address").value;
    var username = document.getElementById("login-register-input-username").value;
    var password = document.getElementById("login-register-input-password").value;
    var passwordConfirm = document.getElementById("login-register-input-passoword-confirm").value;

    console.log("name: "+name + " firstLastName: " + firstLastName + " secondLastName: " + secondLastName + " mail: " + mail + " tlf: " +  tlf + " address:" + address + " username: "+ username + " password: "+ password + " passwordConfirm:" + passwordConfirm);

    // if (nombre == "" || correo == "" || password == "" || tipo == "" || respuesta == "") {

    //     document.getElementById("errorInsertarUsuarios").style.display="block";
    //     document.getElementById("errorInsertarUsuarios").innerHTML="<p id='errorInsertarUsuarios' style='color:red;margin:3%;' >EREMU GUZTIAK BETETA EGON BEHAR DIRA</p>";

    // } else {

    //     document.getElementById("errorInsertarUsuarios").style.display="block";

    //     var url = "controller/controller_insert_usuarios.php";
    //     var data = { 'nombre': nombre, 'correo': correo, 'password': password, 'tipo': tipo, 'respuesta': respuesta };
    //     console.log(data);
    //     fetch(url, {
    //         method: 'POST', // or 'POST'
    //         body: JSON.stringify(data), // data can be `string` or {object}!
    //         headers: { 'Content-Type': 'application/json' }  //input data
    //     })
    //         .then(res => res.json()).then(result => {

    //             console.log(result.error);
    //             //alert(result.error);

    //             document.getElementById("errorInsertarUsuarios").innerHTML="<p id='errorInsertarUsuarios' style='color:green;margin:3%;' >DATUAK SARTU EGIN DIRA</p>";
    //             document.getElementById("errorInsertarUsuarios").style.display="none";

    //             tablaEditar();
    //             document.getElementById("inputNombreUsuario").value = "";
    //             document.getElementById("inputCorreoUsuario").value = "";
    //             document.getElementById("inputPasswordUsuario").value = "";
    //             document.getElementById("inputTipoUsuario").value = "";
    //             document.getElementById("inputRespuestaUsuario").value = "";

    //         })
    //         .catch(error => console.error('Error status:', error));

    // };

}