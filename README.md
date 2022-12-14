# ElectronicsOrderingSystem

## Order API
### Create Order
```lua
POST : http://localhost:3000/api/order/create
```
```json
{
  "customerInfo": {
    "name": "Ram",
    "tel":[8890, 8989],
    "email":["admin@gmail.com", "test@gmail.com"]
  },
  "productsList": {
    "products": [
      {
        "name": "mobilE"
      }
    ]
  }
}

```


### View Order
```lua
GET : http://localhost:3000/api/order/
```


### Submit Final Order
```lua
PATCH : http://localhost:3000/api/order/submitfinalorder/id
```
```json
{}

```

### Order Complete
```lua
PATCH : http://localhost:3000/api/order/ordercomplete/id
```
```json
{}

```

## Vendor API

### Create Vendor
```lua
POST : http://localhost:3000/api/vendor/create
```
```json
{
    "name":"Rajan",
    "product":{
        "name":"Battery",
        "price":500
    }
}

```

### Submit Vendor Review
```lua
POST : http://localhost:3000/api/vendor/create
```
```json
{
    "deliveryRating": 4,
    "overallVendorRating": 4
}
```
