Affiliate Hub: Full-Stack Amazon Affiliate Website

Welcome to Affiliate Hub, a complete, production-ready affiliate marketing platform built with a modern full-stack technology stack.

This project enables administrators to manage a catalog of Amazon affiliate products, while end-users enjoy a clean, responsive, and mobile-friendly interface.

✨ Features

Responsive Design – Mobile-first layout for seamless use on all devices.

Dynamic Product Filtering – Instantly filter products by category.

Secure Admin Area – Login-protected dashboard for administrators.

Full CRUD for Admins – Add, edit, and delete products and categories in real time.

Trust-Building UI – Hero section and transparent affiliate link disclosure.

Localized Currency – Prices displayed in audience-friendly formats (e.g., ₹ INR).

Cloud Deployment Ready – Pre-configured for modern cloud hosting platforms.

🛠️ Technology Stack
Backend (Java / Spring Boot)

Framework: Spring Boot 3

Language: Java 21

Database: PostgreSQL (Spring Data JPA)

Security: Spring Security (Basic Authentication)

Build Tool: Apache Maven

Frontend (JavaScript / React)

Framework: React 19 (Vite)

Styling: Tailwind CSS (utility-first, responsive design)

State Management: React Hooks & Context API (authentication + global state)

Icons: Lucide React (modern SVG icons)

🚀 Getting Started: Local Development
Prerequisites

Java JDK 21+

Maven 3.8+

Node.js 18+ (with npm)

PostgreSQL (running locally)

1. Backend Setup

Navigate to the backend directory:

cd backend

Create an .env file in the backend root with your database credentials:

SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_db_name
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password

Run the Spring Boot application:

mvn spring-boot:run

➡️ Backend will be available at: http://localhost:8080

2. Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Create a .env.local file in the frontend root:

VITE_API_BASE_URL=http://localhost:8080

Start the development server:

npm run dev

➡️ Frontend will be available at: http://localhost:5173

🔑 Admin Credentials

Default login for the Admin Dashboard (configured in SecurityConfig.java):

Username: admin  
Password: password

☁️ Deployment

Backend: Deploy on Render
as a Web Service.

Connects to NeonDB (serverless PostgreSQL).

Use environment variables for DB and security configuration.

Frontend: Deploy on Netlify
as a static site.

Communicates with the live backend API.

Ensure CORS policy in WebConfig.java includes your frontend domain.

✅ You now have a fully functional, production-ready Amazon Affiliate Hub!
