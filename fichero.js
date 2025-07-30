// ficherooo
function ocultarFichas() {
  document.querySelectorAll('.ficha').forEach(f => f.classList.add('oculto'));
}

function mostrarFicha(nombre) {
  ocultarFichas();
  document.getElementById(`ficha-${nombre}`).classList.remove('oculto');
}
