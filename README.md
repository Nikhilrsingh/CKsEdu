# 🎓 CKsEdu – Smart University Collaboration Platform

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

**Frontend**: React (JavaScript & TypeScript), Vite, Tailwind CSS  
**Backend**: Node.js, Express.js, Flask  
**Database & Storage**: MongoDB, Cloudinary  
**Deployment**: AWS, Vercel

---

## 📂 Project Structure

### 📁 Backend/
```
Backend/
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
├── package.json
├── vercel.json
```

### 📁 Frontend/
```
Frontend/
├── public/
├── src/
│   ├── JSX/
│   │   ├── Components/
│   │   ├── Components-V1/
│   │   ├── context/
│   │   └── Pages/
│   ├── TSX/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
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

We welcome contributions from the open-source community!  
Please watch the repo for updates — contribution guidelines will be published soon.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Stay Connected

Follow this repository for updates, features, and contributor announcements.
