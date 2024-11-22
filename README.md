# 🔒 CRUD with Local authentication - Json Web Token

## 🚀 Endpoints

### Sign Up
**URL**: `/signup`  
**Method**: `POST`  
**Body**: 
```json
{
  "username": "username",
  "email": "email@email.com",
  "password": "password",
  "rePassword": "password"
}
```

### Sign In
**URL**: `/signin`  
**Method**: `POST`  
**Body**: 
```json
{
  "username": "username",
  "password": "password"
}
```

### Update user
**URL**: `/user/:UserId`  
**Method**: `PUT`  
**Body**: 
```json
{
  "username": "username",
  "email": "email",
  "password": "password"
}
```

### Delete user
**URL**: `/user/:userId`  
**Method**: `DELETE`  

### Get user
**URL**: `/user/:userId`  
**Method**: `GET`  



