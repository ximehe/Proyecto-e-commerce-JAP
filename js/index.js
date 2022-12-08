document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

let data = sessionStorage.getItem('clave')
if ((data) != 'logueado') {
    
    window.location ="login.html"
}  else
{
    document.getElementById('user').innerHTML=localStorage.getItem('userLog');
}

function SalirSesion(){

        localStorage.removeItem("userLog");
        localStorage.removeItem("firstName");
        localStorage.removeItem("secondName");
        localStorage.removeItem("firstlastName");
        localStorage.removeItem("secondLastName");
        localStorage.removeItem("contactNumber");
        localStorage.removeItem("profilePic");
}