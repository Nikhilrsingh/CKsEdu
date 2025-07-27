# Contributing to CKsEdu

Thank you for your interest in contributing to CKsEdu! We welcome all contributors, especially beginners, as part of the GirlScript Summer of Code (GSSoC) initiative.

## 🛠️ Setting Up the Project Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Git](https://git-scm.com/)

### Steps

1. **Fork the Repository**
   - Click the "Fork" button at the top right of this repo.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/CKsEdu.git
   cd CKsEdu
   ```

3. **Install Dependencies**

   - **Backend:**
     ```bash
     cd Backend-Node
     npm install
     ```

   - **Frontend:**
     ```bash
     cd ../Frontend
     npm install
     ```

4. **Run the Project**

   - **Backend:**
     ```bash
     npm run dev
     ```

   - **Frontend:**
     ```bash
     npm run dev
     ```

5. **Open in Browser**
   - Visit `http://localhost:5173` (or as specified in the terminal) for the frontend.

---

## 📝 Creating Issues

- Check if your issue already exists in the [Issues](../../issues) tab.
- If not, open a new issue with a clear title and description.
- For feature requests, explain the use case and possible implementation ideas.

## 🔀 Submitting Pull Requests

1. **Create a Branch**
   - Use the following naming convention:
     ```
     feature/your-feature-name
     fix/short-description
     docs/update-readme
     ```
2. **Make Your Changes**
   - Write clear, concise code and comments.
   - Add or update tests if applicable.

3. **Commit Messages**
   - Use descriptive commit messages:
     ```
     feat: add user authentication
     fix: resolve login bug
     docs: update contributing guidelines
     ```

4. **Push and Create PR**
   ```bash
   git push origin your-branch-name
   ```
   - Go to your fork on GitHub and click "Compare & pull request".
   - Fill in the PR template and reference related issues.

---

## 🤗 Tips for First-Time Contributors

- Read the code and comments to understand the flow.
- Don’t hesitate to ask questions in issues or discussions.
- Be respectful and collaborative.

---

Happy contributing! 🎉 
