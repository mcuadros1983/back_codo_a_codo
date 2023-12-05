from app import app
# from products import products
# from dotenv import load_dotenv
# import os
# Rutas
from routes import products_routes

import os
from dotenv import load_dotenv
project_folder = os.path.expanduser('~/fullstack_codo_a_codo/back')  # adjust as appropriate
load_dotenv(os.path.join(project_folder, '.env'))


# load_dotenv()  # toma las variables de entorno de .env

ruta_raiz = os.path.dirname(os.path.abspath(__file__))
print("Ruta Raíz:", ruta_raiz)
# app.register_blueprint(products)
