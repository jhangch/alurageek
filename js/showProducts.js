import { conexionApi } from './api.js';
import { formActions } from './formActions.js';

const getList = document.querySelector('[data-card-products]');
const form = document.querySelector('[data-form]');

function createProduct(name, price, image, id) {
  const product = document.createElement('div');
  product.classList.add('card');
  product.innerHTML = `
        <figure>
            <img class="product__image" src="${image}" alt="${image}" />
            <figcaption class="card__container--info">${name}</figcaption>
        </figure>
        <div class="card__container--value">
            <p>$ ${price}</p>
            <button class="delete__button" data-id="${id}">
                <img src="./assets/trash.png" alt="eliminar" />
            </button>
        </div>`;

  const deleteButton = product.querySelector('[data-id]');
  deleteButton.addEventListener('click', () => {
    Swal.fire({
      title: '¿Está seguro de borrar este producto?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6495ed',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await conexionApi.deleteProduct(id);
        product.remove();
        Swal.fire('¡Borrado!', 'El producto ha sido borrado.', 'success');
      }
    });
  });

  getList.appendChild(product);
  return product;
}

const render = async () => {
  try {
    const lists = await conexionApi.listProducts();
    getList.innerHTML = '';
    lists.forEach((product) => {
      getList.appendChild(createProduct(product.name, product.price, product.image, product.id));
    });
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('[data-name-product]').value;
  const price = document.querySelector('[data-price-product]').value;
  const image = document.querySelector('[data-image-product]').value;

  try {
    await conexionApi.newProduct(name, price, image);
    render();
    Swal.fire('¡Agregado!', 'Tu producto ha sido agregado.', 'success');
    form.reset();
  } catch (error) {
    console.log(error);
  }
});

render();
formActions();

export const showProduct = { render };
