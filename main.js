// Productos disponibles
const productos = [
  {id: 1, nombre: "Cookie chips", precio: 500, img: "img/chipsdechocolate_1.jpg"},
  {id: 2, nombre: "Cookie Red velvet", precio: 600, img: "img/redvelvet.jpg"},
  {id: 3, nombre: "Cookie Banana", precio: 550, img: "img/banana.jpg"}
];

let carrito = [];


//Mostrar productos
function mostrarProductos() {
    const contenedor = document.getElementById("productos");

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(card); // este es el paso clave: agregar la card al contenedor
        });
    }


//agregar producto
function agregarAlCarrito(idproducto) {
    const producto = productos.find(p=>p.id===idproducto);
    if (producto){
        carrito.push(producto);
        actualizarCarrito();
    }
}

// actualizar carrito en la pantalla 
function actualizarCarrito () {
    const lista = document.getElementById("carrito");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;
    carrito.forEach((item, index)=> {
        total+= item.precio;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.nombre} - $${item.precio}
             <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
});

totalSpan.textContent = total;
}

//eliminr producto del carrito por indice

function eliminarDelCarrito(index) {
    carrito.splice (index,1);
    actualizarCarrito();
}

//iniciar

mostrarProductos();