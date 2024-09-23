# Promptopia

[![Deployed Site](https://img.shields.io/badge/Deployed%20Site-Live-brightgreen)](https://promptopia-nine-omega.vercel.app/)

Promptopia is a user-driven platform for sharing and discovering creative prompts for ChatGPT.

## Features

- **User Authentication**: Secure login using NextAuth.
- **Prompt Management**: Users can create, edit, and delete their prompts.
- **Tagging System**: Organize prompts using tags for easy search.
- **Responsive Design**: Fully optimized for mobile and desktop.

## Tech Stack

- **Frontend**: Next.js 14 with the App Router.
- **Authentication**: NextAuth.
- **Database**: MongoDB Atlas with Mongoose.
- **Styling**: Tailwind CSS.
- **Deployment**: Vercel.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AmrMohamed27/Promptopia.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env.local` file in the root directory and add the following variables:

     ```makefile
     MONGODB_URI=<your_mongo_uri>
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=<your_secret>

     ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Deployment

The app is deployed on Vercel. You can view the live version at [https://promptopia-nine-omega.vercel.app/](here).
