#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Product, Stock, Location

def create_products():
    products = []
    for _ in range(20):
        p = Product(
            name=fake.first_name(),
            description=fake.sentence(nb_words=10),
            image=fake.image_url(),
            price=str(randint(1, 3000)),
        )
        products.append(p)

    return products



def create_locations():
    locations = []
    for _ in range(20):
        l = Location(
            address=fake.address()
        )
        locations.append(l)

    return locations

def create_stocks(products, locations):
    stocks = []
    for _ in range(20):
        s = Stock(
            product_id=rc(products).id,
            location_id=rc(locations).id,
            quantity=randint(1, 20)
        ) 
        stocks.append(s)

    return stocks


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        print("Clearing database...")
        Product.query.delete()
        Stock.query.delete()
        Location.query.delete()

        print('Seeding Products...')
        products = create_products()
        for product in products:
            db.session.add(product)
        db.session.commit()


        print('Seeding Locations...')
        locations = create_locations()
        for location in locations:
            db.session.add(location)
        db.session.commit()

        print('Seeding Stock...')
        stocks = create_stocks(products,locations)
        for stock in stocks:
            db.session.add(stock)
        db.session.commit()

        print('Seeding finished, thank you!')