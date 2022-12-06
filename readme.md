 Configure typescript
> tsc --init


---

#### Add products
> GET http://localhost4545/api/v1/products
```json
"name":"mac",
"price":34,
"description":"Gadgets and accessories",
"category":"Tech"
```

Response
```json
{
    "message": "Product added",
    "product": {
        "name": "mac",
        "price": 34,
        "description": "Gadgets and accessories",
        "category": "Tech",
        "_id": "638eb579cdb167fde5884f5e",
        "createdAt": "2022-12-06T03:22:33.548Z",
        "updatedAt": "2022-12-06T03:22:33.548Z",
        "__v": 0
    },
    "products": [
        {
            "_id": "638eb579cdb167fde5884f5e",
            "name": "mac",
            "price": 34,
            "description": "Gadgets and accessories",
            "category": "Tech",
            "createdAt": "2022-12-06T03:22:33.548Z",
            "updatedAt": "2022-12-06T03:22:33.548Z",
            "__v": 0
        }
    ]
}
```

---

#### Get all products
> GET  http://localhost:4545/api/v1/products

---

#### Get single product
> GET  http://localhost:4545/api/v1/products/:id

---

#### Delete a product by id
> DELETE  http://localhost:4545/api/v1/products/:id


---

#### Update a product by id
> UPDATE  http://localhost:4545/api/v1/products/:id

```json
{
    "name": "hp",
    "price": 348,
    "description": "Gadgets and accessories",
    "category": "Tech"
}
```


---

### User/auth endpoints

#### Register a new user
> POST http://localhost:4545/api/v1/users/register
```json
{
    "name": "hp updated",
    "email": "ab@c.com",
    "password": "admin1234"
}
```


#### Login a user
> POST http://localhost:4545/api/v1/users/login
```json

{
    "email": "ab@c.com",
    "password": "admin1234"
}
```


##### Refresh token
> POST http://localhost:4545/api/v1/users/refresh
```json
{
    "refresh":"access_token"
}