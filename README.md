# Wanderlust — Find your stay

A full-stack travel listing platform where users can browse, add, edit, and delete stays with complete CRUD functionality, integrated maps, and a review system — secured with authentication and authorization.

## Features
- Browse and search travel stay listings
- Add, edit, and delete listings (CRUD)
- User authentication and authorization using Passport.js
- Interactive maps showing listing locations via LocationIQ
- Review and rating system for stays
- Image upload and hosting via Cloudinary
- Centralized error handling

## Tech Stack
**Frontend:** HTML, CSS, JavaScript, EJS, Bootstrap/Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Atlas)  
**Image Storage:** Cloudinary  
**Authentication:** Passport.js  
**Maps:** LocationIQ API  
**Others:** REST APIs, MVC Architecture

## Installation

1. Clone the repository
   ```
    git clone https://github.com/PratikHotkar/Wanderlust---find-your-stay.git
    cd Wanderlust---find-your-stay
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Set up environment variables (create a `.env` file in the root)
   ```
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MAP_TOKEN=your_locationiq_map_token
    ATLASDB_URL=your_mongodb_atlas_connection_string
    SECRET=your_session_secret
   ```
4. Run the app
   ```
   npm start
   ```
5. Visit `http://localhost:8080` (or your configured port) in your browser

## Live Demo
[Wanderlust](https://wanderlust-l7ug.onrender.com/listings)

## Author
**Pratik Hotkar**  
[LinkedIn](https://www.linkedin.com/in/pratik-hotkar-370aa429b) | [Email](mailto:hotkarpratik28@gmail.com)