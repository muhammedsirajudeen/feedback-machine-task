
---

# 🌐 Client Feedback Portal – MERN Stack Web App

A full-stack feedback portal built using the MERN stack (MongoDB, Express.js, React, Node.js) where clients can submit feedback and admins can manage, filter, and respond with optional AI-powered suggestions.

---

## 🚀 Features

### 👤 Client Features
- ✅ Login/Signup with JWT Authentication
- ✅ Submit feedback with:
  - Text
  - Star rating
  - Optional image upload
- ✅ Responsive UI with form validation

### 🛠️ Admin Panel
- ✅ View all submitted feedback
- ✅ Filter feedback by star rating
- ✅ Sort feedback by date
- ✅ Respond to feedback via comments
- ✅ (Bonus) AI-powered reply suggestions

---

## ⚙️ Backend

- 🔐 JWT-based user authentication
- 📝 Feedback API (Create, Read, Update, Comment)
- 📁 File upload support for image attachments
- 💾 MongoDB for storing users, feedback, and comments
- 🧪 Includes one basic unit test
- 🤖 AI-commented code for clarity

---

## 🧱 Tech Stack

- **Frontend**: React, Tailwind CSS, Context API or Redux (Optional)
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: Multer
- **AI Integration** (optional): OpenAI API or basic logic for suggested replies

---

## 🖥️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/client-feedback-portal.git
cd client-feedback-portal
```

---

### 2. Environment Variables

Create a `.env` file in both `client` and `server` directories:

#### `server/.env`

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-portal
JWT_SECRET=your_jwt_secret_key
AI_API_KEY=your_openai_api_key  # Optional
```

#### `client/.env`

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

### 3. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

---

### 4. Run the App

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
```

---

## 🧪 Testing

Basic unit tests are included in the backend:

```bash
cd server
npm test
```

---

## ✨ Optional Features

- 🌐 Use Redux or Context API for state management
- 🤖 Admin gets AI-powered suggested replies when responding to feedback (OpenAI GPT-4 or simple templates)

---

## 📁 Folder Structure

```
client/         # React frontend
server/         # Express + MongoDB backend
 └── routes/
 └── controllers/
 └── models/
 └── middleware/
 └── tests/
```

---

## 📸 Screenshots

> *(Add screenshots or screen recordings of the client and admin UI here)*

---

## 📄 License

MIT License © 2025 Muhammed Sirajudeen



---

