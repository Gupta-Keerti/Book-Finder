# 📚 Book Finder App

A modern React-based web application that allows users to search for books using the Open Library API. The app displays detailed information about books including title, author, publication year, ratings, and more — all within a clean, responsive UI.


🌐 **[Live Demo](https://your-app-url.vercel.app)** | 📂 **[View Code](https://github.com/Gupta-Keerti/Book-Finder)**

---

## 🚀 Features

### 🔍 **Multi-Type Search**
Search for books by:
- 📖 **Title** - Find books by their name
- ✍️ **Author** - Discover works by your favorite authors
- 🔢 **ISBN** - Look up specific editions (ISBN-10 or ISBN-13)

### 📘 **Interactive Book Details Modal**
Click any book to view:
- Complete book information
- Author details
- Publication year
- Available editions
- Publisher information

### ⭐ **Smart Sorting Options**
Sort your search results by:
- 📊 Popularity/Ratings
- 🔤 Alphabetical (Title)
- 📅 Publication Date

### 📄 **Smooth Pagination**
Navigate through large result sets with an intuitive pagination system that loads results efficiently.

### ⚡ **Performance Optimized**
- Built with **Vite** for lightning-fast development and build times
- Optimized API calls with debouncing
- Lazy loading for better performance
- Responsive design for all screen sizes

### 🎨 **Modern UI/UX**
- Clean, minimal design with **Tailwind CSS**
- Beautiful icons from **Lucide React**
- Mobile-first responsive layout
- Smooth animations and transitions

---

## 🛠️ Tech Stack

| Category            | Technologies                          |
| ------------------- | ------------------------------------- |
| **Frontend**        | React 18, Vite, JavaScript (ES6+)    |
| **Styling**         | Tailwind CSS 3.x                      |
| **Icons**           | Lucide React                          |
| **API**             | Open Library API (Free, No Auth)      |
| **Version Control** | Git & GitHub                          |
| **Package Manager** | npm                                   |

---

## 📁 Project Structure

```
book-finder/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── BookCard.jsx          # Individual book card component
│   │   ├── BookDetailModal.jsx   # Modal for detailed book info
│   │   ├── BookList.jsx          # Grid layout for books
│   │   ├── Loader.jsx            # Loading spinner component
│   │   ├── NoResults.jsx         # Empty state component
│   │   ├── Pagination.jsx        # Pagination controls
│   │   ├── SearchBar.jsx         # Search input with filters
│   │   └── SortMenu.jsx          # Sorting dropdown
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # Component styles
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles & Tailwind
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

```bash
# 1️⃣ Clone this repository
git clone https://github.com/Gupta-Keerti/Book-Finder.git

# 2️⃣ Navigate into the project folder
cd Book-Finder

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev or npm start

# 5️⃣ Open your browser and visit
# http://localhost:5173
```

### Build for Production

```bash
# Create optimized production build
npm run build  

# Preview production build locally
npm run preview
```

---

## 🌐 API Integration

This project uses the **[Open Library API](https://openlibrary.org/developers/api)** for fetching book data.

### 🔐 No API Key Required!
The Open Library API is completely free and doesn't require authentication.

### Example API Endpoints:

**Search by Title:**
```
https://openlibrary.org/search.json?title=harry+potter
```

**Search by Author:**
```
https://openlibrary.org/search.json?author=j+k+rowling
```

**Search by ISBN:**
```
https://openlibrary.org/search.json?isbn=9780439708180
```

### Rate Limits
- Free tier allows reasonable usage
- No strict rate limits for personal/educational projects

---

## 📦 Deployment

Deploy your app easily to these platforms:

### **Vercel** (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

### **Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### **Other Options**
- 🎯 [GitHub Pages](https://pages.github.com/) (with gh-pages package)
- 📦 [CodeSandbox](https://codesandbox.io/)
- ☁️ [Railway](https://railway.app/)

---

## 🔮 Future Enhancements

- [ ] Add favorites/bookmarks feature with local storage
- [ ] Implement advanced filters (genre, language, year range)
- [ ] Add book cover image fallback for missing covers
- [ ] Dark mode toggle
- [ ] Reading list/wishlist functionality
- [ ] Book comparison feature
- [ ] Export search results to CSV/PDF
- [ ] Social sharing capabilities

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to Contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- Some older books may not have complete metadata
- Cover images might be missing for certain editions
- API response times may vary based on Open Library server load

If you encounter any issues, please [open an issue](https://github.com/Gupta-Keerti/Book-Finder/issues) on GitHub.

---

## 👨‍💻 Author

**Keerti Gupta**  
🌐 [LinkedIn](https://www.linkedin.com/in/kirtig10/) | [GitHub](https://github.com/Gupta-Keerti)

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify it for your own learning or projects.

See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the free books API
- [Lucide](https://lucide.dev/) for beautiful open-source icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All contributors and supporters of this project

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on [GitHub](https://github.com/Gupta-Keerti/Book-Finder)!

---
