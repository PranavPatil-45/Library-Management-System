
 📚 Library Management System  

![React](https://img.shields.io/badge/React-18.0.0-blue?logo=react)  
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?logo=tailwindcss)  
![License](https://img.shields.io/badge/License-MIT-green)  
![Contributions](https://img.shields.io/badge/Contributions-Welcome-orange)  

A complete Library Management System built with ⚛️ React, 🎨 Tailwind CSS, and 📂 Redux Toolkit + JSON Server.  
This project helps librarians manage members, books, loans, and fines** with an easy-to-use modern UI.  


 ✨ Features  

- 👥 **Member Management** – Add, edit, view, and delete members.  
- 📚 **Book Management** – Track books with title, author, genre, ISBN, and availability.  
- 🔄 **Loan System** – Borrow and return books with due date management.  
- ⏳ **Overdue Tracking** – Auto-detect late returns and calculate fines.  
- 💰 **Fine System** – Damage fine (₹50), late fine (₹20/day), with history & collection.  
- 📊 **Reports** – Member activity, borrowed history, and fine reports.  
- 🎨 **Modern UI** – Responsive design built with **Tailwind CSS**.  



## 🛠️ Tech Stack  

| 🖥️ Frontend | ⚡ State Management | 🎨 Styling | 🗄️ Backend |
|-------------|---------------------|------------|-------------|
| React ⚛️    | Redux Toolkit 🔄    | Tailwind CSS 🎨 | JSON Server 🗃️ |


## 📂 Project Structure  


src/
 ├── components/      # UI components (Navbar, MemberDescription, FineReport, etc.)
 ├── slices/          # Redux slices (members, books, loans, fines)
 ├── pages/           # Pages (Dashboard, Reports, etc.)
 ├── App.js           # Main app with routes
 └── index.js         # Entry point




## ⚡ Installation & Setup

1. Clone the repo 📥

   
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system
   

2. Install dependencies 📦

   ```bash
   npm install
   ```

3. Run JSON Server (Mock API) 🗄️

   ```bash
  json-server --watch db.json 
   ```

4. Start the React app 🚀

  
   npm run dev
   

App will run at 👉 `http://localhost:3000`



## 📸 Screenshots

### 🏠 Dashboard

<img width="1873" height="907" alt="dashboard" src="https://github.com/user-attachments/assets/42d484e3-2391-4a1b-b38d-263876c26f45" />


👤 Member Details


<img width="1875" height="921" alt="members" src="https://github.com/user-attachments/assets/e2bccf41-fb20-4f85-910d-91d70cd7c9d5" />

#Books
<img width="1877" height="917" alt="bookks" src="https://github.com/user-attachments/assets/433b7382-ea68-4799-84f9-105d0e4a36e5" />


 🚀 Future Enhancements

* 🔐 **Authentication & Roles** (Admin/Librarian/Member)
* ☁️ **Real Database Integration** (MongoDB/PostgreSQL)
* 📱 **Mobile Version** (React Native)


 🤝 Contributing

Contributions are welcome! 🎉

1. 🍴 Fork this repo
2. 🌿 Create feature branch → `git checkout -b feature/new-feature`
3. 💾 Commit changes → `git commit -m 'Add new feature'`
4. 📤 Push branch → `git push origin feature/new-feature`
5. 🔃 Open a Pull Request

---

## 📝 License

📄 Licensed under the **MIT License** – feel free to use and improve!

---

## 👨‍💻 Author

* ✨ Pranav Patil
* 💼 Swapnil Patil
* 🐙 Neha Patil

---

⭐ If you like this project, don’t forget to **star the repo**!


Do you want me to also add a **demo GIF / video preview** section 🎥 so your teacher/reviewers can see the app flow quickly without running it?
```
