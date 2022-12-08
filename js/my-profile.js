let firstName = document.getElementById("firstName");
let secondName = document.getElementById("secondName");
let firstLastName = document.getElementById("firstLastName");
let secondLastname = document.getElementById("secondLastName");
let email = document.getElementById("email");
let contact = document.getElementById("contactNumber");
let profilePic = document.getElementById("profilePic");

profilePic.src="img/img_perfil.png"
console.log(profilePic);

function guardarCambios(){

    if(document.getElementById("form").checkValidity()){

        localStorage.setItem("userLog", email.value);
        localStorage.setItem("firstName", firstName.value);
        localStorage.setItem("secondName", secondName.value);
        localStorage.setItem("firstlastName", firstLastName.value);
        localStorage.setItem("secondLastName", secondLastname.value);
        localStorage.setItem("contactNumber", contact.value);
    
    }

    if(!(localStorage.getItem("Image") === "")){
        localStorage.setItem("profilePic", localStorage.getItem("Image"));
        localStorage.setItem("Image","");
      }

}


function mostrarDatos(){
    if(localStorage.getItem("userLog")){
          if (localStorage.getItem("userLog")){ email.value = localStorage.getItem("userLog")}
          if (localStorage.getItem("firstName")){ firstName.value = localStorage.getItem("firstName")}
          if (localStorage.getItem("secondName")){secondName.value = localStorage.getItem("secondName")}
          if (localStorage.getItem("firstlastName")){firstLastName.value = localStorage.getItem("firstlastName")}
          if (localStorage.getItem("secondLastName")){secondLastname.value = localStorage.getItem("secondLastName")}
          if (localStorage.getItem("contactNumber")){contact.value = localStorage.getItem("contactNumber")}
          if (localStorage.getItem("profilePic")){ profilePic.src = localStorage.getItem("profilePic")}
    }
  }
  mostrarDatos(); 


  function leerURL(img){
    const reader = new FileReader();
  
    reader.addEventListener("load", () =>{
      localStorage.setItem("Image", reader.result);
      profilePic.src = reader.result;
    })
  
    reader.readAsDataURL(img.files[0]);
  }

  (function () {
    'use strict' 
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function(event){
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }
    form.classList.add('was-validated')
  }, false)
  });
  })()
