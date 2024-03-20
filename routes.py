from flask import Blueprint, request, jsonify, Response
from models import Producto, Inventario
from bson import json_util

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/productos', methods=['GET', 'POST'])
def gestionar_productos():
    if request.method == 'GET':
        productos = Producto.obtener_productos()
        return jsonify(productos)
    elif request.method == 'POST':
        data = request.json
        resultado = Producto.agregar_producto(data)
        return jsonify(resultado), 201

@api_blueprint.route('/inventario', methods=['GET', 'POST'])
def gestionar_inventario():
    if request.method == 'GET':
        inventario = Inventario.obtener_inventario()
        return Response(json_util.dumps(inventario), mimetype='application/json')
    elif request.method == 'POST':
        data = request.json
        resultado = Inventario.agregar_a_inventario(data)
        return jsonify(resultado), 201