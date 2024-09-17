document.addEventListener("DOMContentLoaded", function (event) {

    loggedVerify();
    document.querySelector('#logoutButton').addEventListener('click', logOut);


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
                //window.location.href = "../es/login.html"; // Redirige si no está logueado
                //ENSEÑAR CIERTOS BOTONES O NO
            } else {
                console.log("tipoo " + result.tipo_usuario);
                if (result.tipo_usuario !== "Administrador") {
                    //window.location.href = "../es/adminControlPanel.html"; // Si no es administrador, redirige a la página principal
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