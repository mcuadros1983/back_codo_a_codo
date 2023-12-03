from flask import request, jsonify, current_app
from db.db import mysql
import os
from werkzeug.utils import secure_filename


def Index():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM products')
        data = cur.fetchall()
        cur.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_product(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM products WHERE id = %s', (id,))
        product = cur.fetchone()
        cur.close()

        if product:
            return jsonify(product)
        else:
            return jsonify({'message': 'Producto no encontrado'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def add_product():
    try:
        if request.method == 'POST':
            if request.headers['Content-Type'].startswith('multipart/form-data'):
                name = request.form['name']
                description = request.form['description']
                price = request.form['price']

                if 'image' in request.files:
                    image = request.files['image']
                    if image.filename != '':
                        filename = secure_filename(image.filename)
                        image_path = os.path.join(
                            current_app.config['UPLOAD_FOLDER'], filename)
                        image.save(image_path)
                    else:
                        image_path = None
                else:
                    image_path = None
            else:
                data = request.get_json()
                name = data['name']
                description = data['description']
                price = data['price']
                image_path = data.get('image', None)

            cur = mysql.connection.cursor()
            cur.execute(
                "INSERT INTO products (name, description, price, image) VALUES (%s,%s,%s,%s)", (name, description, int(price), image_path))
            mysql.connection.commit()

            new_product_id = cur.lastrowid
            cur.execute("SELECT * FROM products WHERE id = %s",
                        (new_product_id,))
            new_product = cur.fetchone()
            cur.close()

            return jsonify({'message': 'Product added successfully', 'product': new_product})
        return jsonify({'error': 'Invalid request method'}), 405
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def update_product(id):
    try:
        if request.method == 'PUT':
            data = request.form.to_dict(flat=False)

            # Validar que se proporcionen todos los campos necesarios
            required_fields = ['name', 'description', 'price']
            if not all(field in data for field in required_fields):
                return jsonify({'error': 'Missing required fields'}), 400

            # Extraer datos del cuerpo de la solicitud
            name = data['name'][0]
            description = data['description'][0]
            price = data['price'][0]
            if 'image' in request.files:
                image = request.files['image']
                if image.filename != '':
                    filename = secure_filename(image.filename)
                    image_path = os.path.join(
                        current_app.config['UPLOAD_FOLDER'], filename)
                    image.save(image_path)
                else:
                    image_path = None
            else:
                image_path = None
            cur = mysql.connection.cursor()
            cur.execute("""
                UPDATE products
                SET name = %s,
                    description = %s,
                    price = %s,
                    image = %s
                WHERE id = %s
            """, (name, description, int(price), image_path, id))
            mysql.connection.commit()
            return {"message": "Product updated successfully"}
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def delete_product(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM products WHERE id = %s', (id,))
        mysql.connection.commit()
        return {"message": "Product deleted successfully"}
    except Exception as e:
        return jsonify({'error': str(e)}), 500
