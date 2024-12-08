# book-collection-app
A RESTful API for managing a collection of books whith user Authentication and Role-Based Access Control, built using Node.js, Express, and MongoDB.

## Access is restricted to certain routes based on roles:

###  Admin Only:
GET /books/all: Fetch all books (visible only to admins).

###  Users Only:
GET /books: Fetch books based on user-specific criteria (e.g. getfavoriteBook).
POST /books: Add a new book (users can only create).

## The server has the following routes:
```
- Get /api/auth/getme  to see user informations
- Post /api/auth/signup   to sign-up.
- Post /api/auth/signin   to log-in.
- Post /api/auth/signout  to log-out.
- get /api/users/profile/:username   to users infromation through username
- get /api/users/update    to update authorized use.
- Get /api/books   Only admins have access
- Get /api/books/:id    for single book using the id
- Get /api/books/favorites    to see your favorites books,and Only users have access.
- Get /api/books/book-recommended    to see books recommended for you
- Put /api/books/:id    to update single book by using id
- Patch /api/books/toggle-favorite/:id    to toggle book favorite or not
- Post /api/books/create   to create book
- Delete /api/books/:id    to delete book by using id
```
## Installation
Use the package manager npm to install dependencies.
```
install
```
## usage
1. Clone the repository:
   ```
   https://github.com/Amanueltamirat/book-collection.git
   ```
2. Navigate into the project directory:
   ```
   cd Books-Collection
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the following command to start the application:
   ```
   npm run dev
   ```
5.Run the server locally by using the following url:
  ```
  - http://localhost:5000/api/auth/signup
  - http://localhost:5000/api/auth/signin
  - http://localhost:5000/api/users/profile/:username
  - http://localhost:5000/api/users/update
  - https://book-collection-cusa.onrender.com/api/books
  - http://localhost:5000/api/books/favorites
  - http://localhost:5000/api/books/book-recommended
  - http://localhost:5000/api/books/:id

  

```
Open the following URL in your browser to see live demo:
```
https://book-collection-cusa.onrender.com/api/books
