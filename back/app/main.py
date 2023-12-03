from app import app
# from products import products
from dotenv import load_dotenv
import os
# Rutas
from routes import products_routes
    

load_dotenv()  # toma las variables de entorno de .env

ruta_raiz = os.path.dirname(os.path.abspath(__file__))
print("Ruta Raíz:", ruta_raiz)
# app.register_blueprint(products)

# inicia el servidor web con el framework flask
if __name__ == "__main__":
    app.run(port=os.getenv('PORT') , debug=True)

