#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from server.app import app
from models import db, Product, Stock, Location

def create_products():
    product_details = [
        {
            'name':'Blackstone 36in',
            'description':'Blackstone 36-in Culinary Omnivore Griddle with Hood 4-Burner Liquid Propane Flat Top Grill',
            'image':'https://mobileimages.lowes.com/productimages/bdea8432-2a4e-4bd6-b016-b2eeea9e092f/63592807.jpg?size=pdhism',
            'price':'399'
            
        },
        {
            'name':'Master Cook',
            'description':'3 Burner BBQ Propane Gas Grill, Stainless Steel 30,000 BTU Patio Garden Barbecue Grill with Two Foldable Shelves',
            'image':'https://m.media-amazon.com/images/I/81aEEF2NCEL._AC_UY436_FMwebp_QL65_.jpg',
            'price':'199'
        },
        {
            'name':'Royal Gourmet',
            'description':'Electric Indoor Searing Grill with Adjustable Temperature Control to 450F, Removable Nonstick Grate, 118 sq. in. Surface Serves 6, Stainless Steel',
            'image':'https://m.media-amazon.com/images/I/81R5ZsXZoML._AC_UY436_FMwebp_QL65_.jpg',
            'price':'76'
        },
           {
            'name':'Cuisinart CGG-306',
            'description':'Chef Style Portable Propane Tabletop 20,000, Professional Gas Grill, Two 10,000 BTU Burners, Stainless Steel',
            'image':'https://m.media-amazon.com/images/I/61A1w5OVtdL._AC_UY436_FMwebp_QL65_.jpg',
            'price':'135'
        },
        {
            'name':'Captiva',
            'description':'4-Burners Propane Gas BBQ Grill with Side Burner & Porcelain-Enameled Cast Iron Grates',
            'image':'https://m.media-amazon.com/images/I/71nK+X-OXVL._AC_UY436_FMwebp_QL65_.jpg',
            'price':'335'
        },
         {
            'name':'Grilling Baskets',
            'description':'Suitable for Vegetable,Fries,Fish, Shrimp, Grill BBQ Net Tube with Barbecue accessories',
            'image':'https://m.media-amazon.com/images/I/81tUnEQsrhL._AC_UY436_FMwebp_QL65_.jpg',
            'price':'23'
        },
          {
            'name':'Meat Thermometer',
            'description':'Digital, Waterproof Instant Read Meat Thermometers for Grilling and Cooking.',
            'image':'https://m.media-amazon.com/images/I/81BDoVP8M4L._AC_UL640_FMwebp_QL65_.jpg',
            'price':'13'
        },
        {
            'name':'15pc Accessories',
            'description':'Grill Accessories, Heavy Duty Stainless Steel Grill Set, BBQ Accessories for Outdoor Grill.',
            'image':'https://m.media-amazon.com/images/I/61ThQBDP9NL._AC_UY436_FMwebp_QL65_.jpg',
            'price':'25'
        },
        {
            'name':'Grill Brush',
            'description':'Durable & Effective',
            'image':'https://m.media-amazon.com/images/I/61ng8saWHTL._AC_UY218_.jpg',
            'price':'10'
        },
        {
            'name':'Round Steak',
            'description':'London Pasture raised.',
            'image':'https://m.media-amazon.com/images/I/61pSOxQj5YL._AC_UL640_FMwebp_QL65_.jpg',
            'price':'9'
        },
        {
            'name':'Ribeye',
            'description':'Boneless dry age',
            'image':'https://m.media-amazon.com/images/I/51vJoFPHR0L._AC_UL640_FMwebp_QL65_.jpg',
            'price':'23'
        },
        {
            'name':'Chicken Breast',
            'description':'Organic, skinless chicken',
            'image':'https://m.media-amazon.com/images/I/51mNPL86qIL._AC_UL640_FMwebp_QL65_.jpg',
            'price':'7'
        },
        {
            'name':'Pork Loin',
            'description':'Pork Loin Chop Bone-In',
            'image':'https://m.media-amazon.com/images/I/61wG73QuQYL._AC_UL640_FMwebp_QL65_.jpg',
            'price':'7'
        },

    ]
    products = []
    for details in product_details:
        p = Product(
            name=details['name'],
            description=details['description'],
            image=details['image'],
            price=details['price']
        )
        products.append(p)

    return products



def create_locations():
    locations = []
    for _ in range(7):
        l = Location(
            address=fake.address()
        )
        locations.append(l)

    return locations

def create_stocks(products, locations):
    stocks = []
    for _ in range(30):
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