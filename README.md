<img style="height: 40px; margin-top: 12px;" src="https://raw.githubusercontent.com/owlCoder/public_api_buckets/main/reddit.svg" alt="Le Reddit Logo"><span style="font-size: 30px; margin-left: 5px;">&nbsp;Le Reddit</span></img>

## Techology Stack
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) 
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Languages
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white)
	![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)

## Supported Browsers
![Brave](https://img.shields.io/badge/Brave-FB542B?style=for-the-badge&logo=Brave&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![Opera](https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white)
![Safari](https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white)

## Dev Dependencies
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

This project is a Reddit clone that allows users to create, comment, and interact with forum topics. It includes separate services for sending notifications and checking service availability.

## Features

### User Interface (Web Role)
- User registration
- User login
- User profile modification
- Create new posts
- Comment on posts
- Search and sort posts by title
- Delete posts or comments
- Upvote and downvote posts

### User Registration
Users register by providing:
- First Name
- Last Name
- Address
- City
- Country
- Phone Number
- Email
- Password
- Profile Picture

### Notification Service
- Sends emails to subscribed users when a new comment is posted.
- Uses separate Worker Role service called `NotificationService` (3 instances).
- Utilizes services like Postmark or SendGrid for email delivery.

### Health Monitoring Service
- Separate Worker Role service called `HealthMonitoringService` (2 instances).
- Monitors `RedditService` and `NotificationService` every 1-5 seconds.
- Logs the status in a `HealthCheck` table.

### Health Status Service
- Web Role application for visual representation of service availability.
- Displays uptime percentage for the last 24 hours.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/owlCoder/le_reddit.git
   cd le_reddit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Usage

- Navigate to `http://localhost:5173` in your browser.
- Register a new user or log in with an existing account.
- Create, view, and interact with posts and comments.

## API Endpoints

### User Endpoints
- `POST /register` - Register a new user
- `POST /login` - Log in a user
- `PUT /user/:id` - Update user profile

### Post Endpoints
- `POST /posts` - Create a new post
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a specific post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Comment Endpoints
- `POST /posts/:postId/comments` - Add a comment to a post
- `DELETE /comments/:id` - Delete a comment

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Danijel Jovanović - [jovanovic.pr55.2020@uns.ac.rs](mailto:jovanovic.pr55.2020@uns.ac.rs)

Project Link: [https://github.com/owlCoder/le_reddit](https://github.com/owlCoder/le_reddit)
```

Feel free to customize the links, images, and additional details to match your specific project needs.
