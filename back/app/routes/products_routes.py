from app import app
from controllers.products_controllers import *

# Rutas

# Obtener todos los productos
app.get("/products")(Index)

# Obtener un producto por su id
app.get("/products/<int:id>")(get_product)

# Agregar un producto
app.post("/products")(add_product)

# Actualizar un producto
app.put("/products/<int:id>")(update_product)

# Eliminar un producto
app.delete("/products/<int:id>")(delete_product)