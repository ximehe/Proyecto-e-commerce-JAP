document.getElementById("ok").addEventListener("click", function(){

    const email= document.getElementById("email").value;
    const password = document.getElementById("pass").value;

   if ((email && (password.length > 5))){
       sessionStorage.setItem('clave','logueado');
       localStorage.setItem('userLog', email);
       window.location = "index.html";
    } else {
        alert("No se pudo ingresar, revise si todos los espacios están llenos o si la contraseña tiene 6 o más caracteres ")
        window.location = "login.html";
    }

})
