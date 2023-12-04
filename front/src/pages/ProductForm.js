import React, { useEffect, useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL 
export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false); //estado para saber si se esta editando o no

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setProduct({
        ...product,
        [name]: file,
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const navigate = useNavigate();
  const params = useParams();

  const loadProduct = async (id) => {
    const res = await fetch(`${baseUrl}/products/${id}`);
    const data = await res.json();
    console.log(data);
    setProduct({
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
    });
    console.log(product);
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadProduct(params.id);
    } else {
      setEditing(false);
      setProduct({
        name: "",
        description: "",
        price: "",
        image: "",
      });
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); //cancela el comportamiento por defecto
    // Aquí puedes manejar la lógica de envío del formulario
    setLoading(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);

    console.log(formData)
    if (editing) {
      //si esta editando
      await fetch(`${baseUrl}/products/${params.id}`, {
        method: "PUT",
        body: formData,
      });
      setEditing(false);
    } else {
      //si no esta editando
      await fetch(`${baseUrl}/products`, {
        method: "POST",
        body: formData,
      });
    }
    setLoading(false);
    navigate("/");
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1 className="my-form-title text-center">
        {editing ? "Editar Producto" : "Agregar Producto"}
      </h1>
      <Form
        onSubmit={handleSubmit}
        className="w-50"
        encType="multipart/form-data"
      >
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Ingresa el nombre"
            className="my-input"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Ingresa la descripcion"
            className="my-input"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Ingresa el precio"
            className="my-input"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
            className="my-input"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading} // Desactiva el botón mientras se carga
          style={{ position: "relative" }} // Añade una posición relativa al botón
        >
          {
            editing ? (
              "Editar"
            ) : loading ? (
              <Spinner
                animation="border"
                size="sm" // Ajusta el tamaño del Spinner a "sm" (pequeño)
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Guardar"
            )
          }
        </Button>
      </Form>
    </Container>
  );
}
