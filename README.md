
# OPAL - Social Media Platform (Backend)

This is the Backend for the social media application, built using Node.js. It offers Secure authentication and Data Management of User.

[Click Here](https://github.com/Darshil0109/react-deploy) for The Frontend of This Social Media Project 

## Installation

Follow these steps to set up and run the backend of the social media project locally:

### Prerequisites

Make sure you have the following tools installed on your machine:

- **Node.js**: Download and install [Node.js](https://nodejs.org/) (LTS version recommended).
- **npm**: npm comes bundled with Node.js, but if needed, you can install it separately via [npm's website](https://www.npmjs.com/get-npm).
- **Git**: Install [Git](https://git-scm.com/) to clone the repository and manage version control.
- **MongoDB** (optional if using local database): Install [MongoDB](https://www.mongodb.com/try/download/community) if you want to run the database locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database.
- **Cloudinary**: Create Account on Cloudinary and get Cloudinary Url to get Free Cloud Storage to store Images in [Cloudinary](https://cloudinary.com/)
### Steps

1. **Clone the repository**:

   Start by cloning the repository to your local machine. Run the following command in your terminal:

   ```bash
   git clone https://github.com/Darshil0109/test-deploy.git
   ```

2. **Navigate to the project folder**:
```bash 
cd test-deploy
```

3. **Install dependencies**:

```bash
npm install
```
This will download and install all the libraries and packages specified in the package.json file.


4. **Set up environment variables**:

   To configure your local environment, create a `.env` file in the root of the project directory.

   Add the following environment variables to the `.env` file:

   ```env
   MONGODB_URI=mongodb://localhost:27017/# Your MongoDB URI (local or Atlas URL)
   JWT_SECRET=your-jwt-secret  # Secret for JWT authentication
   CLOUDINARY_URL=your-cloudinary-url #create account on cloudinary and get URL from there to store images
   CORS_ORIGIN=http://localhost:3000 # Your React Url from You want to send requests (local or if you deploy your frontend)
   
   ```

   Make sure to replace the URLs with the actual ones you are using (for local or production environments).

5. **Start the development server**:

   To run the app locally, use the following command:

   ```bash
   npm start
   ```

   This will start the development server and automatically open the app in your default web browser. The app will be available at [http://localhost:5000](http://localhost:5000).

