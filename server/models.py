from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db


class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    # one-to-many relationship with reviews, might need to have it's own model called grill_reviews

    stocks = db.relationship('Stock', backref='product', cascade='all, delete-orphan')

    serialize_rules = ('stocks.product', '-locations.products')

    @validates('name')
    def validate_name(self, key, name):
        if not name or len(name) <3:
            raise ValueError('Product must have a name over 3 characters long.')
        return name
    
    @validates('description')
    def validate_description(self, key, description):
        if not description or len(description) < 15:
            raise ValueError('Product must have a description over 15 characters long.')
        return description
    
    @validates('image')
    def validates_image(self, key, image):
        if not image:
            raise ValueError('Product must have an image.')
        return image
    
    @validates('price')
    def validates_price(self, key, price):
        if not price:
            raise ValueError('Product must have a price.')
        return price

    def __repr__(self):
        return f'<Product {self.name}>'


class Stock(db.Model, SerializerMixin):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)

    product_id = db.Column(db.Integer, db.ForeignKey(
        'products.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(
        'locations.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    serialize_rules = ('-product.stocks', '-location.stocks')

    @validates('product_id')
    def validate_product_id(self, key, product_id):
        if product_id is not None:
            return product_id
        raise ValueError('Must have a product ID.')
    
    @validates('location_id')
    def validate_location_id(self, key, location_id):
        if location_id is not None:
            return location_id
        raise ValueError('Must have a location ID.')
    
    @validates('quantity')
    def validates_quantity(self, key, quantity):
        if not quantity or quantity < 0:
            raise ValueError('Must include number for quantity. If item is out of stock enter 0.')
        return quantity

    def __repr__(self):
        return f'<Stock {self.name}>'


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String)

    stocks = db.relationship('Stock', backref='location', cascade='all, delete-orphan')

    serialize_rules = ('stocks.location', '-products.locations')

    @validates('address')
    def validate_address(self, key, address):
        if not address or len(address) <15:
            raise ValueError('Must have address over 15 characters long.')
        return address

    def __repr__(self):
        return f'<Location {self.address}>'