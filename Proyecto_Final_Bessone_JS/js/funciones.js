function medallonesUI(medallones, id){
    $(id).empty();
    for (const medallon of medallones) {
       $(id).append(`<div class="card text-center" style="width: 18rem;">                        
                        <img src="${medallon.imagen}" class="card-img-top img-fluid card-ajustador" alt="MEDALLONES VEGETARIANOS">
                        <div class="card-body">
                          <h5 class="card-title">${medallon.nombre}</h5>
                          <p class="card-text">$ ${medallon.precio}</p>
                          <a href="#" id='${medallon.id}' class="btn btn-success btn-compra">COMPRAR</a>
                        </div>                      
                      </div>`);
    }
    $('.btn-compra').on("click", agregarMedallon);
  }
// Funcion para la compra de medallones
  function agregarMedallon(e){
    e.preventDefault();
    e.stopPropagation();
    const idProducto   = e.target.id;
    const seleccionado = carrito.find(p => p.id == idProducto);
    if(seleccionado == undefined){
      carrito.push(medallones.find(p => p.id == idProducto));
    }else{
      seleccionado.agregarCantidad(1);
    }
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
    carritoUI(carrito);
  }

//-------CARRITO UI---
function carritoUI(medallones){
    $('#carritoCantidad').html(medallones.length);
    $('#carritoProductos').empty();
    for (const medallon of medallones) {
      $('#carritoProductos').append(registroCarrito(medallon));
    }
    $('#carritoProductos').append(`<p id="totalCarrito"> TOTAL ${totalCarrito(medallones)}</p>`);
    $('#carritoProductos').append('<div id="divConfirmar" class="text-center"><button id="btnConfimar" class="btn btn-success">CONFIRMAR</button></div>')

    $('.btn-delete').on('click', eliminarCarrito);
    $('.btn-add').click(addCantidad);
    $('.btn-sub').click(subCantidad);
    $('#btnConfimar').click(confirmarCompra);

  }
// Con esta funcion vemos las opciones reflejadas en el html
  function registroCarrito(medallon){
    return `                     
              <p> ${medallon.nombre}   
              <span class="badge badge-warning badge-font-size:.75em;">$ ${medallon.precio}</span>
              <span class="badge badge-dark"> ${medallon.cantidad}</span>
              <span class="badge badge-success">$ ${medallon.subtotal()}</span>
              <a id="${medallon.id}" class="btn btn-info btn-add">AGREGAR</a>
              <a id="${medallon.id}" class="btn btn-warning btn-sub">QUITAR</a>
              <a id="${medallon.id}" class="btn btn-danger  btn-delete">ELIMINAR</a>
              </p>
`
  }
// funcion para quitar cantidad
  function eliminarCarrito(e){
    console.log(e.target.id);
    let posicion = carrito.findIndex(p => p.id == e.target.id);
    carrito.splice(posicion, 1);
    console.log(carrito);
    carritoUI(carrito);
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
  }
// funcion para agregar/sumar cantidad
  function addCantidad(){
    let medallon = carrito.find(p => p.id == this.id);
    medallon.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = medallon.cantidad;
    $(this).parent().children()[2].innerHTML = medallon.subtotal();

    $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);

    localStorage.setItem("CARRITO",JSON.stringify(carrito));
  }
// funcion para restar cantidad
  function subCantidad(){
    let medallon = carrito.find(p => p.id == this.id);
    if(medallon.cantidad > 1){
        medallon.agregarCantidad(-1);
      let registroUI = $(this).parent().children();
      registroUI[1].innerHTML = medallon.cantidad;
      registroUI[2].innerHTML = medallon.subtotal();

      $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);

      localStorage.setItem("CARRITO",JSON.stringify(carrito));
    }
  }



  function totalCarrito(carrito){
    console.log(carrito);
    let total = 0;
    carrito.forEach(p => total += p.subtotal());
    return total.toFixed(2);
  }
  function confirmarCompra(){
    $('#btnConfimar').hide();
    $('#divConfirmar').append(`<div class="spinner-border text-success" role="status">
                                <span class="sr-only">Loading...</span>
                              </div>`);

    const URLPOST = 'https://jsonplaceholder.typicode.com/posts';

    const DATA  = {productos: JSON.stringify(carrito), total: totalCarrito(carrito)}

    $.post(URLPOST, DATA,function(respuesta,estado){
        console.log("GRACIAS POR TU COMPRA :D");
        if(estado == 'success'){
          $("#notificaciones").html(`<div class="alert alert-sucess alert-dismissible fade show" role="alert">
                                      <strong>Muchas gracias por tu compra!</strong> Comprobante Nº ${respuesta.id}.
                                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                      </button>
                                      </div>`).fadeIn();
          carrito.splice(0, carrito.length);
          localStorage.setItem("CARRITO",'[]');
          $('#carritoProductos').empty();
          $('#carritoCantidad').html(0);
        }
    });
  }