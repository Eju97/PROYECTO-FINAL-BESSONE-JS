class Medallon {
    constructor(id, nombre, precio, cantidad, imagen) {
            this.id = parseInt(id);
            this.nombre = nombre;
            this.precio = parseFloat(precio);
            this.cantidad  = parseInt(cantidad);
            this.imagen = imagen;
    }

    agregarCantidad(valor){
        this.cantidad += valor; 
    }

    subtotal(){
        return this.cantidad * this.precio;
    }
}