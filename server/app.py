#!/usr/bin/env python3

# Standard library imports
from models import db, Grill, GrillReview, Accessory, AccessoryReview, Location
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
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Grills(Resource):
    def get(self):
        grills = [grill.to_dict(rules=('-accessories', '-grill_reviews', '-accessory_reviews', '-locations'))for grill in Grill.query.all()]
        return make_response(grills, 200)
    
    def post(self):
        fields = request.get_json()
        try:
            grill = Grills(
                name=fields['name'], 
                description=fields['description'], 
                image=fields['image'],
                price=fields['price'],
            )
            db.session.add(grill)
            db.session.commit()
            return make_response(grill.to_dict(), 201)
        except ValueError:
            return make_response({'errors':['validation errors']}, 400)



api.add_resource(Grills, '/grills')



class GrillById(Resource):
    def get(self, id):
        grill = Grill.query.filter(Grill.id == id).one_or_none()
        if grill is None:
            return make_response({'error':'Grill not found'}, 404)
        return make_response(grill.to_dict(), 200)
    
    def patch(self, id):
        grill = Grill.query.filter(Grill.id == id).one_or_none()
        if grill is None:
            return make_response({'error':'Grill not found'}, 404)
        
        fields = request.get_json()
        try:
            setattr(grill, 'name', fields['name'])
            setattr(grill, 'description', fields['description'])
            setattr(grill, 'image', fields['image'])
            setattr(grill, 'price', fields['price'])
            return grill.to_dict(), 202
        
        except ValueError:
            return make_response({'errors':['validation errors']}, 400)
        
    def delete(self, id):
        grill = Grill.query.filter(Grill.id == id).one_or_none()
        if grill is None:
            return make_response({'error':'Grill not found'}, 404)
        db.session.delete(grill)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(GrillById, '/grills/<int:id>')



class Accessories(Resource):
    def get(self):
        accessories = [accessory.to_dict(rules=('-grills', '-grill_reviews', '-accessory_reviews', '-locations'))for accessory in Accessory.query.all()]
        return make_response(accessories, 200)
    
    def post(self):
        fields = request.get_json()
        try:
            accessory = Accessory(
                name=fields['name'], 
                description=fields['description'], 
                image=fields['image'],
                price=fields['price'],
            )
            db.session.add(accessory)
            db.session.commit()
            return make_response(accessory.to_dict(), 201)
        except ValueError:
            return make_response({'errors':['validation errors']}, 400)

    
api.add_resource(Accessories, '/accessories')



class AccessoryById(Resource):
    def get(self, id):
        accessory = Accessory.query.filter(Accessory.id==id).one_or_none()
        if accessory is None:
            return make_response({'error':'Accessory not found'}, 404)
        return make_response(accessory.to_dict(), 200)
    
    def patch(self, id):
        accessory = Accessory.query.filter(Accessory.id == id).one_or_none()
        if accessory is None:
            return make_response({'error':'Accessory not found'}, 404)
        
        fields = request.get_json()
        try:
            setattr(accessory, 'name', fields['name'])
            setattr(accessory, 'description', fields['description'])
            setattr(accessory, 'image', fields['image'])
            setattr(accessory, 'price', fields['price'])
            return accessory.to_dict(), 202
        
        except ValueError:
            return make_response({'errors':['validation errors']}, 400)
        
    def delete(self, id):
        accessory = Accessory.query.filter(Accessory.id == id).one_or_none()
        if accessory is None:
            return make_response({'error':'Accessory not found'}, 404)
        db.session.delete(accessory)
        db.session.commit()
        return make_response({}, 204)
    
api.add_resource(AccessoryById, '/accessories/<int:id>')


    
class GrillReviews(Resource):
    def get(self):
        reviews = [review.to_dict(rules=('-grills', '-accessories', '-accessory_reviews', '-locations'))for review in GrillReview.query.all()]
        return make_response(reviews, 200)
    
    # probably will not need above function or will need to modify so it only get reviews for a specific grill, similar
    # to a 'get by id' but the id would be for the grill

    def post(self):
        try:
            grill_review = GrillReview(
                text=request.json['text'],
                rating=request.json['rating']
            )
            db.sesssion.add(grill_review)
            db.session.commit()
            return make_response(grill_review.to_dict(), 201)
        except ValueError:
            return make_response({'errors':['validation errors']}, 400)

api.add_resource(GrillReviews, '/grill_reviews')



class GrillReviewById(Resource):
    def get(self, id):
        review = GrillReview.query.filter(GrillReview.id==id).one_or_none()
        if review is None:
            return make_response({'error':'Review not found.'}, 404)
        return make_response(review.to_dict(), 200)
    
    def patch(self, id):
        review = GrillReview.query.filter(GrillReview.id==id).one_or_none()
        if review is None:
            return make_response({'error':'Review not found.'}, 404)
        fields = request.get_json()
        try:
            setattr(review, 'text', fields['text'])
            setattr(review, 'rating', fields['rating'])
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(), 202)
        except ValueError:
            return make_response({'errors':['validation errors']})
        
    def delete(self, id):
        review = GrillReview.query.filter(GrillReview.id==id).one_or_none()
        if review is None:
            return make_response({'error':'Review not found.'}, 404)
        db.session.delete(review)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(GrillReviewById, '/grill_reviews/<id:int>')



class AccessoryReviews(Resource):
    def get(self):
        reviews = [review.to_dict(rules=('-grills', '-accessories', '-grill_reviews', '-locations'))for review in AccessoryReview.query.all()]
        return make_response(reviews, 200)

    # probably will not need above function or will need to modify so it only get reviews for a specific accessory, similar
    # to a 'get by id' but the id would be for the accessory

    def post(self):
        try:
            accessory_review = AccessoryReview(
                text=request.json['text'],
                rating=request.json['rating']
            )
            db.sesssion.add(accessory_review)
            db.session.commit()
            return make_response(accessory_review.to_dict(), 201)
        except ValueError:
            return make_response({'errors':['validation errors']}, 400)


api.add_resource(AccessoryReviews, '/accessory_reviews')



class AccessoryReviewById(Resource):
    def get(self, id):
        review = AccessoryReview.query.filter(AccessoryReview.id==id).one_or_none()
        if review is None:
            return make_response({'error':'Review not found.'}, 404)
        return make_response(review.to_dict(), 200)
    
    def patch(self, id):
        review = AccessoryReview.query.filter(AccessoryReview.id==id).one_or_none()
        if review is None:
            return make_response({'error':'Review not found.'}, 404)
        fields = request.get_json()
        try:
            setattr(review, 'text', fields['text'])
            setattr(review, 'rating', fields['rating'])
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(), 202)
        except ValueError:
            return make_response({'errors':['validation errors']})
        
    def delete(self, id):
        review = AccessoryReview.query.filter(AccessoryReview.id==id).one_or_none()
        if review is None:
            return make_response({'error':'Review not found.'}, 404)
        db.session.delete(review)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(AccessoryReviewById, '/accessory_reviews/<id:int>')


class Locations(Resource):
    def get(self):
        locations = [location.to_dict(rules=('-grills', '-accessories', '-grill_reviews', '-accessory_reviews'))for location in Location.query.all()]
        return make_response(locations, 200)
    

api.add_resource(Locations, '/locations')


class LocationById(Resource):
    def get(self, id):
        location = Location.query.filter(Location.id==id).one_or_none()
        if location is None:
            return make_response({'error':'Location not found.'}, 404)
        return make_response(location.to_dict(), 200)
    
api.add_resource(Locations, '/locations/<int:id>')

# Didn't see need for any other CRUD actions on location since user can't add, change, or delete locations

if __name__ == '__main__':
    app.run(port=5555, debug=True)

