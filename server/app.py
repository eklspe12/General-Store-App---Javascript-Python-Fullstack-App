#!/usr/bin/env python3

# Standard library imports
from models import db, Product, Location, Stock
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.jsonify_compatibility = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Products(Resource):
    def get(self):
        products = [product.to_dict(rules=('-locations', '-stocks'))for product in Product.query.all()]
        return make_response(products, 200)
    
    def post(self):
        fields = request.get_json()
        try:
            product = Product(
                name=fields['name'], 
                description=fields['description'], 
                image=fields['image'],
                price=fields['price'],
            )
            db.session.add(product)
            db.session.commit()
            return make_response(product.to_dict(), 201)
        except ValueError as e:
            return make_response({'error':e.__str__()}, 400)



api.add_resource(Products, '/products')

class ProductByName(Resource):
    def get(self, name):
        products = Product.query.filter(Product.name == name)
        if products is None:
            return make_response({'error':'Product not found'}, 404)
        return make_response(products.to_dict(), 200)
    
api.add_resource(ProductByName, '/products/search/<name>')


class ProductById(Resource):
    def get(self, id):
        product = Product.query.filter(Product.id == id).one_or_none()
        if product is None:
            return make_response({'error':'Product not found'}, 404)
        return make_response(product.to_dict(), 200)
    
    def patch(self, id):
        product = Product.query.get(id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        data = request.get_json()
        for field, value in data.items():
            if hasattr(product, field):
                setattr(product, field, value)

        db.session.commit()
        return jsonify({'message': 'Product updated successfully'}), 200
        
    def delete(self, id):
        product = Product.query.filter(Product.id == id).one_or_none()
        if product is None:
            return make_response({'error':'Product not found'}, 404)
        db.session.delete(product)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(ProductById, '/products/<int:id>')


class Locations(Resource):
    def get(self):
        locations = [location.to_dict(rules=('-products', '-stocks'))for location in Location.query.all()]
        return make_response(locations, 200)
    
    def post(self):
        fields = request.get_json()
        try:
            location = Location(
                address=fields['address'], 
            )
            db.session.add(location)
            db.session.commit()
            return make_response(location.to_dict(), 201)
        except ValueError as e:
            return make_response({'error':e.__str__()}, 400)
    

api.add_resource(Locations, '/locations')


class LocationById(Resource):
    def get(self, id):
        location = Location.query.filter(Location.id==id).one_or_none()
        if location is None:
            return make_response({'error':'Location not found.'}, 404)
        return make_response(location.to_dict(), 200)
    
api.add_resource(LocationById, '/locations/<int:id>')

# Didn't see need for any other CRUD actions on location since user can't add, change, or delete locations

class Stocks(Resource):
    def get(self):
        stocks = [stock.to_dict(rules=('-products', '-locations')) for stock in Stock.query.all()]
        return make_response(stocks, 200) 
    
    def post(self):
        fields = request.get_json()
        try:
            stock = Stock(
                product_id=fields['product_id'],
                quantity=fields['quantity'],
                location_id=fields['location_id']
            )
            db.session.add(stock)
            db.session.commit()
            return make_response(stock.to_dict(), 201)
        except ValueError as e:
            return make_response({'error':e.__str__()})
            

api.add_resource(Stocks, '/stocks')

# class StocksByNameOrLocation(Resource):
#     def get(self, name):
#         stocks = Stock.query.filter(Stock.name == name)
#         if stocks is None:
#             return make_response({'error':'Inventory not found'}, 404)
#         return make_response(stocks.to_dict(), 200)
    
# api.add_resource(StocksByNameOrLocation, '/stocks/search/<name>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)