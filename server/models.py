from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Grill(db.Model, SerializerMixin):
    __tablename__ = 'grills'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    # one-to-many relationship with reviews, might need to have it's own model called grill_reviews

    def __repr__(self):
        return f'<Grill {self.name}>'
    
class Accessory(db.Model, SerializerMixin):
    __tablename__ = 'accessories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    # one-to-many relationship with reviews, might need to have it's own model called accessory_reviews


    def __repr__(self):
        return f'<Accessory {self.name}>'
    
class GrillReview(db.Model, SerializerMixin):
    __tablename__ = 'grill_reviews'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    rating = db.Column(db.Float)

    # one-to-many relationship with grills
    # one-to-many relationship with accessories


    def __repr__(self):
        return f'<Review>'
    
class AccessoryReview(db.Model, SerializerMixin):
    __tablename__ = 'accessory_reviews'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    rating = db.Column(db.Float)


    # one-to-many relationship with grills
    # one-to-many relationship with accessories



    def __repr__(self):
        return f'<Review>'


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String)

    # many-to-many relationship with grills
    # many-to-many relationship with accessories

    def __repr__(self):
        return f'<Location {self.address}>'