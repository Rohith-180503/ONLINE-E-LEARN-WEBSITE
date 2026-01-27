<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Online Learning Platform – Project Documentation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    :root {
      --primary: #0d6efd;
      --dark: #212529;
      --light: #f8f9fa;
      --gray: #6c757d;
      --border: #dee2e6;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
      line-height: 1.7;
      background: #ffffff;
      color: var(--dark);
    }

    header {
      background: var(--primary);
      color: white;
      padding: 2.5rem 1rem;
      text-align: center;
    }

    header h1 {
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
    }

    header p {
      max-width: 900px;
      margin: auto;
      font-size: 1.1rem;
      opacity: 0.95;
    }

    main {
      max-width: 1100px;
      margin: auto;
      padding: 2rem 1rem;
    }

    section {
      margin-bottom: 3rem;
    }

    h2 {
      border-bottom: 3px solid var(--primary);
      padding-bottom: 0.3rem;
      margin-bottom: 1rem;
      font-size: 1.8rem;
    }

    h3 {
      margin-top: 1.5rem;
      font-size: 1.3rem;
    }

    p {
      color: #333;
    }

    ul {
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    pre {
      background: #f4f6f8;
      border-left: 4px solid var(--primary);
      padding: 1rem;
      overflow-x: auto;
      font-size: 0.9rem;
    }

    code {
      color: #b02a37;
      font-family: Consolas, monospace;
    }

    .box {
      background: var(--light);
      border: 1px solid var(--border);
      padding: 1.2rem;
      border-radius: 6px;
      margin-top: 1rem;
    }

    footer {
      background: #f1f1f1;
      text-align: center;
      padding: 1.5rem;
      font-size: 0.95rem;
      color: var(--gray);
    }
  </style>
</head>

<body>

<header>
  <h1>🎓 Online Learning Platform</h1>
  <p>
    A professional-grade React + Redux Toolkit project demonstrating real-world
    frontend architecture, state management, and scalable UI design.
  </p>
</header>

<main>

  <section>
    <h2>📖 Project Overview</h2>
    <p>
      The Online Learning Platform is a fully functional frontend application that allows
      users to browse courses, enroll in them, manage a cart, search for courses,
      and complete a mock checkout process.
    </p>
    <p>
      This project is designed to reflect how a real production-level React application
      is structured and built, focusing on clean architecture and maintainability.
    </p>
  </section>

  <section>
    <h2>✨ Key Features</h2>
    <ul>
      <li>Course listing with images, instructors, and prices</li>
      <li>Enroll and remove courses from cart</li>
      <li>Prevention of duplicate enrollments</li>
      <li>Global state management using Redux Toolkit</li>
      <li>Real-time cart total calculation</li>
      <li>Persistent cart using localStorage</li>
      <li>Search and filter courses by title</li>
      <li>Checkout flow with cart clearing</li>
      <li>Clean, modular, reusable components</li>
    </ul>
  </section>

  <section>
    <h2>🛠 Tech Stack</h2>
    <div class="box">
      <h3>Frontend</h3>
      <ul>
        <li>React (Functional Components & Hooks)</li>
        <li>Redux Toolkit</li>
        <li>React Redux</li>
        <li>Bootstrap 4</li>
        <li>CSS3</li>
      </ul>

      <h3>Tooling</h3>
      <ul>
        <li>Vite / Create React App</li>
        <li>ESLint</li>
        <li>Git & GitHub</li>
      </ul>
    </div>
  </section>

  <section>
    <h2>📂 Folder Structure</h2>
    <pre>
src/
│
├── app/
│   └── store.js
│
├── features/
│   └── cart/
│       └── cartSlice.js
│
├── components/
│   ├── Cart/
│   ├── Course/
│   ├── CourseInfo/
│   ├── Search/
│   └── Checkout/
│
├── data/
│   └── fakeData.js
│
├── assets/
│   └── logo.png
│
├── App.jsx
├── index.jsx
└── index.css
    </pre>
  </section>

  <section>
    <h2>🧠 State Management (Redux Toolkit)</h2>
    <p>
      Redux Toolkit is used to manage global application state. The cart state is centralized,
      making it easy to access and update from any component without prop drilling.
    </p>

    <pre>
const exists = state.items.find(
  item => item.id === action.payload.id
);

if (!exists) {
  state.items.push(action.payload);
}
    </pre>
  </section>

  <section>
    <h2>🔍 Search & Filtering Logic</h2>
    <p>
      Course searching is implemented using controlled inputs and derived state.
      Filtering is case-insensitive and efficient.
    </p>

    <pre>
const filteredCourses = courses.filter(course =>
  course.title.toLowerCase()
    .includes(search.toLowerCase())
);
    </pre>
  </section>

  <section>
    <h2>🛒 Cart & Checkout Flow</h2>
    <ol>
      <li>User clicks Enroll</li>
      <li>Course is added to Redux store</li>
      <li>Cart updates immediately</li>
      <li>Data persists via localStorage</li>
      <li>User proceeds to checkout</li>
      <li>Mock payment clears cart</li>
    </ol>
  </section>

  <section>
    <h2>💾 Data Persistence</h2>
    <p>
      The cart is saved in localStorage to ensure data remains even after a page refresh.
    </p>

    <pre>
localStorage.setItem(
  "cart",
  JSON.stringify(state.items)
);
    </pre>
  </section>

  <section>
    <h2>▶ How to Run the Project</h2>
    <pre>
git clone https://github.com/your-username/online-learning-platform.git
cd online-learning-platform
npm install
npm run dev
    </pre>
  </section>

  <section>
    <h2>🧪 Testing Strategy</h2>
    <p>
      The project includes basic UI tests using React Testing Library and Jest-DOM to
      ensure components render correctly and user interactions are validated.
    </p>
  </section>

  <section>
    <h2>🚀 Future Enhancements</h2>
    <ul>
      <li>React Router integration</li>
      <li>User authentication</li>
      <li>Backend API integration</li>
      <li>Payment gateway support</li>
      <li>Admin dashboard</li>
      <li>Advanced filtering and sorting</li>
    </ul>
  </section>

  <section>
    <h2>👤 Author</h2>
    <p><strong>Rohith Nidumolu</strong></p>
    <p>
      Frontend Developer specializing in React, focused on building scalable,
      production-ready applications with clean architecture.
    </p>
  </section>

</main>

<footer>
  © 2026 Online Learning Platform — Project Documentation
</footer>

</body>
</html>
