# Weather Backend API

## Project Overview
This is a Scalable Weather Backend API built with Node.js, Express, and MongoDB.  
It allows CRUD operations on cities along with weather information and includes JWT-based authentication for protected routes.

---

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Architecture
- **Server:** Node.js + Express  
- **Database:** MongoDB (Cities collection)  
- **Authentication:** JWT for admin-protected routes  
- **Routes:**  
  - `/api/cities` → CRUD for cities  
  - `/api/users` → User registration/login (if required)  
  - `/api/admin` → Admin functionality (optional)

---

## API Endpoints

| Method | URL | Auth | Body | Description |
|--------|-----|------|------|-------------|
| POST   | /api/cities | JWT | `{name, country, temperature, condition, population}` | Add new city |
| GET    | /api/cities | No | None | Get all cities |
| GET    | /api/cities/:name | No | None | Get city by name |
| PUT    | /api/cities/:name | JWT | `{temperature?, condition?, population?}` | Update city |
| DELETE | /api/cities/:name | JWT | None | Delete city |

---

## Notes
- Server runs locally at: `http://localhost:5000`  
- Protected routes require **JWT token** in the `Authorization` header  
- Case-insensitive search for GET and DELETE endpoints  
- Proper error handling implemented: 400, 404, 409, 500  
- Postman collection included in `docs/weather-api.postman_collection.json`  

---

## Running Locally
1. Clone the repository  
2. Run `npm install`  
3. Create `.env` file with:
