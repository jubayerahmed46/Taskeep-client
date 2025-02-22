# Taskeep (Modern Task Management Application)

**Taskeep** is a powerful **task management web application** that helps you plan your daily life more effectively. It provides a modern and interactive experience with real-time task updates, ensuring you stay consistent with your work.

</br>
</br>

<p align="center">
<a href="https://taskeep-task.web.app">
<img src="https://i.ibb.co.com/v46TMycV/localhost-5173-Nest-Hub.png" alt="Taskeep UI" height="300px">
</a>
</p>

### Firebase Live Link: [Taskeep Task](https://taskeep-task.web.app)

## Features

- Authentication with Firebase, including Google Provider.
- CRUD operations with real-time data updates.
- Mobile and desktop-friendly drag-and-drop features.
- A clean and smooth UI design.
- Efficient data storage in the database.
- More features coming soon...

## Dependencies

Below are the dependencies used in this project:

### Main Dependencies

```json
{
  "@dnd-kit/sortable": "^10.0.0",
  "@headlessui/react": "^2.2.0",
  "@tanstack/react-query": "^5.66.7",
  "axios": "^1.7.9",
  "daisyui": "^4.12.23",
  "firebase": "^11.3.1",
  "react": "^19.0.0",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "react-dom": "^19.0.0",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "react-router": "^7.2.0",
  "socket.io-client": "^4.8.1"
}
```

## Technology

### Frontend

- **React.js** - Used for building a dynamic and interactive UI that allows users to manage their tasks efficiently.
- **Axios** - Handles API requests to fetch, update, and delete tasks from the backend.
- **Socket.io-client** - Enables real-time task updates, ensuring multiple users see changes instantly.
- **TailwindCSS** - Provides a responsive and modern design for an intuitive user experience.
- **React-dnd** - Implements drag-and-drop functionality for seamless task reordering.
- **React Hot Toast** - Displays instant notifications for actions like task creation, updates, or errors.
- **React Icons** - Enhances the UI with visually appealing icons for better usability.

### Backend

- **Express.js** - Manages server-side logic, handles API requests, and connects with the database.
- **Socket.io** - Enables real-time updates, allowing instant task synchronization between users.
- **MongoDB** - Stores and organizes task data efficiently, ensuring scalability and flexibility.

## Let's Run It on Your Machine

Clone the project:

```bash
git clone https://github.com/jubayerahmed46/Taskeep-client
```

Change directory to **Taskeep-client**:

```bash
cd Taskeep-client
```

Install dependencies:

```bash
npm install
```

Make sure to set up the **.env** file and include important keys.

Now attach the backend from: [Taskeep Server](https://github.com/jubayerahmed46/Taskeep-server)

Then, run the command:

```bash
npm run dev
```
