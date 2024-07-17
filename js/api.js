export async function listProducts() {
  const conexion = await fetch('https://6697133502f3150fb66c8c9c.mockapi.io/api/v1/products');
  const conexionConvertida = await conexion.json();
  return conexionConvertida;
}

const newProduct = async (name, price, image) => {
  try {
    const response = await fetch('https://6697133502f3150fb66c8c9c.mockapi.io/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, image }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await fetch(
      `https://6697133502f3150fb66c8c9c.mockapi.io/api/v1/products/${id}`,
      {
        method: 'DELETE',
      }
    );
    return response.ok;
  } catch (error) {
    console.log(error);
  }
};

export const conexionApi = {
  listProducts,
  newProduct,
  deleteProduct,
};
