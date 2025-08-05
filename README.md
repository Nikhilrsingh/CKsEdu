# 🎓 CKsEdu – Smart University Collaboration Platform

[![GirlScript Summer of Code](https://img.shields.io/badge/GSSoC-2025-orange.svg)](https://gssoc.girlscript.tech/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

**CKsEdu** is a modern digital platform that connects students and faculty in universities through real-time mentoring, AI-powered academic tools, and collaborative learning features. Built to simplify university life, it enables seamless interaction, resource sharing, and personalized academic support.

---

## 🚀 Features

### 👨‍🎓 For Students

- 📞 1:1 Video Mentoring with Professors (live & scheduled)
- 🤖 AI Assist: Smart scheduling, note-taking, and grading support
- 💬 Student Chat & Group Collaboration
- 📚 E-Library & Study Resources
- 🧠 Mental Wellness & Counseling
- 🏆 Quizzes, Leaderboards, and Achievements
- 📅 Event Calendar & Announcements
- 📈 Academic Progress Dashboard

### 👩‍🏫 For Faculty

- 📁 Smart Document Organizer
- 📊 Student Analytics Dashboard
- 🤖 AI Agent Integration:
  - Auto-generate quizzes & summaries
  - Detect at-risk students
  - Suggest improvements based on data
- ⚡ Fast Workflow Tools: AI-based grading, smart scheduling

---

## 🛠️ Tech Stack

### 💻 Frontend

![React](https://img.shields.io/badge/React-JS%20%26%20TS-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Fast%20Builds-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Utility%20First-38B2AC?logo=tailwindcss&logoColor=white)

### 🔙 Backend

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Microservice-white?logo=flask&logoColor=black)

### 🗄️ Database & Storage

![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Storage-3448C5?logo=cloudinary&logoColor=white)

### 🚀 Deployment

![AWS](https://img.shields.io/badge/AWS-Cloud-232F3E?logo=amazonaws&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Hosting-000000?logo=vercel&logoColor=white)

---

## 📂 Project Structure

### 📁 Backend-Node/

```
Backend-Node/
├── Public/
├── src/
│   ├── Controllers/
│   ├── db/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   ├── Utils/
│   ├── app.js
│   ├── Constants.js
│   └── index.js
├── .env
├── .env.sample
├── .gitignore
├── package.json
├── vercel.json
```

---

### 📁 Frontend/

```
Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── Config/
│   ├── JSX/
│   │   ├── Components/
│   │   ├── Context/
│   │   └── Pages/
│   ├── TSX/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── .env
├── .gitignore
├── vite.config.js
├── tsconfig.json
├── package.json
├── vercel.json
```

---

## 💻 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/KrishChothani/CKsEdu.git
cd CKsEdu

# 2. Set up environment variables
# Add .env files in both /Backend and /Frontend directories as required

# 3. Install dependencies
cd Backend
npm install

cd ../Frontend
npm install

# 4. Run the frontend and backend (in separate terminals)
npm run dev
```

---

## 🌐 Live Demo

🔗 [https://cksedu.vercel.app](https://cksedu.vercel.app)

---

## 🤝 Contributing

We love contributions from the community! Whether you're a beginner or an experienced developer, your input is valuable. Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Stay Connected

Follow this repository for updates, features, and contributor announcements.
