# Phonebook App

A simple Node.js + Express backend for managing a phonebook.  
Hosted at: https://phonebook-umwy.onrender.com

## Features

- List all phonebook entries
- Add a new person with a name and number
- Delete a person by ID
- View info about the phonebook (number of entries and current date)

## API Endpoints

- `GET /api/persons` — Get all persons
- `GET /api/persons/:id` — Get a single person by ID
- `POST /api/persons` — Add a new person  
  - Body: `{ "name": "Name", "number": "123456" }`
- `DELETE /api/persons/:id` — Delete a person by ID
- `GET /info` — Get info about the phonebook

## Running Locally

1. Install dependencies: npm install
2. Start the server: npm start
3. The app runs on http://localhost:3001 by default.

## Notes

- Data is stored in memory and will reset when the server restarts.
- For production, the app is hosted on Render: https://phonebook-umwy.onrender.com