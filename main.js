let productosDisponibles = []; // ⬅ Variable global con los productos
let carrito = [];

// Mostrar productos en pantalla
function mostrarProductos(productos) {
  const contenedorProductos = document.getElementById("contenedor-productos");
  contenedorProductos.innerHTML = ""; // Limpiar antes

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto", "card", "m-2"); // Agrega márgenes entre cards

    div.innerHTML = `
      <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Precio: $${producto.precio}</p>
      </div>
    `;

    const boton = document.createElement("button");
    boton.classList.add("btn", "btn-primary");
    boton.textContent = "Agregar al carrito";

    // ✅ Acá usamos addEventListener en vez de onclick inline
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });

    div.querySelector('.card-body').appendChild(boton);
    contenedorProductos.appendChild(div);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(idproducto) {
  const producto = productosDisponibles.find(p => p.id == idproducto); // id puede ser string
  if (producto) {
    carrito.push(producto);
    actualizarCarrito();
  }
}

// Eliminar producto por índice
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  guardarCarritoEnStorage();
}

// Actualizar carrito visualmente y en total
function actualizarCarrito() {
  const lista = document.getElementById("carrito");
  const totalSpan = document.getElementById("total");

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = total;

  const btnPagar = document.getElementById("btnPagar");
  if (btnPagar) {
    btnPagar.style.display = carrito.length > 0 ? "inline-block" : "none";
  }

  guardarCarritoEnStorage();
}

// Guardar en localStorage
function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar desde localStorage
function cargarCarritoDesdeStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

// Obtener productos desde MockAPI
async function cargarProductos() {
  try {
    const respuesta = await fetch('https://68c6dc72442c663bd028258c.mockapi.io/productos');
    const productos = await respuesta.json();
    productosDisponibles = productos; // lo guardamos globalmente
    mostrarProductos(productosDisponibles);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = "<p>No se pudieron cargar los productos</p>";
  }
}

// Procesar el pago
function procesarPago() {
  Swal.fire({
    icon: 'success',
    title: '¡Pago realizado!',
    text: 'Gracias por tu compra. Pronto recibirás un mail de confirmación.',
    confirmButtonText: 'Aceptar',
    background: '#fffbea',
    color: '#5a3700'
  });

  carrito = [];
  guardarCarritoEnStorage();
  actualizarCarrito();
}

// Iniciar cuando carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  cargarCarritoDesdeStorage();

  const btnConfirmarPago = document.getElementById("btnConfirmarPago");
  if (btnConfirmarPago) {
    btnConfirmarPago.addEventListener("click", procesarPago);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const btnVolver = document.getElementById("btn-volver-inicio");

  btnVolver.addEventListener("click", () => {
    // Limpiar carrito
    localStorage.removeItem("carrito"); // o localStorage.clear(); si querés vaciar todo
    // Redirigir al inicio
    window.location.href = "pago.html";
  });
});

