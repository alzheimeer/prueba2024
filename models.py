import mysql.connector
import pymongo
from bson import json_util
from flask import current_app as app

class Producto:
    @staticmethod
    def obtener_productos():
        try:
            conn = mysql.connector.connect(**app.config['MYSQL_CONNECTION'])
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM productos")
            productos = cursor.fetchall()
            return productos
        except mysql.connector.Error as err:
            print(f"Error al obtener productos: {err}")
            return []
        finally:
            if conn.is_connected():
                conn.close()

    @staticmethod
    def agregar_producto(data):
        try:
            conn = mysql.connector.connect(**app.config['MYSQL_CONNECTION'])
            cursor = conn.cursor()
            cursor.execute("INSERT INTO productos (nombre, descripcion, categoria) VALUES (%s, %s, %s)", (data['nombre'], data['descripcion'], data['categoria']))
            conn.commit()
            return {"mensaje": "Producto agregado exitosamente"}
        except mysql.connector.Error as err:
            print(f"Error al agregar producto: {err}")
            return {"mensaje": "Error al agregar el producto"}
        finally:
            if conn.is_connected():
                conn.close()

class Inventario:
    @staticmethod
    def obtener_inventario():
        try:
            client = pymongo.MongoClient(app.config['MONGO_URI'])
            db = client[app.config['MONGO_DBNAME']]
            inventario = list(db.inventario.find())
            return json_util.loads(json_util.dumps(inventario))
        except pymongo.errors.PyMongoError as err:
            print(f"Error al obtener inventario: {err}")
            return []
        finally:
            client.close()

    @staticmethod
    def agregar_a_inventario(data):
        try:
            client = pymongo.MongoClient(app.config['MONGO_URI'])
            db = client[app.config['MONGO_DBNAME']]
            resultado = db.inventario.insert_one(data)
            return {"mensaje": "Inventario creado exitosamente", "id_inventario": str(resultado.inserted_id)}
        except pymongo.errors.PyMongoError as err:
            print(f"Error al agregar al inventario: {err}")
            return {"mensaje": "Error al crear el inventario"}
        finally:
            client.close()