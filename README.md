# 📘 School Management API  

A simple Node.js + Express + MySQL API for managing schools. This project provides endpoints to add schools and fetch a list of schools sorted by distance from a given location.  

---

## 🚀 Features  
- **Add School API** – Add a new school with name, address, latitude, and longitude.  
- **List Schools API** – Fetch all schools and sort them by proximity to the user’s location.  
- **Input Validation** – Ensures required fields and correct data types.  
- **MySQL Database** – Stores school data securely.  

---

## 📂 Deliverables  

### ✅ Deliverable 1 – Source Code Repository  
This repo contains the **complete API implementation** with Node.js, Express, and MySQL.  

### ✅ Deliverable 2 – Live API Endpoints  
API is hosted and accessible via:  

(Replace with your deployed link if hosted online, e.g., on Render/Heroku).  

Available endpoints:  
- **Health Check** – `GET /`  
- **Add School** – `POST /addSchool`  
- **List Schools** – `GET /listSchools?latitude={lat}&longitude={lng}`  

### ✅ Deliverable 3 – Postman Collection  
A Postman collection is included for easy testing.  

File: [`postman/SchoolManagementAPI.postman_collection.json`](./postman/SchoolManagementAPI.postman_collection.json)  

You can also import it directly into Postman.  

---

## ⚙️ Installation & Setup  

1. **Clone the repo**  
```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api

2. **Install dependencies**
```bash
npm install

3. **Set up MySQL database**
```bash
CREATE DATABASE school_management;
USE school_management;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL
);

4. **Configure environment variables**
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_management
PORT=5000

5. **Run the server**
```bash
npm start

