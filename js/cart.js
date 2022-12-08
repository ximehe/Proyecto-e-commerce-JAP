let carrito =[];
let precio = 0;
let subTotal=0;
let Total=0;
let costoEnvio=0;

document.getElementById("costoenvio").innerHTML= "USD" + " " + costoEnvio;

document.addEventListener("DOMContentLoaded", function() {
    fetch(CART_INFO_URL + 25801 + EXT_TYPE)
    .then(resp => resp.json())
    .then(data =>{
  
  
      carrito=data;
      MostrarArticulo(carrito);
      
      CalculoDeSubtotal();
      
      
      
    })
  })

  

  function MostrarArticulo() {
    precio = carrito.articles[0].unitCost

    let elementHTML = `
          <tr>
            <th scope="row">
                <img class="img-thumbnail" width=150rem src="${carrito.articles[0].image}"/>
            </th>
            <td>${carrito.articles[0].name}</td>
            <td>${carrito.articles[0].currency} ${precio}</td>
            <td>
                <div class="form-group col">
                <input class="text-center" type="number" id="cantArticulo" value="1" min="1" max="100" onchange="CalculoDeSubtotal()">
                </div>
           </td>
            <td id="subtotal">${carrito.articles[0].currency} ${precio}</td>
          </tr>
    `
document.getElementById("ListC").innerHTML = elementHTML;
}

function CalculoDeSubtotal(){

  
  subTotal= precio * document.getElementById("cantArticulo").value 

  document.getElementById("subtotal").innerHTML=  "USD" + " " + subTotal;
  document.getElementById("subtotalcosto").innerHTML=  "USD" + " " + subTotal;

  CalculoDeEnvio();

  
}

function CalculoDeEnvio(){
  if (document.getElementById("standard").checked){
    costoEnvio=subTotal * 0.05;
    document.getElementById("costoenvio").innerHTML= "USD" + " " + costoEnvio;
  } else if (document.getElementById("express").checked){
    costoEnvio=subTotal * 0.07;
    document.getElementById("costoenvio").innerHTML= "USD" + " " + costoEnvio;
  } else if (document.getElementById("premium").checked){
    costoEnvio=subTotal * 0.15;
    document.getElementById("costoenvio").innerHTML= "USD" + " " + costoEnvio;
  }
  CalculoDeTotal()
}

function CalculoDeTotal(){

  Total = subTotal + costoEnvio
  document.getElementById("total").innerHTML= "USD" + " " + Total;
}

function MetodoDePago(){

  let tarjetadecredito = document.getElementById("opcion1");
  let transefebancaria= document.getElementById("opcion2");
  let numCuenta = document.getElementById("numeroCuenta");

  let primero = document.getElementById("numtarjeta");
  let segundo = document.getElementById("codseg");
  let tercero = document.getElementById("vencim");

  if (document.getElementById("opcion1").checked){
  
   
   numCuenta.disabled = true; 
   primero.disabled = false; 
   segundo.disabled = false;
   tercero.disabled = false;
   
  } 
  

  
  if (document.getElementById("opcion2").checked){
  
    numCuenta.disabled = false; 
    primero.disabled = true; 
    segundo.disabled = true;
    tercero.disabled = true;
 
   }

  checkModal();
  MensajeDeExito();
  
}

function checkModal(){

  let tarjetadecredito = document.getElementById("opcion1");
  let transefebancaria= document.getElementById("opcion2");
  let numCuenta = document.getElementById("numeroCuenta");

  let primero = document.getElementById("numtarjeta");
  let segundo = document.getElementById("codseg");
  let tercero = document.getElementById("vencim");

  if (!((tarjetadecredito.checked) && (transefebancaria.checked))){
    
    document.getElementById("noSeleccionado").innerHTML = "Debe seleccionar una forma de pago";


  if (tarjetadecredito.checked){
    if ((primero.checkValidity() && segundo.checkValidity() && tercero.checkValidity())){
     
      document.getElementById("Seleccionado").innerHTML = "Forma de pago seleccionada correctamente";
      document.getElementById("noSeleccionado").innerHTML = "";
    }
  }

  if(transefebancaria.checked){
    if ((numCuenta.checkValidity())){
      
      document.getElementById("Seleccionado").innerHTML = "Forma de pago seleccionada correctamente";
      document.getElementById("noSeleccionado").innerHTML = "";
    }
  }




  
}
}


function MensajeDeExito(){


  if(document.getElementById("myForm").checkValidity()){
    document.getElementById("alert-success").classList.add("show");
   
  }
  

}

 

(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
