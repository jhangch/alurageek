export function formActions() {
  const cleanButton = document.querySelector('[data-clean]');
  const form = document.querySelector('[data-form]');

  cleanButton.addEventListener('click', (event) => {
    event.preventDefault();
    Swal.fire({
      title: '¿Está seguro de limpiar los campos?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6495ed',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, limpiarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        form.reset();
        Swal.fire('¡Limpiado!', 'Tu formulario ha sido limpiado.', 'success');
      }
    });
  });
}
