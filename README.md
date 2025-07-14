# 🧾 Invoice Book – React + Vite Web App

**Invoice Book** is a lightweight, responsive web application built with **React** and **Vite**. It allows users to generate professional invoices and store user data temporarily using the browser's **Session Storage**.

---

## ✨ Features

- 🚀 Built with React + Vite for fast performance
- 📋 Generate and manage invoices on the fly
- 🗃️ Uses browser's Session Storage to temporarily store user data
- 💻 Works seamlessly on modern web browsers

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/invoice-book.git
cd invoice-book
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Make a copy of `.env.sample` and rename it to `.env`. Update the values as needed.
```bash
cp .env.sample .env
```

### 4. Run the App Locally
```bash
npm run dev
```
The app will start on `http://localhost:5173` (or the next available port).

---

## 📦 Build for Production

```bash
npm run build
```
This will create an optimized production build in the `dist/` directory.

---

## 🔐 Notes on Storage

- User data is stored temporarily using the browser's **Session Storage**
- Data will persist only for the current browser session
- For longer-term storage, consider integrating a backend or persistent DB

---

## 📄 License

This project is licensed under the MIT License.
