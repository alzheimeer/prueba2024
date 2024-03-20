from flask import Flask, jsonify, request
import mysql.connector
import pymongo
from flask import jsonify
from bson import json_util

app = Flask(__name__)

# Configuración de MySQL
db_mysql = mysql.connector.connect(
    host="localhost",
    user="prueba",
    password="prueba2024",
    database="prueba2024"
)
cursor = db_mysql.cursor()

# Crear tabla de productos en MySQL
cursor.execute("""
    CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255),
        descripcion TEXT,
        categoria VARCHAR(100)
    )
""")

# Datos iniciales de prueba para la tabla de productos
datos_prueba = [
    ("Producto 1", "Descripción del producto 1", "Categoría A"),
    ("Producto 2", "Descripción del producto 2", "Categoría B"),
    ("Producto 3", "Descripción del producto 3", "Categoría A"),
    ("Producto 4", "Descripción del producto 4", "Categoría C"),
    ("Producto 5", "Descripción del producto 5", "Categoría B"),
    ("Producto 6", "Descripción del producto 6", "Categoría A"),
    ("Producto 7", "Descripción del producto 7", "Categoría C"),
    ("Producto 8", "Descripción del producto 8", "Categoría B"),
    ("Producto 9", "Descripción del producto 9", "Categoría A"),
    ("Producto 10", "Descripción del producto 10", "Categoría C")
]

# Insertar datos iniciales en la tabla de productos
for dato in datos_prueba:
    cursor.execute("INSERT INTO productos (nombre, descripcion, categoria) VALUES (%s, %s, %s)", dato)
db_mysql.commit()

# Configuración de MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db_mongo = client["prueba2024"]
coleccion_inventario = db_mongo["inventario"]


@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/productos', methods=['GET', 'POST'])
def gestionar_productos():
    if request.method == 'GET':
        cursor.execute("SELECT * FROM productos")
        productos = cursor.fetchall()
        productos_lista = []
        for producto in productos:
            producto_dict = {
                "id": producto[0],
                "nombre": producto[1],
                "descripcion": producto[2],
                "categoria": producto[3]
            }
            productos_lista.append(producto_dict)
        return jsonify(productos_lista)
    
    elif request.method == 'POST':
        data = request.get_json()
        nombre = data['nombre']
        descripcion = data['descripcion']
        categoria = data['categoria']
        cursor.execute("INSERT INTO productos (nombre, descripcion, categoria) VALUES (%s, %s, %s)", (nombre, descripcion, categoria))
        db_mysql.commit()
        return jsonify({"mensaje": "Producto agregado exitosamente"})


@app.route('/inventario', methods=['GET', 'POST'])
def gestionar_inventario():
    if request.method == 'GET':
        # Consultar todos los documentos de la colección "inventario"
        inventario = list(coleccion_inventario.find())
        
        # Convertir los documentos de MongoDB a JSON
        inventario_json = json_util.dumps(inventario)
        
        return inventario_json

    elif request.method == 'POST':
        # Obtener los datos enviados en el cuerpo de la solicitud
        datos = request.get_json()

        # Crear un nuevo documento en la colección "inventario"
        nuevo_inventario = {
            "producto_id": datos["producto_id"],
            "cantidad": datos["cantidad"],
            "fecha_ingreso": datos["fecha_ingreso"],
            "entregado": False
        }
        resultado = coleccion_inventario.insert_one(nuevo_inventario)

        # Devolver una respuesta indicando que se creó exitosamente
        return jsonify({
            "mensaje": "Inventario creado exitosamente",
            "id_inventario": str(resultado.inserted_id)
        })


if __name__ == '__main__':
    app.run()