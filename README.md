# Contact Management API

This is a starter Node.js API server application built on Express. It has Jest and a local development server. It provides RESTful API endpoints for creating, retrieving, updating, and deleting contact records.

It is built for an assignment, and can be improved further.

## Table of Contents

- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Validators](#validators)
- [Prerequisite](#prerequisite)
- [Nice to have](#nice-to-have)
- [Getting started](#getting-started)
- [General Notes](#general-notes)

## Usage

```
This API allows you to manage contacts. You can interact with it through HTTP requests.
```

## API Endpoints

1. Create a Contact
   ```
   Endpoint: POST /contacts
   Request Body: JSON data with contact information
   ```
2. Retrieve All Contacts
   ```
   Endpoint: GET /contacts
   ```
3. Retrieve a Contact by ID
   ```
   Endpoint: GET /contacts/:id
   ```
4. Update a Contact by ID
   ```
   Endpoint: PUT /contacts/:id
   Request Body: JSON data with updated contact information
   ```
5. Delete a Contact by ID
   ```
   Endpoint: DELETE /contacts/:id
   ```

## Validators

```
The application uses validators to ensure data integrity and handle validation logic.
```

## Prerequisite

- Node 14

## Nice to have

- [VS Code](https://code.visualstudio.com/)

## Getting started

- Download the Project

- Install dependencies

```
cd <project_name>
npm install
```

- Run local development server

```
node httpserver.js
```

- Using postman, curl, or your browser

```
GET http://localhost:3000/contacts
```

- To run tests

```
npm run test
```

## General notes

- This is meant to be a project for assignment. Feel free to suggest new improvements or best practices.
