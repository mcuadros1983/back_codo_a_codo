from flask import Flask
from flask_cors import CORS
import os


# Inicializacion de la aplicacion
app = Flask(__name__, static_folder='static', static_url_path='/app/static')
# app = Flask(__name__)

# Configuración para la carpeta de carga
app.config['UPLOAD_FOLDER'] = 'app/static/uploads'
# app.config['UPLOAD_FOLDER'] = 'public/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

# Habilitacion de CORS  
CORS(app)

# settings
app.secret_key = "mysecretkey"

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])