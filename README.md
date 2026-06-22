Personal Task Manager (MERN Stack) – Adding to an Existing GitHub Project

📌 Overview

This is a full-stack Personal Task Manager application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, manage, and track tasks with categories and completion status.

⸻

🚀 Features

* Create, update, and delete tasks
* View all tasks in a responsive layout (table or cards)
* Assign categories (Work, Personal, Urgent, etc.)
* Mark tasks as completed or pending
* Filter tasks by category and completion status
* Form validation (no empty fields, no past due dates)

⸻

🛠️ Tech Stack

Frontend:

* React (Functional Components)
* Hooks (useState, useEffect)
* CSS / Tailwind (optional)

Backend:

* Node.js
* Express.js

Database:

* MongoDB (with Mongoose)

⸻

📂 Project Structure

/client   → React frontend
/server   → Express backend

⸻

⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/debstixx/taskpersonal
cd task-manager

2. Install dependencies

Backend:

cd server
npm install

Frontend:

cd client
npm create vite@latest

⸻

3. Setup environment variables

Create a .env file in the /server folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

⸻

4. Run the app

Start backend:

cd server
npm run dev

Start frontend:

cd client
npm run dev

⸻

📡 API Endpoints

Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Create a new task
PATCH	/tasks/	Update a task
DELETE	/tasks/	Delete a task

⸻

🧾 Task Schema (Mongoose)

* title (String, required)
* description (String, required)
* tag (String, required)
* date (Date, Timestamp, required)

⸻

⚠️ Validation Rules

* All fields are required
* Due date cannot be in the past

⸻

❌ Error Handling

* Proper HTTP status codes (200, 400, 404, 500)
* Try/catch blocks in backend routes

⸻

🔮 Future Improvements

* Add authentication (login/signup)
* Add task reminders/notifications
* Drag-and-drop task organization

⸻

👤 Author

Adebowale

⸻

📄 License

This project is open-source and free to us
