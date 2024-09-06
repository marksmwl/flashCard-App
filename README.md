# Django Web App with PostgreSQL & React

This is a full-stack web application built using Django as the backend, PostgreSQL as the database, and React for the frontend.

## Features
User Authentication
Flashcard generation using gemini AI API
CRUD functionality with flashcards with and without AI generation

## Table of Contents
- [Requirements](#requirements)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [License](#license)

## Requirements
Ensure you have the following installed:

- Python 3.8+
- Node.js 14+ and npm
- PostgreSQL

# Getting Started
Follow these steps to set up the application.

## Backend Setup
Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
Set up a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate` Install dependencies:
```
Install Requirements
```bash
pip install -r requirements.txt
```

Create a PostgreSQL database:
```bash
createdb your_db_name
```
Configure the DATABASE_URL in your environment (see the Environment Variables section).

Apply migrations:
```bash
python manage.py migrate
```

Create a superuser:
```bash
python manage.py createsuperuser
```

Run the Django development server:
```bash
python manage.py runserver
```

## Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install frontend dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm start
```

## Environment Variables
Create a .env file in the root of your Django project or set environment variables in your operating system.

Example of .env file:
```makefile
SECRET_KEY=gemini_key
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/your_db_name
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Running the Application

Start the backend server:
```bash
python manage.py runserver
```

In a separate terminal, start the frontend:
```bash
cd frontend
npm run dev
```

Finally, start your postgresql instance.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
