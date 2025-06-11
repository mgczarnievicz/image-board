
# Image Board App 🖼️

An Instagram-like single-page application that allows users to upload, view, and comment on images. Open to all users without registration, this app is a lightweight clone of modern image-sharing platforms.

## Running the Project

1. Clone the repository.

2. Install dependencies.

3. Set up environment variables (`secrets.json`) for AWS credentials, S3 bucket and postgres:

   ```json
   USER_NAME=your_postgres_name
   USER_PASSWORD=your_postgres_password
   AWS_KEY=your_aws_key
   AWS_SECRET=your_aws_secret
   BUCKET_NAME=your_bucket_name
   ```

4. Start the server:

   ```bash
   npm run start
   ```

## Overview

The Image Board App is a full-stack web application built with Vue.js on the frontend and Express.js on the backend. It enables users to:

* Upload images with titles and descriptions
* View images in a masonry-style gallery
* Leave comments on individual posts
* Automatically load more images with infinite scroll
* Store uploaded files on AWS S3

## Features

* 📸 Image upload with title & description
* 💬 Commenting system
* 🔄 Infinite scrolling for seamless UX
* ☁️ AWS S3 image storage
* ⚡ Fast and reactive UI with Vue.js
* 🔐 Backend API built with Express

## Technologies

[![My Skills](https://skillicons.dev/icons?i=js,css,vue,nodejs,express,aws,postgres)](https://skillicons.dev)

* JavaScript
* Vue.js
* Node.js
* Express.js
* PostgreSQL
* AWS S3

<!--

## Preview

![Image Board Preview](preview.png) 

 Replace with your own screenshot
 
  -->
