#!/usr/bin/env python3

# Standard library imports
from models import db, Product, Location, Stock
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.jsonify_compatibility = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Products(Resource):
    def get(self):
        products = [product.to_dict(rules=('-locations', '-stock'))for product in Product.query.all()]
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
        except ValueError:
            return make_response({'errors':['validation errors']}, 400)



api.add_resource(Products, '/products')



class ProductById(Resource):
    def get(self, id):
        product = Product.query.filter(Product.id == id).one_or_none()
        if product is None:
            return make_response({'error':'Product not found'}, 404)
        return make_response(product.to_dict(), 200)
    
    def patch(self, id):
        product = Product.query.filter(Product.id == id).one_or_none()
        if product is None:
            return make_response({'error':'Product not found'}, 404)
        
        fields = request.get_json()
        try:
            setattr(product, 'name', fields['name'])
            setattr(product, 'description', fields['description'])
            setattr(product, 'image', fields['image'])
            setattr(product, 'price', fields['price'])
            return product.to_dict(), 202
        
        except ValueError:
            return make_response({'errors':['validation errors']}, 400)
        
    def delete(self, id):
        product = Product.query.filter(Product.id == id).one_or_none()
        if product is None:
            return make_response({'error':'Product not found'}, 404)
        db.session.delete(product)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(ProductById, '/product/<int:id>')


class Locations(Resource):
    def get(self):
        locations = [location.to_dict(rules=('-products', '-stock'))for location in Location.query.all()]
        return make_response(locations, 200)
    

api.add_resource(Locations, '/locations')


class LocationById(Resource):
    def get(self, id):
        location = Location.query.filter(Location.id==id).one_or_none()
        if location is None:
            return make_response({'error':'Location not found.'}, 404)
        return make_response(location.to_dict(), 200)
    
api.add_resource(LocationById, '/locations/<int:id>')

# Didn't see need for any other CRUD actions on location since user can't add, change, or delete locations

if __name__ == '__main__':
    app.run(port=5555, debug=True)

