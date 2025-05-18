# Billing ABC
Billing-ABC is a full-stack retail billing web application for managing billing and inventory operations. It features a Spring Boot backend with JWT-based authentication and a React frontend with Vite for a responsive user interface. The application supports user roles (ROLE_ADMIN and ROLE_USER), order processing, category and item management, and a dashboard for sales and order analytics. NeonDB stores billing data securely. Invoices and reports are stored in Amazon S3. Features include product management by owner & andassistant can also do billing & oversee today's revenue, invoice download, real-time updates, and scalable architecture for modern retail businesses. Attached Razarpay API for online money transaction using UPI. This repository only contains frontend part.
![](https://github.com/AadityaUoHyd/billing-abc/blob/main/Screenshot.png)

## Table of Contents

- Features
- Tech Stack
- Project Structure
- Installation
- Configuration
- Running the Application
- Usage
- API Endpoints
- Contributing
- License

## Features

- User Authentication: JWT-based login with role-based access (ROLE_ADMIN, ROLE_USER).
- Dashboard: Displays today’s sales, order count, and recent orders with details (order ID, customer, amount, payment method, status, time).
- Order Management: Create, view, and manage orders with payment status tracking.
- Category & Item Management: Admin-only features to add, delete, and view categories and items.
- Cart System: Add items to cart, update quantities, and clear cart.
- Activity Log & Settings: Track user actions and configure application settings.
- Responsive UI: Built with React, Tailwind CSS (assumed), and react-hot-toast for notifications.
- Protected Routes: Admin routes (/category, /users, /items, /admin-dashboard) restricted to ROLE_ADMIN.

## Tech Stack
### Backend

- Spring Boot: v3.x (Java 17+)
- Spring Security: JWT authentication with role-based access
- Spring Data JPA: MySQL/PostgreSQL database (assumed)
- Maven: Dependency management
- Libraries: jjwt (v0.9.1), spring-web (v6.2.5), spring-security (v6.4.4)
- AWS S3 : To store images of categories/products.

### Frontend

- React: v18.x with Vite
- React Router: v6.x for routing
- Axios: HTTP requests to backend
- React Hot Toast: Notifications
- React Icons: UI icons (e.g., FaMoneyBillWave, FaShoppingCart)
- CSS: Custom styles (Dashboard.css, App.css)

### Database

- PostgreSQL with Neon-db cloud (assumed, with tables like tbl_users, tbl_orders)

## Project Structure
```

billing-abc-backend/
   ├── src/main/java/org/aadi/spring_bills/
   │   ├── config/SecurityConfig.java
   │   ├── filter/JwtRequestFilter.java
   │   ├── util/JwtUtil.java
   │   ├── controller/
   │   │   ├── AuthController.java
   │   │   ├── DashboardController.java
   │   │   ├── CategoryController.java
   │   │   ├── ItemController.java
   │   │   ├── OrderController.java
   │   ├── entity/
   │   │   ├── User.java
   │   │   ├── OrderEntity.java
   │   │   ├── PaymentDetails.java
   │   ├── repository/
   │   │   ├── OrderEntityRepository.java
   ├── pom.xml
   ├── .env
   ├── README.md
   ├── logs/spring.log
       ......


billing-abc/
   ├── src/
   │   ├── components/
   │   │   ├── Menubar/Menubar.jsx
   │   │   ├── Footer/Footer.jsx
   │   │   ├── AdminDashboard/AdminDashboard.jsx
   │   ├── context/
   │   │   ├── AppContext.jsx
   │   ├── pages/
   │   │   ├── Dashboard/Dashboard.jsx
   │   │   ├── Dashboard/Dashboard.css
   │   │   ├── ManageCategory/ManageCategory.jsx
   │   │   ├── ManageUsers/ManageUsers.jsx
   │   │   ├── ManageItems/ManageItems.jsx
   │   │   ├── Order/Order.jsx
   │   │   ├── OrderHistory/OrderHistory.jsx
   │   │   ├── Settings/Settings.jsx
   │   │   ├── ActivityLog/ActivityLog.jsx│   │   │   ├── Login/Login.jsx
   │   │   ├── About/About.jsx
   │   │   ├── Contact/Contact.jsx
   │   │   ├── Privacy/Privacy.jsx
   │   │   ├── NotFound/NotFound.jsx
   │   ├── Service/
   │   │   ├── Dashboard.js
   │   │   ├── CategoryService.js
   │   │   ├── ItemService.js
   │   ├── App.jsx
   │   ├── App.css
   │   ├── main.jsx
   ├── package.json
   ├── .env
   ├── index.html
   ├── vite.config.js
   |── README.md
       .....

```
## Installation

- Clone the Repository:
```
git clone https://github.com/your-username/billing-abc.git
cd billing-abc
```

### Backend Setup:
```
Navigate to the backend directory:cd backend


Install dependencies:mvn clean install


Configure the database in src/main/resources/application.properties:spring.datasource.url=jdbc:mysql://localhost:3306/billing_abc
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

```

### Frontend Setup:
```
Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Create a .env file in frontend/:VITE_BACKEND_URL=http://localhost:8080/api/v1.0
VITE_SHOP_NAME=Billing ABC

```

### Database Setup:

- Create a database:CREATE DATABASE billing_abc;
- Ensure tbl_users and tbl_orders tables exist (see schema in backend/src/main/resources/schema.sql if available).
- You can use either local PostgreSQL, or by spinning Docker, or Neon cloud. Even one can use MySQL if find that comfortable with. 


## Configuration

- Backend:
```
Update application.properties with your database credentials.
Configure JWT secret in JwtUtil.java (if not hardcoded).
```

- Frontend:
```
VITE_BACKEND_URL=http://localhost:8080/api/v1.0
#VITE_BACKEND_URL=https://billing-abc-backend.onrender.com/api/v1.0
VITE_SHOP_NAME=ABC-Store #Assumming this is the name of store we are billing.
VITE_SHOP_ADDRESS=Banjara Hiils, Road No-12, Hyderabad-500034
VITE_SHOP_MOBILE=+91-9000000000 #Assumming this is the phone number of store we are billing.

Ensure VITE_BACKEND_URL matches your backend URL.
Verify CORS in SecurityConfig.java:@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));  //put FRONTEND_URL if using .env
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

## Running the Application

- Start the Backend:
```
cd backend
mvn spring-boot:run


Runs on http://localhost:8080.

```

- Start the Frontend:
```
cd frontend
npm run dev


Runs on http://localhost:5173.

```
- Access the Application:

Open http://localhost:5173 in your browser.
Log in with credentials (e.g., aaditya@email.com/password).



## Usage

- Login: Access /login to authenticate. Redirects to /dashboard on success.
- Dashboard: View sales, order counts, and recent orders at /dashboard.
- Admin Features:
- Manage categories at /category (ROLE_ADMIN only).
- Manage users at /users (ROLE_ADMIN only).
- Manage items at /items (ROLE_ADMIN only).
- View admin dashboard at /admin-dashboard (ROLE_ADMIN only).

- Orders: Create orders at /order, view history at /orders.
- Settings & Logs: Configure settings at /settings, view logs at /activity.

## API Endpoints
- Authentication
```
POST /api/v1.0/login:
Body: { "email": "user@example.com", "password": "password" }
Response: { "token": "eyJ...", "role": "ROLE_ADMIN" }
```


- Dashboard
```
GET /api/v1.0/dashboard:
Headers: Authorization: Bearer <token>
Response: { "todaySales": 1000.00, "todayOrderCount": 5, "recentOrders": [...] }
```


- Categories
```
GET /api/v1.0/categories:
Headers: Authorization: Bearer <token>


POST /api/v1.0/admin/categories:
Headers: Authorization: Bearer <token>
Body: { "name": "Category Name" }


DELETE /api/v1.0/admin/categories/{id}:
Headers: Authorization: Bearer <token>


```
- Items & Orders

(Add endpoints based on ItemService.js, OrderController.java)

## Contributing

- Fork the repository.
- Create a branch: git checkout -b feature-name.
- Commit changes: git commit -m "Add feature".
- Push to branch: git push origin feature-name.
- Open a pull request.

## License
- This project is licensed under the MIT License.
- Do not forget to cross check demo => https://billing-abc.vercel.app