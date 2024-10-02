# Frills

## Table of contents:

- About the Project
- Built With
- Getting Started
  - Prerequisites
  - Installation
- Features
- License
- Contact
- Acknowledgments

## About the project
This project is a simple web application that allows users to register, log in, create, edit, delete posts, and view posts. The application also supports viewing a single post by ID. This README file will guide you through the features, installation, and how to get the project running.

## Key features
### User Authentication:
- Register Form: Allows a new user to create an account. The form collects basic information like username, email, and password, and sends the data to the backend to create a new user account.
- Login Form: Allows an existing user to log in by submitting their credentials (email and password). Upon successful login, a token is stored in the browser.
- Logout Button: A button that logs the user out by clearing the token from the browser, effectively ending the session.
  
### Post Management:
- Post Form (Create/Edit): A form where a logged-in user can create a new post or edit an existing post. The form accepts title, content, and any other relevant data for the post.
- Delete Button: A button for deleting posts. Users can remove a post, and the UI will update to reflect the changes.
  
### Post Listing:
- Recent Posts Page: A listing page that displays the 12 most recent posts in the system.
- Single Post View: A dedicated page for viewing a single post by its ID. This view shows all details of a specific post, including title, content, and any other relevant information.

## Built with
- Vite
- Node.js

## Getting started

### Prerequisites:
You can run this application in all browsers.

### Installation

Clone repo
```bash
 git clone <repo link>
```

Install developer dependencies
```bash
npm install
```

Start developer server
```bash
npm run dev
```

## License

## Contact

## Aknowledgements

  
  
  
