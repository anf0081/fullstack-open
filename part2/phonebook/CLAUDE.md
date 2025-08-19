# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint linting
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server on port 3001 for local development

## Architecture Overview

This is a React phonebook application built with Vite. The app has both frontend and backend components:

### Frontend Structure
- **Main App**: `src/App.jsx` - Central component managing phonebook state and operations
- **Components**: Located in `src/components/`
  - `PersonForm.jsx` - Form for adding/updating contacts
  - `Person.jsx` - Individual contact display component
  - `Filter.jsx` - Search/filter component
  - `Notification.jsx` - Success/error message display
- **Services**: `src/services/persons.js` - Axios-based API client for CRUD operations

### Backend Integration
- API calls target `/api/persons` endpoint
- Vite proxy configuration routes `/api` requests to `http://localhost:3001`
- Local development uses JSON Server with `db.json` for mock backend
- Production backend is deployed at https://phonebook-umwy.onrender.com/api/persons

### Data Flow
- State managed in `App.jsx` with React hooks
- CRUD operations: create, read, update, delete contacts
- Error handling with user-friendly notifications
- Confirmation dialogs for destructive operations
- Real-time filtering of contacts

### Key Features
- Add new contacts with name and phone number
- Update existing contact numbers
- Delete contacts with confirmation
- Search/filter contacts by name
- Success and error notifications with auto-dismiss

## Development Setup

1. Install dependencies: `npm install`
2. Start JSON Server: `npm run server` (for local backend)
3. Start development server: `npm run dev`
4. Run linting: `npm run lint`

The application expects a backend API at `/api/persons` that supports GET, POST, PUT, and DELETE operations.