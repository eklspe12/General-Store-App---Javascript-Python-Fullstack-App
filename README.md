### General Store Website

---

## Authors

### Spencer Eklund

- Linkedin https://www.linkedin.com/in/spencer-eklund/
- Github https://github.com/eklspe12

---

## Introduction

This program serves as a demo app for an online store users could use to track inventory and products. The front-end is made with React and Formik while the back-end was made with Python, Flask, and SQL. Continue reading for an explanation of each page, followed by detailed explanation of each file.

---

# Pages

## Nav Bar

On the top of each page is the NavBar, which allows user to move between front-end pages with the help of React router.

## Homepage

This page is where Users would include background and contact information about their company.

## Location Finder

This is where store owners would keep track of invectory for each location. One this page users can add locations and new inventory through the asscoiated forms, as well as search inventory by product or location name.

## Store

Here users can view and modify information about available products. All products are viewable on loading, to view specific items you can use the searchbar to look for specific names. Each product card displays a price, description, and image for a product. If users would like to edit products they can click the edit product button, which flips the product card to an update form that will save information on submit. To add a new product use the associated form. To delete a product, click the remove a product button.

---

# Files

## Client

### AddLocation.js

Contains form for adding Locations. Form text field is validated with formik. When the 'Add Location' button is clicked, a POST request is sent to add the new location to the backend database.

### AddProduct.js

Contains form for adding new Products. Form input is validated with formik. When the 'Add Product" button is clicked, a POST request is sent to add the new location to the backend database.

### AddStock.js

Contains form for adding new products. All form input fields utilize formik for validation. When the "Add Product" button is clicked, a POST request is sent to add new product to the backend database.

### App.js

Contains NavBar component as well as highest level component for each webpage. Retreives products with React useEffect then stores them as a state to be passed to the Store component. Also contains handleSearch and handleChanges functions to be passed down to Store.

### Home.js

Component that holds information for the homepage.

### LocationFinder.js

Component that holds SearchBar component.

### NavBar.js

Holds React router links that navigate users to other pages on website.

### ProductCard.js

Receives individual products as well as functions to assit with deleting and updating products. One side fo product card displays product name, description, image, price, a button for removing the product, and a button for editing the product. If the user clicks the "Remove from catalog" button then delete patch is sent to remove it from the database, then the products state is updated on the front end to remove the product for the user as well. The edit product button changes the class of the card which in changes the display to a form. Whatever the user enters in the form will be be sent to the backend as a PATCH request when the user clicks save. The save button also automatically changes the card over to show updated values.

### ProductList.js

Receives products state variable then maps each product to create individual product cards. Also receives functions for assissting with deleting and updating products to be passed to individual ProductCard components.

### SearchBar.js

Retrieves inventory information and with React useEffect and stores it as a state. Users can filter inventory instances with the searchbar which is controlled with formik. Also contains AddStock and AddLocation components and passes inventory state variables to AddStock component.

### Store.js

Component for the '/store' path. This file contains functions for adding, deleting, updating, and filtering products. Also passes props from App.js down to AddProduct and ProductList components. Formik is used to control input of search bar.

### Index.js

Imports BrowerRouter and wraps App component with it to allow the use of the NavBar to move between pages.

---

## Server

### app.db

Database that stores information for each instance of stocks, products, and locations. Can be viewed with SQLite.

### app.py

Holds functions necessary to create backend routes as well as the routes themselves.

### config.py

Holds imports for Flask and SQL to be used on the back-end. Also instantiates database and API.

### models.py

Holds relationships and validations for each model and determines attributes for each model.

### seed.py

This file contains functions that utilize Faker to generate instances products, locations, and inventory then uses separate functions to save these instances to the database on app.py.
