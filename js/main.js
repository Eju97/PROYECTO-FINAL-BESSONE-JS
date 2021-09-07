  $(document).ready(function () {
    if("CARRITO" in localStorage){
        const arrayLiterales = JSON.parse(localStorage.getItem("CARRITO"));
        for (const literal of arrayLiterales) {
            carrito.push(new Medallon(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.imagen));
        }
        console.log(carrito);
        carritoUI(carrito);
    }

    $(".dropdown-menu").click(function (e) { 
        e.stopPropagation();
    });

    $.get("data/producto.json", function(datos, estado){
            console.log(datos);
            console.log(estado);
        if(estado == 'success'){
            for (const literal of datos){
                medallones.push(new Medallon(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.imagen));
            }
        }
        console.log(medallones);
        medallonesUI(medallones, '#productosContenedor');
    });
});

window.addEventListener('load',()=>{
    $('#indicadorCarga').remove();
    $('#productosContenedor').fadeIn("slow");
})


//--- OFERTAS!
$("#btn-oferta").click(function(e){
    $("#oferta").slideToggle();
});