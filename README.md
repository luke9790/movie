# 🎬 MovieHub - The Ultimate Movie & TV Show Explorer

Welcome to **MovieHub**, a web application that allows users to explore **movies, TV shows, and actors** using **The Movie Database (TMDb) API**. The platform provides **high-quality content discovery** with smart filtering and an intuitive UI.

🔗 **Live Demo**: [MovieHub](https://movie-gamma-ten.vercel.app/)

---

## 📌 Features

✅ **Home Page**: Displays trending **movies, TV shows, and actors** with interactive carousels.  
✅ **Movies Section**: Browse **popular, top-rated, upcoming, and now-playing movies**.  
✅ **TV Shows Section**: Discover **popular, top-rated, and currently airing TV shows**.  
✅ **Actors Section**: View **trending actors** and explore their filmography.  
✅ **Detailed Pages**: Each movie, TV show, and actor has a dedicated detail page with **cast, ratings, and additional info**.  
✅ **Smart Filtering**: Only **high-quality** content is shown, **excluding reality TV, talk shows, and award ceremonies**.  
✅ **Seamless Navigation**: Custom-built **infinite-scrolling carousels** for smooth browsing.  
✅ **Responsive Design**: Perfect for all devices.  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/moviehub.git
cd moviehub
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup API Keys
To run the project locally, create a file at `src/app/environment/environment.ts` with the following content:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://api.themoviedb.org/3',
  apiKey: 'YOUR_TMDB_API_KEY_HERE'
};
```

🔑 Replace `YOUR_TMDB_API_KEY_HERE` with your TMDb API Key.

🛑 DO NOT commit this file to GitHub! It's already ignored via `.gitignore`.

### 4️⃣ Run Locally
```bash
ng serve
```
Your app will be available at `http://localhost:4200/`.

---

## 🏗 Deployment

This project is deployed using Vercel. The build process automatically injects environment variables.

---

## 🎨 UI & Carousel System

The app features a Netflix-style UI, with a clean dark theme and smooth animations.

### 🔄 Carousel Behavior
- **Looping Mechanism**: Ensures infinite scrolling, dynamically adjusting for different screen sizes.
- **Hover Effects**: Enlarges items slightly without cutting the layout.
- **Arrow Navigation**: Custom left & right buttons for manual scrolling.
- **Optimized for All Screens**: Uses TailwindCSS for responsive design.

---

## 🏆 Smart Filtering

- Filters out reality TV, talk shows, and award shows.
- Prioritizes English & Italian content for a better experience.
- Ranks results by popularity and rating to highlight the best options.

---

## 🛠 Technologies Used

- Angular (v19)
- TypeScript
- TMDb API
- TailwindCSS
- Vercel (Deployment)
- RxJS (Reactive Programming)
