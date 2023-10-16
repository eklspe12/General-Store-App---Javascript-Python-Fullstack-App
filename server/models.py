from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class Products(db.Model, SerializerMixin):
    __tablename__ = 'Products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    # one-to-many relationship with reviews, might need to have it's own model called grill_reviews

    def __repr__(self):
        return f'<Products {self.name}>'


class Stock(db.Model, SerializerMixin):
    __tablename__ = 'Stock'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    product_id = db.Column(db.Integer, db.ForeignKey(
        'product.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(
        'location.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    product = db.relationship('Product', backref='inventory')
    location = db.relationship('Location', backref='inventory')

    def __repr__(self):
        return f'<Stock {self.name}>'


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String)

    # many-to-many relationship with grills
    # many-to-many relationship with accessories

    def __repr__(self):
        return f'<Location {self.address}>'
