from app import app
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

project_folder = os.path.expanduser('~/fullstack_codo_a_codo/back')
load_dotenv(os.path.join(project_folder, '.env'))

# import os
# load_dotenv()  # toma las variables de entorno del archivo .env

# Configuraciones de Mysql
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Conexion de MySQL
mysql = MySQL(app)
