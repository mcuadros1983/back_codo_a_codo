import { useEffect, useState } from "react";
import { Table, Container, Button, Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadProducts = async () => {
    setLoading(true);
    const res = await fetch(`${baseUrl}/products`);
    if (!res.ok) {
      throw new Error("Error fetching products");
    }
    const data = await res.json();
    const sortedProducts = data.sort((a, b) => a.id - b.id);
    console.log(sortedProducts);
    setLoading(false);
    setProducts(sortedProducts);
    console.log("test", products);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error deleting product");
      }
      setProducts(products.filter((product) => product.id !== id));
      // loadProducts() ////este metodo funciona pero no es el mas optimo ya que vuelve a cargar todos los productos de la base de datos y no solo el que se elimino;
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = async (id) => {
    const shouldDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este producto?"
    );
    if (shouldDelete) {
      await handleDelete(id);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <h1 className="my-list-title dark-text">
        Lista de productos disponibles
      </h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="6" className="text-center">
                <h2>Cargando productos...</h2>
                <Spinner
                  animation="border"
                  size="xl"
                  role="status"
                  aria-hidden="true"
                  style={{ margin: "auto" }}
                />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td className="text-center">
                  {product.image && (
                    <Image
                      src={`${baseUrl}/${product.image}`}
                      alt={`Imagen de ${product.name}`}
                      fluid
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    onClick={() => confirmDelete(product.id)}
                    className="mx-2"
                  >
                    Eliminar
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </Container>
  );
}
