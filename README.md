# 🎬 CineTrack

A premium, responsive movie discovery application built with React, Vite, and Tailwind CSS. This project provides users with a seamless cinematic experience to explore the world of entertainment.

---

## ✨ Features

* **Smart Search**: Find movies and TV shows instantly by keyword (e.g., "Interstellar", "Inception").
* **Detailed Movie Views**: Access plot summaries, release dates, user ratings, and genre tags.
* **Watchlist Management**: Keep track of movies you want to see using a clean, intuitive interface.
* **Responsive Design**: Optimized for all devices, from mobile phones to desktops.
* **Error Handling**: Custom 404 page for missing recipes or broken links.

---

## 🛠️ Tech Stack

* **Framework**: React 18 (Vite)
* **Styling**: Tailwind CSS (Custom themes)
* **Icons**: Lucide React
* **API**: TMDB API (The Movie Database)
* **Deployment**: GitHub Actions & GitHub Pages

---

## 🚀 Installation & Setup

### 1. Clone the Project
```bash
git clone https://github.com/Uz0r0/CineTrack.git
cd CineTrack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root directory and add your key:
```bash
VITE_TMDB_API_KEY=your_key_here
```

### 4. Run the App 
```bash
npm run dev
```

---

## 📂 Architecture & Design
* **Services**: Centralized API logic to ensure clean data fetching and maintainable code.
* **Routing**: Configured with basename to ensure stable navigation across GitHub Pages sub-directories.
* **Components**: Modular structure with reusable UI elements like MovieCards and SearchBars for scalability.

---

© 2026 Cook's Delight by **Uz0r0**.
