document.addEventListener("DOMContentLoaded", function (event) {

    loggedVerify();
    document.querySelector('.login-button').addEventListener('click', LoginUser);
    document.querySelector('#login-go').addEventListener('click', Buttonregistrer);
    document.querySelector('#registered-back').addEventListener('click', Buttonback);
    //document.querySelector('#user-forgotten').addEventListener('click', handleForgotPassword);
    document.querySelector('#login-help').addEventListener('click', ButtonHelp);
    const codeInputs = document.querySelectorAll('.code-input');

    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function () {
            if (this.value.length === this.maxLength) {
                // Mover el foco al siguiente input si existe
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace' && this.value === '' && index > 0) {
                // Mover el foco al input anterior si se presiona Backspace y el input está vacío
                codeInputs[index - 1].focus();
            }
        });
    });

    document.getElementById('reset-password').addEventListener('click', changePassword);

})

function loggedVerify() {
    var url = "../controller/es/es_logged_verify.php";

    fetch(url, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(result => {
            console.log(result);

            if (result.error !== "logged") {
                //window.location.href = "../es/login.html";
            } else {

                console.log("tipoo " + result.tipo);
                if (result.tipo_usuario === "Administrador") {
                    location.href = "../es/adminControlPanel.html";
                } else if (result.tipo_usuario === "Usuario") {
                    // Redirige a la página de usuario si el usuario es cliente
                    location.href = "../es/index.html";
                }
            }
        })
        .catch(error => console.error('Error status:', error));
}

var nameInput = document.getElementById('login-input-name');
var firstlastNameInput = document.getElementById('login-input-first-last-name');
var secondlastNameInput = document.getElementById('login-input-second-last-name');
var emailInput = document.getElementById('login-input-email');
var usernameInput = document.getElementById('login-input-username');
var passwordInput = document.getElementById('login-input-password');
var confirmPasswordInput = document.getElementById('login-input-password-confirm');

function Buttonregistrer() {

    var loginContainer = document.querySelector('.login-container');
    var loginRegisterContainer = document.querySelector('.login-register-container');

    loginContainer.style.display = "none";
    loginRegisterContainer.style.display = "flex";

}

function Buttonback() {
    var loginContainer = document.querySelector('.login-container');
    var loginRegisterContainer = document.querySelector('.login-register-container');
    var verificationCodeSection = document.getElementById("verification-code-section");
    var registrationForm = document.getElementById("registration-form");

    var verificationVisible = verificationCodeSection.style.display === "flex";
    var registrationVisible = loginRegisterContainer.style.display === "flex";

    if (verificationVisible) {
        verificationCodeSection.style.display = "none";
        loginRegisterContainer.style.display = "flex";
        loginContainer.style.display = "none";
        registrationForm.style.display = "flex";


        var registrationInputs = loginRegisterContainer.querySelectorAll('input');
        registrationInputs.forEach(input => {
            input.style.display = "block";
            input.disabled = false;
        });

        var registrationButton = loginRegisterContainer.querySelector('button');
        registrationButton.style.display = "block";
        registrationButton.disabled = false;

        document.getElementById('resend-code').style.display = "none";
    } else if (registrationVisible) {
        loginRegisterContainer.style.display = "none";
        loginContainer.style.display = "flex";
        verificationCodeSection.style.display = "none";
    }
}

function formatName(input) {
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    input.value = input.value.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
}
function validateEmail(input) {
    input.value = input.value.replace(/[^a-zA-Z0-9@.]/g, '');
}

function validateUsername(input) {
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
}

function validatePasswords() {
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;
    var passwordsMatch = (password === confirmPassword);
    return passwordsMatch;
}

nameInput.addEventListener('input', function () {
    formatName(nameInput);
});

firstlastNameInput.addEventListener('input', function () {
    formatName(firstlastNameInput);
});

secondlastNameInput.addEventListener('input', function () {
    formatName(secondlastNameInput);
});

emailInput.addEventListener('input', function () {
    validateEmail(emailInput);
});

usernameInput.addEventListener('input', function () {
    validateUsername(usernameInput);
});

passwordInput.addEventListener('input', validatePasswords);
confirmPasswordInput.addEventListener('input', validatePasswords);

function showAlert(message, duration, type = 'error') {
    var alertBox = document.getElementById('alert');
    alertBox.textContent = message;

    alertBox.className = 'alert show';

    alertBox.classList.add(type);

    alertBox.classList.remove('hidden');

    setTimeout(function () {
        alertBox.classList.add('hidden');
        alertBox.className = 'alert hidden';
    }, duration);
}

function registerUserCheck() {

    var name = document.getElementById("login-input-name").value;
    var firstlastNameInput = document.getElementById('login-input-first-last-name').value;
    var secondlastNameInput = document.getElementById('login-input-second-last-name').value;
    var email = document.getElementById("login-input-email").value;
    var username = document.getElementById("login-input-username").value;
    var password = document.getElementById("login-input-password").value;
    var passwordconfirm = document.getElementById("login-input-password-confirm").value;

    if (name === "" || firstlastNameInput === "" || secondlastNameInput === "" || email === "" || username === "" || password === "" || passwordconfirm === "") {
        showAlert("Rellene todos los campos", 5000, 'error');
        return;
    }

    if (!validatePasswords()) {
        showAlert("Las contraseñas no coinciden", 5000, 'error');
        return;
    }

    var checkEmailUrl = "../controller/es/es_check_email_availability.php";
    var emailData = { 'email': email };

    fetch(checkEmailUrl, {
        method: 'POST',
        body: JSON.stringify(emailData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.text())
        .then(text => {
            console.log("Response text:", text);
            return JSON.parse(text);
        })
        .then(result => {
            if (result.exists) {
                showAlert("El correo ya está registrado", 5000, 'info');
            } else {
                sendVerificationCode(name, firstlastNameInput, secondlastNameInput, email, username, password);
            }
        })
        .catch(error => console.error('Error:', error));

}

function sendVerificationCode(name, firstlastNameInput, secondlastNameInput, email, username, password) {
    var url = "../controller/es/es_register_send_verification_code.php";
    var data = {
        'nombre': name,
        'apellido1': firstlastNameInput,
        'apellido2': secondlastNameInput,
        'correo': email,
        'usuario': username,
        'password': password
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                document.querySelector('.login-register-form').style.display = "none";
                document.getElementById("verification-code-section").style.display = "flex";
                document.getElementById('resend-code').style.display = "flex";
            } else {
                showAlert(result.error || "Error desconocido", 5000, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert("Error en la solicitud", 5000, 'error');
        });
}

function resendVerificationCode() {
    const name = document.getElementById('login-input-name').value;
    var firstlastNameInput = document.getElementById('login-input-first-last-name').value;
    var secondlastNameInput = document.getElementById('login-input-second-last-name').value;
    const email = document.getElementById('login-input-email').value;
    const username = document.getElementById('login-input-username').value;
    const password = document.getElementById('login-input-password').value;

    const url = "../controller/es/es_register_send_verification_code.php";
    var data = {
        'nombre': name,
        'apellido1': firstlastNameInput,
        'apellido2': secondlastNameInput,
        'correo': email,
        'usuario': username,
        'password': password
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                showAlert("El código de verificación se ha reenviado.", 5000, 'success');
            } else {
                showAlert(result.error || "Error al reenviar el código. Inténtalo de nuevo.", 5000, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert("Error en la solicitud", 5000, 'error');
        });
}

function moveFocus(index) {
    const inputs = document.querySelectorAll('.verification-input');
    const currentInput = inputs[index];
    if (currentInput.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
    } else if (currentInput.value.length === 0 && index > 0) {
        inputs[index - 1].focus();
    }
}

function togglePasswordVisibility(inputId, toggleElement) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = toggleElement.querySelector('svg');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.innerHTML = '<path d="M13.359 14.401l-1.61-1.609A6.318 6.318 0 0 1 8 15c-2.12 0-3.879-1.07-5.168-2.957A13.133 13.133 0 0 1 0 8c.058-.082.122-.173.195-.271l.43-.537L2.641 7.64A6.318 6.318 0 0 1 8 1c2.12 0 3.879 1.07 5.168 2.957A13.133 13.133 0 0 1 16 8c-.058.082-.122.173-.195.271l-.43.537L13.359 8.36A6.318 6.318 0 0 1 8 15zM3.757 12.243a4 4 0 0 0 5.66 0 4 4 0 0 0 0-5.66L3.757 12.243zm-1.414-1.414a6 6 0 0 1 8.486 0 6 6 0 0 1 0 8.486L2.343 10.829z"/>';
    } else {
        passwordInput.type = "password";
        eyeIcon.innerHTML = '<path d="M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.07 5.88 3 8 3c2.12 0 3.879 1.07 5.168 2.957A13.133 13.133 0 0 1 14.828 8c-.058.082-.122.173-.195.271-.058.082-.122.173-.195.271-.147.204-.308.416-.486.63a13.133 13.133 0 0 1-1.66 2.043C11.88 11.93 10.12 13 8 13c-2.12 0-3.879-1.07-5.168-2.957A13.133 13.133 0 0 1 1.173 8zm10.76 0a4 4 0 1 0-7.866 0 4 4 0 0 0 7.866 0z"/>';
    }
}


function verifyCode() {
    const inputs = document.querySelectorAll('.verification-input');
    let verificationCode = '';

    inputs.forEach(input => {
        verificationCode += input.value;
    });

    const email = document.getElementById('login-input-email').value;

    const url = "../controller/es/es_verify_code.php";
    const data = {
        'correo': email,
        'codigo': verificationCode
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                showAlert("Código verificado correctamente.", 5000, 'success');
                registerUser();
            } else {
                showAlert(result.error || "Código incorrecto. Inténtalo de nuevo.", 5000, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert("Error en la solicitud", 5000, 'error');
        });
}

function registerUser() {
    console.log("Registrado");
    const name = document.getElementById('login-input-name').value;
    const firstlastNameInput = document.getElementById('login-input-first-last-name').value;
    const secondlastNameInput = document.getElementById('login-input-second-last-name').value;
    const email = document.getElementById('login-input-email').value;
    const username = document.getElementById('login-input-username').value;
    const password = document.getElementById('login-input-password').value;

    const url = "../controller/es/es_register_user.php";
    const data = {
        'name': name,
        'firstlastName': firstlastNameInput,
        'secondlastName': secondlastNameInput,
        'email': email,
        'username': username,
        'password': password
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                showAlert("Usuario registrado correctamente. Redirigiendo al login...", 5000, 'success');

                document.getElementById("verification-code-section").style.display = "none";

                document.querySelector('.login-container').style.display = "flex";
                document.querySelector('.login-register-container').style.display = "none";

                document.getElementById('login-input-name').value = '';
                document.getElementById('login-input-first-last-name').value = '';
                document.getElementById('login-input-second-last-name').value = '';
                document.getElementById('login-input-email').value = '';
                document.getElementById('login-input-username').value = '';
                document.getElementById('login-input-password').value = '';
                document.getElementById('login-input-password-confirm').value = '';

                const verificationInputs = document.querySelectorAll('.verification-input');
                verificationInputs.forEach(input => input.value = '');

                document.getElementById('registration-form').style.display = "flex";
                document.getElementById('resend-code').style.display = "none";

            } else {
                showAlert(result.error || "Error en el registro. Inténtalo de nuevo.", 5000, 'error');
            }
        })

        .catch(error => {
            console.error('Error:', error);
            showAlert("Error en la solicitud", 5000, 'error');
        });
}




function LoginUser() {
    var username = document.querySelector("#login-username").value;
    var password = document.querySelector("#login-password").value;

    if (!username || !password) {
        showAlert("No se admiten campos vacíos", 5000, 'error');
        return;
    }

    var url = "../controller/es/es_login_user.php";
    var data = { 'username': username, 'password': password };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(result => {
        if (result.error === "no error") {
            if (result.tipo_usuario === "Administrador") {
                window.location.href = "../es/adminControlPanel.html";
            } else if (result.tipo_usuario === "Usuario") {
                window.location.href = "../es/index.html";
            }
        } else if (result.error === "user suspended") {
            showAlert("Tu cuenta está suspendida. Por favor, contacta al soporte.", 5000, 'error');
        } else if (result.error === "incorrect user") {
            showAlert("Nombre o contraseña incorrectos", 5000, 'error');
        }
    })
    .catch(error => {
        console.error('Error status:', error);
        showAlert("Hubo un error en el proceso de inicio de sesión. Inténtalo de nuevo.", 5000, 'error');
    });
}



document.getElementById('login-help').addEventListener('click', function () {
    document.getElementById('help-screen').style.display = 'flex';
});

function ButtonHelp() {
    const helpSelect = document.getElementById('help-options');

    if (helpSelect) {
        helpSelect.addEventListener('change', function () {
            const helpTopic = helpSelect.value;

            if (helpTopic) {
                switch (helpTopic) {
                    case 'forgot-password':
                        handleForgotPassword();
                        break;
                    case 'forgot-username':
                        handleForgotUsername();
                        break;
                    case 'other-issue':
                        handleOtherIssue();
                        break;
                    default:
                        alert("Opción no reconocida");
                }
                document.getElementById('help-screen').style.display = 'none';
                helpSelect.selectedIndex = 0;
            }
        });

        document.getElementById('close-help').addEventListener('click', function () {
            document.getElementById('help-screen').style.display = 'none';
        });

        window.addEventListener('click', function (e) {
            const helpButton = document.getElementById('login-help');
            const helpDropdown = document.getElementById('help-dropdown');

            if (!helpButton.contains(e.target) && !helpDropdown.contains(e.target)) {
                document.getElementById('help-screen').style.display = 'none';
            }
        });
    } else {
        console.error('No se encontraron los elementos del menú de ayuda.');
    }
}


// document.getElementById('forgot-back-button').addEventListener('click', function () {
//     const loginContainer = document.querySelector('.login-container');
//     const forgotPasswordForm = document.getElementById('forgot-password-form');
//     const verifyRecoveryCodeForm = document.getElementById('verify-recovery-code-form');
//     const resetPasswordForm = document.getElementById('reset-password-form');

//     if (resetPasswordForm.style.display === 'flex') {
//         // Si estamos en la pantalla de restablecer contraseña, volvemos a la pantalla de verificación de código
//         resetPasswordForm.style.display = 'none';
//         verifyRecoveryCodeForm.style.display = 'flex';
//     } else if (verifyRecoveryCodeForm.style.display === 'flex') {
//         // Si estamos en la pantalla de verificación de código, volvemos a la pantalla de recuperación de contraseña
//         verifyRecoveryCodeForm.style.display = 'none';
//         forgotPasswordForm.style.display = 'flex';
//     } else if (forgotPasswordForm.style.display === 'flex') {
//         // Si estamos en la pantalla de recuperación de contraseña, volvemos a la pantalla de login
//         forgotPasswordForm.style.display = 'none';
//         loginContainer.style.display = 'flex';
//     } else {
//         console.error('No se encontró ninguna pantalla activa para retroceder.');
//     }
// });

document.querySelectorAll('.go-back').forEach(button => {
    button.addEventListener('click', () => {

        // Oculta todos los contenedores manualmente
        document.getElementById('forgot-password-form').style.display = 'none';
        document.getElementById('verify-recovery-code-form').style.display = 'none';
        document.getElementById('reset-password-form').style.display = 'none';
        document.getElementById('forgot-username-form').style.display = 'none';
        document.getElementById('username-display').style.display = 'none';
        document.getElementById('change-username-container').style.display = 'none';
        document.getElementById('account-problem-container').style.display = 'none';

        const loginContainer = document.querySelector('.login-container');

        if (loginContainer) {
            loginContainer.style.display = 'flex';

            // Limpia todos los inputs, textareas y selects
            document.querySelectorAll('input').forEach(input => input.value = '');
            document.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
            document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
        }
    });
});




function handleForgotPassword() {
    const loginContainer = document.querySelector('.login-container');

    if (loginContainer) {
        loginContainer.style.display = 'none';

        // Mostrar el formulario de recuperación de contraseña
        document.getElementById('forgot-password-form').style.display = 'flex';

        // Ocultar otras pantallas si es necesario
        document.getElementById('verify-recovery-code-form').style.display = 'none';
        document.getElementById('reset-password-form').style.display = 'none';

        // Agregar el evento al botón de enviar correo de recuperación
        document.getElementById('send-recovery-email').addEventListener('click', function () {
            const email = document.getElementById('forgot-email').value;

            // Verificar si el correo existe
            checkEmailExists(email, function (emailExists) {
                if (emailExists) {
                    // Enviar código de verificación
                    sendHelpVerificationCode(email, 'forgot-password', function (success) {
                        if (success) {
                            // Ocultar el formulario de recuperación de contraseña
                            document.getElementById('forgot-password-form').style.display = 'none';

                            // Mostrar el formulario de verificación de código
                            document.getElementById('verify-recovery-code-form').style.display = 'flex';


                            // Agregar evento para verificar código
                            document.getElementById('verify-recovery-code').addEventListener('click', function () {
                                // Recoger los valores de los inputs de código
                                const codeInputs = document.querySelectorAll('#verify-recovery-code-form input[type="text"]');
                                let enteredCode = '';
                                codeInputs.forEach(input => enteredCode += input.value);

                                // Llamar a la función de verificación del código
                                verifyCodeHelp(enteredCode, email, 'reset-password');
                            });

                            // Agregar evento para reenviar código
                            document.getElementById('resend-recovery-email').addEventListener('click', function (event) {
                                event.preventDefault();
                                sendHelpVerificationCode(email, 'forgot-password', function (success) {
                                    if (success) {
                                        alert('Se ha reenviado el correo con el código de verificación.');
                                    } else {
                                        alert('Error al reenviar el correo. Por favor, intenta de nuevo.');
                                    }
                                });
                            });

                        } else {
                            alert('Error al enviar el correo de recuperación.');
                        }
                    });
                } else {
                    alert('El correo no existe. Por favor, introduce un correo válido.');
                }
            });
        });
    } else {
        console.error('No se encontró el contenedor de login.');
    }
}


function checkEmailExists(email, callback) {
    const url = "../controller/es/es_check_email_availability.php";
    const data = { 'email': email };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(result => {
            if (result.exists) {
                callback(true); // El correo existe
            } else {
                callback(false); // El correo no existe
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error en la verificación del correo.');
            callback(false);
        });
}

function changePassword() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('forgot-email').value;

    // Verificar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Verificar que la nueva contraseña no sea la misma que la antigua
    checkOldPassword(email, newPassword, function (isSame) {
        if (isSame) {
            alert('La nueva contraseña no puede ser la misma que la antigua.');
        } else {
            // Llamar a la función que actualiza la contraseña en la base de datos
            updatePassword(email, newPassword, confirmPassword, function (success) {  // Asegúrate de pasar confirmPassword también
                if (success) {
                    alert('Contraseña restablecida con éxito.');
                } else {
                    alert('Error al restablecer la contraseña.');
                }
            });
        }
    });
}

function checkOldPassword(email, newPassword, callback) {
    fetch('../controller/es/es_check-old-password-endpoint.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, newPassword: newPassword }),
    })
        .then(response => response.text())  // Cambiado a .text() para ver la respuesta sin parsear
        .then(data => {
            console.log("Raw response from server:", data);  // Mostrar la respuesta en bruto en la consola
            try {
                const jsonData = JSON.parse(data);  // Intentar parsear manualmente
                callback(jsonData.isSame);
            } catch (e) {
                console.error("Error parsing JSON:", e, data);  // Mostrar el error si el JSON es inválido
                callback(false);  // Llamar al callback con false en caso de error
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function updatePassword(email, newPassword, confirmPassword) {
    console.log("Datos que se enviarán al servidor:");
    console.log("Email:", email);
    console.log("Nueva Contraseña:", newPassword);
    console.log("Confirmación de Contraseña:", confirmPassword);

    const data = {
        email: email,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    };

    fetch('../controller/es/es_update-password-endpoint.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            console.log('Respuesta recibida del servidor:', response);
            return response.json();
        })
        .then(data => {
            console.log('Datos devueltos por el servidor:', data);

            if (data.success) {
                alert('Contraseña restablecida con éxito.');

                // Limpiar los campos de entrada
                const newPasswordInput = document.getElementById('new-password');
                const confirmPasswordInput = document.getElementById('confirm-password');
                const verificationCodeInput = document.getElementById('verification-code');

                if (newPasswordInput) newPasswordInput.value = '';
                if (confirmPasswordInput) confirmPasswordInput.value = '';
                if (verificationCodeInput) verificationCodeInput.value = ''; // Si tienes un campo para el código de verificación

                // Ocultar la ventana de restablecimiento de contraseña y mostrar la de login
                const resetPasswordForm = document.getElementById('reset-password-form');
                const loginContainer = document.querySelector('.login-container');

                if (resetPasswordForm) resetPasswordForm.style.display = 'none';
                if (loginContainer) loginContainer.style.display = 'flex';
            } else {
                alert('Error al restablecer la contraseña.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar restablecer la contraseña.');
        });
}




function handleForgotUsername() { //REHACER OPCION DE AYUDA (EL CAMBIO DE USUARIO SE DEBE DE REALIZAR EN UN CORREO, DESPUES DE HABER VERIFICADO EL CORREO)
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.style.display = 'none';
    }

    // Ocultar formularios que no sean el de recuperación de nombre de usuario
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('verify-recovery-code-form').style.display = 'none';
    document.getElementById('reset-password-form').style.display = 'none';

    // Mostrar la pantalla de recuperación de nombre de usuario
    document.getElementById('forgot-username-form').style.display = 'flex';

    // Agregar evento al botón de enviar correo para recuperación de nombre de usuario
    document.getElementById('send-username-recovery-email').addEventListener('click', function () {
        const email = document.getElementById('username-email').value;

        // Verificar si el correo existe
        checkEmailExists(email, function (emailExists) {
            if (emailExists) {
                // Enviar código de verificación
                sendHelpVerificationCode(email, 'forgot-username', function (success) {
                    if (success) {
                        // Ocultar el formulario de recuperación de nombre de usuario
                        document.getElementById('forgot-username-form').style.display = 'none';

                        // Mostrar el formulario de verificación de código
                        document.getElementById('verify-recovery-code-form').style.display = 'flex';

                        // Agregar evento para verificar código
                        document.getElementById('verify-recovery-code').addEventListener('click', function () {
                            // Recoger los valores de los inputs de código
                            const codeInputs = document.querySelectorAll('#verify-recovery-code-form input[type="text"]');
                            let enteredCode = '';
                            codeInputs.forEach(input => enteredCode += input.value);

                            verifyCodeHelp(enteredCode, email, 'recover-username')
                                .then(codeIsValid => {
                                    if (codeIsValid) {
                                        // Obtener el nombre de usuario asociado al correo
                                        retrieveUsername(email, function (username) {
                                            if (username) {
                                                // Mostrar el nombre de usuario recuperado
                                                // document.getElementById('username-recovered-form').style.display = 'flex';
                                                document.getElementById('display-username').textContent = username;

                                                document.getElementById('change-username').addEventListener('click', function (event) {

                                                    document.getElementById('change-username-container').style.display = "flex";
                                                    document.getElementById('username-display').style.display = "none";

                                                    document.getElementById('change-username-submit').addEventListener('click', function (event) {

                                                        event.preventDefault();

                                                        const newUsername = document.getElementById('new-username').value;
                                                        const password = document.getElementById('password').value;

                                                        if (!newUsername || !password) {
                                                            alert('Por favor, completa todos los campos.');
                                                            return;
                                                        }

                                                        console.log("mailll" + email);
                                                        console.log("pasworddd " + password);

                                                        fetch('../controller/es/es_verify_password.php', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                            },
                                                            body: JSON.stringify({ email: email, password: password }), // Enviar el correo y la contraseña
                                                        })
                                                            .then(response => response.json())
                                                            .then(data => {
                                                                if (data.success) {
                                                                    // Si la contraseña es correcta, proceder con la actualización del nombre de usuario
                                                                    updateUsername(email, newUsername);
                                                                } else {
                                                                    alert('Contraseña incorrecta. Por favor, inténtalo de nuevo.'); //ME DEUVELVE ESTO
                                                                }
                                                            })
                                                            .catch(error => {
                                                                console.error('Error en la verificación de la contraseña:', error);
                                                                alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
                                                            });

                                                    });

                                                });

                                            } else {
                                                alert('No se pudo recuperar el nombre de usuario.');
                                            }
                                        });
                                    } else {
                                        alert('Código de verificación inválido. Por favor, intenta de nuevo.');
                                    }
                                })
                                .catch(error => {
                                    console.error('Error al verificar el código:', error);
                                    alert('Error al verificar el código.');
                                });
                        });

                        // Agregar evento para reenviar código
                        document.getElementById('resend-recovery-email').addEventListener('click', function (event) {
                            event.preventDefault();
                            sendHelpVerificationCode(email, 'forgot-username', function (success) {
                                if (success) {
                                    alert('Se ha reenviado el correo con el código de verificación.');
                                } else {
                                    alert('Error al reenviar el correo. Por favor, intenta de nuevo.');
                                }
                            });
                        });

                    } else {
                        alert('Error al enviar el correo de recuperación.');
                    }
                });
            } else {
                alert('El correo no existe. Por favor, introduce un correo válido.');
            }
        });
    });
}

function updateUsername(email, newUsername) {
    fetch('../controller/es/es_update_username.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, newUsername: newUsername }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('El nombre de usuario ha sido cambiado exitosamente.');
                document.getElementById('change-username-container').style.display = "none";
                const loginContainer = document.querySelector('.login-container');
                if (loginContainer) {
                    loginContainer.style.display = 'flex';
                }

            } else {
                alert('Error al actualizar el nombre de usuario.');
            }
        })
        .catch(error => {
            console.error('Error al actualizar el nombre de usuario:', error);
            alert('Error al conectar con el servidor.');
        });
}


function retrieveUsername(email, callback) {
    fetch('../controller/es/es_retrieve-username-endpoint.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
        .then(response => response.text())  // Recibir la respuesta como texto en bruto
        .then(data => {
            console.log("Raw response from server:", data);  // Mostrar la respuesta en bruto en la consola
            try {
                const jsonData = JSON.parse(data);  // Intentar parsear manualmente
                if (jsonData.success) {
                    callback(jsonData.username);  // Pasar el nombre de usuario al callback
                } else {
                    callback(null);  // Indicar que no se encontró el nombre de usuario
                }
            } catch (e) {
                console.error("Error parsing JSON:", e, data);  // Mostrar error si el JSON es inválido
                callback(null);  // Llamar al callback con null en caso de error
            }
        })
        .catch(error => {
            console.error('Error:', error);
            callback(null);  // Llamar al callback con null en caso de error de red u otro error
        });
}



function handleOtherIssue() {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.style.display = 'none';
    }

    document.getElementById('account-problem-container').style.display = 'flex';

    document.getElementById('submit-problem').addEventListener('click', function () {
        const reason = document.getElementById('problem-reason').value;
        const details = document.getElementById('problem-details').value;
        const email = document.getElementById('user-email').value;

        if (!email) {
            showAlert('Por favor, introduce tu dirección de correo.', 5000, 'error');
            return;
        }

        if (!reason) {
            showAlert('Por favor, selecciona un motivo.', 5000, 'error');
            return;
        }

        const data = {
            email: email,
            reason: reason,
            details: details
        };

        fetch('../controller/es/es_help_another_issue.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showAlert('Incidencia registrada con éxito. Un correo ha sido enviado a ' + email, 5000, 'success');
                    document.getElementById('problem-reason').value = '';
                    document.getElementById('problem-details').value = '';
                    document.getElementById('user-email').value = '';
                    document.querySelector('.account-problem-container').style.display = "none"
                    const loginContainer = document.querySelector('.login-container');
                    if (loginContainer) {
                        loginContainer.style.display = 'flex';
                    }

                } else {
                    showAlert('Error al guardar la incidencia o enviar el correo: ' + result.message, 5000, 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Error en la solicitud. Inténtalo de nuevo.', 5000, 'error');
            });
    });
}


function sendHelpVerificationCode(email, purpose, callback) {
    const url = "../controller/es/help_cases_send_verification.php";
    const data = { 'correo': email, 'propósito': purpose };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                // Llamar al callback para indicar éxito y proceder con el cambio de pantalla
                callback(true);

                // Mostrar notificación de éxito
                showAlert("Código de verificación enviado.", 5000, 'success');
            } else {
                // Llamar al callback para indicar fallo y evitar el cambio de pantalla
                callback(false);

                // Mostrar mensaje de error
                showAlert(result.error || "Error desconocido", 5000, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Llamar al callback para indicar fallo y evitar el cambio de pantalla
            callback(false);

            // Mostrar mensaje de error
            showAlert("Error en la solicitud", 5000, 'error');
        });
}

function verifyCodeHelp(code, email, action) {
    return new Promise((resolve, reject) => {
        const url = "../controller/es/es_verify_code.php";
        const data = { 'codigo': code, 'correo': email };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    if (action === 'reset-password') {
                        // Asegúrate de que estamos en el contexto correcto
                        const verifyForm = document.getElementById('verify-recovery-code-form');
                        const resetForm = document.getElementById('reset-password-form');
                        const usernameDisplay = document.getElementById('username-display');

                        // Verificar si la pantalla de recuperación de usuario está visible, y ocultarla si es necesario
                        if (usernameDisplay && usernameDisplay.style.display === 'flex') {
                            usernameDisplay.style.display = 'none';
                        }

                        if (verifyForm && resetForm) {
                            verifyForm.style.display = 'none';
                            resetForm.style.display = 'flex';
                            resolve(true); // Operación exitosa
                        } else {
                            console.error("No se encontraron los elementos para 'reset-password'");
                            resolve(false); // Problema en la operación
                        }
                    } else if (action === 'recover-username') {
                        const verifyForm = document.getElementById('verify-recovery-code-form');
                        const usernameDisplay = document.getElementById('username-display');
                        const displayUsername = document.getElementById('display-username');

                        if (verifyForm && usernameDisplay && displayUsername) {
                            verifyForm.style.display = 'none';
                            usernameDisplay.style.display = 'flex';
                            displayUsername.textContent = result.username;

                            // Mostrar botones de acción
                            const changeUsernameButton = document.getElementById('change-username');

                            if (changeUsernameButton) changeUsernameButton.style.display = 'flex';

                            resolve(true); // Operación exitosa
                        } else {
                            console.error("No se encontraron los elementos para 'recover-username'");
                            resolve(false); // Problema en la operación
                        }
                    }
                } else {
                    alert(result.error || 'Código incorrecto. Intenta nuevamente.');
                    resolve(false); // Código no válido
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error en la verificación del código.');
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}










// function handleForgotPassword() {
//     const forgotPasswordForm = document.getElementById('forgot-password-form');
//     const forgotEmailInput = document.getElementById('forgot-email');
//     const sendRecoveryEmailButton = document.getElementById('send-recovery-email');
//     const loginContainer = document.querySelector('.login-container');

//     // Muestra el formulario de recuperación de contraseña y oculta el de login
//     loginContainer.style.display = 'none';
//     forgotPasswordForm.style.display = 'flex';

//     sendRecoveryEmailButton.addEventListener('click', function() {
//         const email = forgotEmailInput.value;

//         if (!email) {
//             alert('Por favor, introduce un correo electrónico válido.');
//             return;
//         }

//         fetch('url-to-send-recovery-email.php', {
//             method: 'POST',
//             body: JSON.stringify({ email: email }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(response => response.json())
//         .then(result => {
//             if (result.success) {
//                 alert('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
//                 forgotPasswordForm.style.display = 'none';  // Oculta el formulario después de enviar el correo
//                 loginContainer.style.display = 'flex';  // Vuelve al formulario de login
//             } else {
//                 alert('Error al enviar el correo. Inténtalo de nuevo.');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Hubo un error en la solicitud.');
//         });
//     });
// }


