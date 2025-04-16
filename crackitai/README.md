# 🚀 CrackIt AI – Your AI-Powered Interview Prep Partner

CrackIt AI is an advanced, full-stack web application built to revolutionize job interview preparation using AI voice agents. From realistic mock interviews to instant AI feedback and a modern user dashboard — everything is crafted to help job seekers gain confidence and sharpen their skills.
---

#Live Link:- [https://crackitai.vercel.app/](https://crackitai.vercel.app/)

#Home Page
![image](https://github.com/user-attachments/assets/0841fda5-2d78-4641-9bcf-8827cadd22ca)

#Interview Page
![image](https://github.com/user-attachments/assets/61bc3af3-c404-476d-82a4-06866e265dc1)

#Feedback Page
![image](https://github.com/user-attachments/assets/0381b399-8771-4db6-9ef1-19c445f12cd3)



## 📌 Table of Contents

- [🌟 Introduction](#-introduction)  
- [🛠 Tech Stack](#-tech-stack)  
- [✨ Features](#-features)  
- [⚡ Quick Start](#-quick-start)  

---

## 🌟 Introduction

CrackIt AI is a modern interview preparation platform that combines the power of **Next.js**, **Firebase**, **TailwindCSS**, and **Vapi AI Voice agents** to create a truly interactive and intelligent user experience. It leverages **Google Gemini** to provide smart, AI-driven interview questions and real-time conversational feedback.

Whether you're just starting out or preparing for your next big opportunity, CrackIt AI helps you simulate real interview environments from the comfort of your browser.

---

## 🛠 Tech Stack

Here's a breakdown of the technologies used:

- **Next.js** – Full-stack framework for the frontend and backend  
- **Tailwind CSS** – Utility-first CSS for rapid UI development  
- **Firebase** – Authentication and real-time database  
- **Vapi AI** – Conversational AI voice agents  
- **Google Gemini** – AI for generating interview questions and feedback  
- **shadcn/ui** – Component library for clean, accessible UI  
- **Zod** – Schema validation

---

## ✨ Features

- 🔐 **Authentication** – Sign up/sign in using Firebase Auth with email & password  
- 🎤 **AI Voice Interviews** – Talk to AI voice agents that simulate interview scenarios  
- 💬 **Instant Feedback** – Receive detailed AI-generated feedback after each session  
- 🧠 **Smart Question Generation** – Gemini AI creates custom interview questions tailored to your role  
- 🖥 **Interview Dashboard** – View transcripts, track progress, and revisit interviews  
- 📱 **Fully Responsive** – Works seamlessly on desktop, tablet, and mobile  
- ♻️ **Clean Code Architecture** – Designed for reusability and scalability

---

## ⚡ Quick Start

### Prerequisites

Make sure these are installed:

- Git  
- Node.js  
- npm  

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/adrianhajdin/ai_mock_interviews.git
   cd ai_mock_interviews
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```
3.**Configure Environment Variables:**

Create a .env.local file in the root directory and add the following:
```bash
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
GOOGLE_GENERATIVE_AI_API_KEY=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

4.**Run the App Locally:**
```bash
npm run dev
```

5.**View the Project:**
- Open [ http://localhost:3000](http://localhost:3000) in your browser.
