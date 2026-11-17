# MMI3 - Chat App

A real-time collaborative chat application built for IUT Champs-sur-Marne's MMI 3 students.

# Architecture
The project is splitted into these 2 directories :

client/ - React frontend application
server/ - Node + Socket.IO backend server
types/ - Common types for client & server

# Start the application
Terminal 1 - Start Server:

cd server
npm run start
Server now runs on http://localhost:3000 (or any port you defined)

Terminal 2 - Start Client:

cd client
npm run dev
Client now runs on http://localhost:5173 (or any port you defined)