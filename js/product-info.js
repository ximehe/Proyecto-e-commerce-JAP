let product = {};

document.addEventListener("DOMContentLoaded", () =>{
     fetch(PRODUCT_INFO_URL + localStorage.getItem('claveID') + EXT_TYPE)
    .then(response => response.json())
    .then(data => {
      product = data;
      MostrarProductoInfo(product);
      MostrarProductosRelacionados(product.relatedProducts);
      
    })
  
    fetch(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('claveID') + EXT_TYPE)
    .then(resp => resp.json())
    .then(data => {
      mostrarComentarios(data);

      
    })
  
  });

  //Funcion para mostrar la info de los productos
  function MostrarProductoInfo(product){

    
    let elementHTML = `





    
        
            
        
            <h1 >${product.name}</h1>
            <hr class="my-3">
            
              
              <br>

              <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
             <div class="carousel-item active">       
            <img  id="MostrarImg" src="${product.images[0]}" class="d-block w-100" >
             </div>
             <div class="carousel-item">
            <img  id="MostrarImg" src="${product.images[1]}" class="d-block w-100" >
             </div>
             <div class="carousel-item">
            <img  id="MostrarImg" src="${product.images[2]}" class="d-block w-100" >
             </div>
             <div class="carousel-item">
            <img  id="MostrarImg" src="${product.images[3]}" class="d-block w-100" >
             </div>
             
              </div>
             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
               </button>
               <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Next</span>
              </button>
                </div>
                <div class= "row" style="padding-top:10px;">
                <br>
                <br>
                <strong>${product.name}</strong>
                <br>
                <br>
                <p><strong>Descripción: </strong>${product.description}</p>
                <p><strong>Precio: </strong>${product.cost} ${product.currency}<p>
                
                <p><strong>Categoría: </strong>${product.category}</p>
                
                <p><strong>Vendidos: </strong> ${product.soldCount}</p>
              
                <hr class="my-3">
              
  
              
        </div>
      `
    
      document.getElementById("InfoProducto").innerHTML += elementHTML;
  
   
  }

 
  
  //Funcion para añadir estrellas
  function añadirEstrellas(score){
    let starCount= 0;
    let starsHTML = "";
  
    for(j=0; j<5; j++){
      if(starCount<score){ starsHTML += `<span class="fa fa-star" style="color: orange;"></span>`}
      else{ starsHTML += `<span class="fa fa-star"></span>`}
      starCount ++;
    }
    return starsHTML;
  }

//Funcion para mostrar productos relacionados 
function MostrarProductosRelacionados(array){

    array.forEach(element => {
      let elementHTML = `
     <div class="card col-6">
       <div class="card-header text-center" onclick="guardarID(${element.id})">
         <img src="${element.image}" style="width: 100%;">
       </div>
       <div class="card-body">
         <h5 class="card-title">${element.name}</h5>
         
       </div>
     </div>
     `
     document.getElementById("ProductosRelacionados").innerHTML += elementHTML;
  });
}

 function guardarID(id) {
    localStorage.setItem("claveID", id);
    window.location = "product-info.html";
  }

  
  //Funcion para mostrarComentarios
  function mostrarComentarios(comments){

    let elementHTML = "";
  
    for (i=0; i<comments.length; i++){
      elementHTML += 
      `

      <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <img src="img/img_perfil.png" class="img-thumbnail">
                </div>
                <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${comments[i].user}</h4>
                    <small class="font-muted">
                    <div class="comment-stars">${añadirEstrellas(comments[i].score)}</div>
                    ${comments[i].dateTime}
                    </small>
                </div>
                ${comments[i].description}
                </div>
            </div>
           
            </div>
        `
    }
    
    document.getElementById("Comentarios").innerHTML += elementHTML;
  }

  //Función para añadir mi comentario
  function añadirComentario(){

    //Declaración de variables
    let miComentario = document.getElementById("miComentario").value;
    let puntuacion = document.getElementById("puntuacion").value;
    let user = localStorage.getItem("userLog")
  
    //Agregar fecha de mi comentario
    const myDate= new Date();
    const dateString= myDate.toLocaleString();
  
    //Añadir mi comentario y puntuación
    document.getElementById("Comentarios").innerHTML +=
    `
    <div class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
        <img src="img/img_perfil.png" class="img-thumbnail">
        </div>
        <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${user}</h4>
            <small class="font-muted">
            <div class="comment-stars">${añadirEstrellas(puntuacion)}</div>
            ${dateString}
            </small>
        </div>
        ${miComentario}
        </div>
    </div>

    `
    document.getElementById("miComentario").value = "";
  }
