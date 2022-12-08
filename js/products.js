
const ORDER_ASC_BY_PRICE = "$->$$";
const ORDER_DESC_BY_PRICE = "$$->$";
const ORDER_DESC_BY_RELEV = "-->"
let FiltroArray=[];
let min=0;
let max=0;
let keyWord = "";

 
function sortAndShowCategories(criterio, array){
    if (criterio === ORDER_ASC_BY_PRICE){
       
        FiltroArray= array.sort((a,b) => {return a.cost - b.cost})
        
    }
    if(criterio === ORDER_DESC_BY_PRICE){
        FiltroArray= array.sort((a,b) => {return b.cost - a.cost})
    }
    if(criterio === ORDER_DESC_BY_RELEV){
        FiltroArray= array.sort((a,b) => {return b.soldCount - a.soldCount})
    }

    document.getElementById("info").innerHTML = ""
    showList(FiltroArray)
}



document.addEventListener("DOMContentLoaded",function (e) {
    fetch(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE)
.then( respuesta => respuesta.json() )
.then( data => {

    ArrayDatos = data;
    FiltroArray= data.products;
    document.getElementById('cat-name').innerHTML=ArrayDatos.catName
    showList(FiltroArray);

})
})
 
document.getElementById("keyWords").addEventListener("input", function(){
    keyWord = document.getElementById("keyWords").value;
    clearList();
    showList(FiltroArray);
  }); 


  function clearList(){
    document.getElementById("info").innerHTML = ""
  }

function showList(array){
    
    array.forEach(element => {

        if (((min == 0) || (parseInt(element.cost) >= min)) && ((max==0) || (parseInt(element.cost)<= max)) && ((keyWord == "") || element.name.toLowerCase().includes(keyWord.toLowerCase()))){
            var elementHTML = 
          `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm custom-card cursor-active">
               <div class="list-group-item list-group-item-action" onclick="guardarID(${element.id})">
              <img class="bd-placeholder-img card-img-top" src="` + element.image + `" alt="product image" class="img-thumbnail">
              <h4 class="m-3" align="center">`+ element.name +`</h4> 
              <p class="m-2"> `+ element.description +`</p>
              
                <div class="card-body">
              <small class="text-muted" style="float:left">` + element.soldCount + ` artículos</small> 
              <h5 class="m-1" align="right"> `  + element.currency + " "+ element.cost + `</h5>
                </div> 
              
               </div>
            </div>
         </div>
        `
        
        document.getElementById("info").innerHTML += elementHTML; 
        }

        
        
        
    });                              
}

function guardarID(id) {
    localStorage.setItem("claveID", id);
    window.location = "product-info.html";
  }

document.getElementById("ordenAscPrecio").addEventListener("click",function(){
    sortAndShowCategories(ORDER_ASC_BY_PRICE, FiltroArray);
});
document.getElementById("ordenDescPrecio").addEventListener("click",function(){
    sortAndShowCategories(ORDER_DESC_BY_PRICE, FiltroArray);
});
document.getElementById("ordenDescRelev").addEventListener("click",function(){
    sortAndShowCategories(ORDER_DESC_BY_RELEV, FiltroArray);
});
document.getElementById("clearRangeFilter").addEventListener("click",function(){
    
   location.reload();

});
document.getElementById("rangeFilterCount").addEventListener("click", function(){
    min= document.getElementById("rangeFilterCountMin").value;
    max= document.getElementById("rangeFilterCountMax").value;
    document.getElementById("info").innerHTML=""
    showList(FiltroArray)
})
