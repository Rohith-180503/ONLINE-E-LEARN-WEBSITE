<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Online Learning Website - Explanation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background-color: #f9f9f9;
      color: #333;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    pre {
      background-color: #2d2d2d;
      color: #f8f8f2;
      padding: 10px;
      overflow-x: auto;
      border-radius: 6px;
    }
    code {
      font-family: 'Courier New', monospace;
      color: #e74c3c;
    }
    section {
      margin-bottom: 40px;
    }
    ul {
      margin-left: 20px;
    }
  </style>
</head>
<body>
  <h1>Online Learning Website - Full Code Explanation</h1>

  <section>
    <h2>1. index.html</h2>
    <p>This is the main HTML file that loads the React application. It contains:</p>
    <ul>
      <li><code>&lt;div id="root"&gt;&lt;/div&gt;</code>: This is the root element where React will render the application using <code>ReactDOM.createRoot</code>.</li>
      <li><code>&lt;script type="module" src="/src/main.jsx"&gt;&lt;/script&gt;</code>: Loads the main React entry file.</li>
      <li>Meta tags for charset, viewport, and page title.</li>
    </ul>
    <pre>
&lt;!doctype html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;link rel="icon" type="image/svg+xml" href="/vite.svg" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;online-learning-website&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="root"&gt;&lt;/div&gt;
    &lt;script type="module" src="/src/main.jsx"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
    </pre>
  </section>

  <section>
    <h2>2. fakeData.js</h2>
    <p>This file contains all the course data used in the app. Each course is represented as an object with:</p>
    <ul>
      <li><code>id</code>: Unique identifier for the course.</li>
      <li><code>title</code>: Name of the course.</li>
      <li><code>instructor</code>: Instructor's name.</li>
      <li><code>price</code>: Cost of the course.</li>
      <li><code>img</code>: URL for the course image/logo.</li>
    </ul>
    <p>The data is exported as default so it can be imported anywhere in the React project.</p>
    <pre>
const fakeData = [
  { id: 1, title: "Complete Linux Training", instructor: "Jason Cannon", price: 49.99, img: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/linux.png" },
  { id: 2, title: "Modern JavaScript from Scratch", instructor: "Jonas Schmedtmann", price: 39.99, img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  ...
];

export default fakeData;
    </pre>
  </section>

  <section>
    <h2>3. Course.jsx</h2>
    <p>This React component represents a single course card. Concepts used:</p>
    <ul>
      <li><code>props</code>: <code>course</code>, <code>addToCart</code>, <code>cart</code> are passed from parent.</li>
      <li><code>Destructuring</code>: Extracts <code>title</code>, <code>instructor</code>, <code>price</code>, <code>img</code> from <code>course</code>.</li>
      <li><code>isEnrolled</code>: Checks if this course is already in the cart.</li>
      <li><code>button disabled={isEnrolled}</code>: Prevents adding duplicate courses.</li>
    </ul>
    <pre>
const Course = ({ course, addToCart, cart }) =&gt; {
  const { title, instructor, price, img } = course;
  const isEnrolled = cart.some(item =&gt; item.id === course.id);

  return (
    &lt;div className="course-card"&gt;
      &lt;img src={img} alt={title} /&gt;
      &lt;h3&gt;{title}&lt;/h3&gt;
      &lt;p&gt;Instructor: {instructor}&lt;/p&gt;
      &lt;p&gt;${price}&lt;/p&gt;
      &lt;button onClick={() =&gt; addToCart(course)} disabled={isEnrolled}&gt;
        {isEnrolled ? "Enrolled" : "Enroll"}
      &lt;/button&gt;
    &lt;/div&gt;
  );
};

export default Course;
    </pre>
  </section>

  <section>
    <h2>4. Cart.jsx</h2>
    <p>This component displays the cart panel. Concepts:</p>
    <ul>
      <li>Calculate total with <code>reduce()</code>.</li>
      <li>Map through <code>cart</code> array to display each enrolled course.</li>
      <li><code>removeFromCart</code> function removes a course by ID.</li>
      <li>Dynamic total and enrolled course count displayed.</li>
    </ul>
    <pre>
const Cart = ({ cart, removeFromCart }) =&gt; {
  const total = cart.reduce((sum, course) =&gt; sum + course.price, 0);

  return (
    &lt;div className="cart-panel"&gt;
      &lt;h2&gt;CART&lt;/h2&gt;
      &lt;hr /&gt;
      &lt;h5&gt;Enrolled Courses: {cart.length}&lt;/h5&gt;

      {cart.map(course =&gt; (
        &lt;div key={course.id} className="course-item"&gt;
          &lt;span&gt;{course.title}&lt;/span&gt;
          &lt;span&gt;
            ${course.price}
            &lt;button onClick={() =&gt; removeFromCart(course.id)} style={{ marginLeft: "8px" }}&gt;❌&lt;/button&gt;
          &lt;/span&gt;
        &lt;/div&gt;
      ))}

      &lt;hr /&gt;
      &lt;h5&gt;Total: ${total.toFixed(2)}&lt;/h5&gt;
    &lt;/div&gt;
  );
};

export default Cart;
    </pre>
  </section>

  <section>
    <h2>5. CourseInfo.jsx</h2>
    <p>This component combines <code>Course</code> and <code>Cart</code>. Concepts:</p>
    <ul>
      <li><code>useState</code>: Manages the cart array.</li>
      <li><code>addToCart</code> and <code>removeFromCart</code>: Update state immutably.</li>
      <li>Passes <code>props</code> to child components.</li>
      <li>Flex layout using CSS classes for cart (left) and courses (right).</li>
    </ul>
    <pre>
import { useState } from "react";
import fakeData from "../../fakeData/fakeData";
import Course from "../Course/Course";
import Cart from "../Cart/Cart";

const CourseInfo = () =&gt; {
  const [cart, setCart] = useState([]);

  const addToCart = (course) =&gt; {
    if (!cart.find(item =&gt; item.id === course.id)) setCart([...cart, course]);
  };

  const removeFromCart = (id) =&gt; setCart(cart.filter(item =&gt; item.id !== id));

  return (
    &lt;div className="row p-4"&gt;
      &lt;div className="col-md-4"&gt;
        &lt;Cart cart={cart} removeFromCart={removeFromCart} /&gt;
      &lt;/div&gt;
      &lt;div className="col-md-8"&gt;
        &lt;div className="course-grid"&gt;
          {fakeData.map(course =&gt; (
            &lt;Course key={course.id} course={course} addToCart={addToCart} cart={cart} /&gt;
          ))}
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

export default CourseInfo;
    </pre>
  </section>

  <section>
    <h2>6. App.jsx</h2>
    <p>Main application wrapper. Concepts:</p>
    <ul>
      <li>Imports <code>CourseInfo</code> and logo.</li>
      <li>Displays a top header section with the logo.</li>
      <li>Renders <code>CourseInfo</code> to show courses and cart.</li>
    </ul>
    <pre>
import "./App.css";
import CourseInfo from "./Components/CourseInfo/CourseInfo";
import logo from "./assets/logo.png";

function App() {
  return (
    &lt;div className="container-fluid"&gt;
      &lt;div className="text-center bg-info p-3"&gt;
        &lt;img src={logo} alt="logo" className="logo" /&gt;
        &lt;h2&gt;Online Learning Platform&lt;/h2&gt;
      &lt;/div&gt;
      &lt;CourseInfo /&gt;
    &lt;/div&gt;
  );
}

export default App;
    </pre>
  </section>

  <section>
    <h2>7. index.jsx</h2>
    <p>Entry point for React rendering. Concepts:</p>
    <ul>
      <li><code>createRoot</code> and <code>root.render</code> mount the React app on <code>#root</code>.</li>
      <li><code>StrictMode</code> helps detect unsafe lifecycle methods and other warnings in development.</li>
    </ul>
    <pre>
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  &lt;React.StrictMode&gt;
    &lt;App /&gt;
  &lt;/React.StrictMode&gt;
);
    </pre>
  </section>

  <section>
    <h2>8. CSS (App.css & index.css)</h2>
    <p>CSS styles include:</p>
    <ul>
      <li>Responsive grid layout for course cards.</li>
      <li>Hover effects for buttons and cards.</li>
      <li>Cart panel styling (dark theme).</li>
      <li>Logo animations and styling.</li>
      <li>Media queries for light/dark mode support.</li>
      <li>Global font, colors, and spacing.</li>
    </ul>
  </section>

  <section>
    <h2>9. Testing (Vitest + React Testing Library)</h2>
    <p>Simple tests include:</p>
    <ul>
      <li>Checking if <code>CART</code> heading renders.</li>
      <li>Checking if at least one course is displayed.</li>
      <li>Checking if the Enroll button is rendered and clickable.</li>
    </ul>
  </section>

  <section>
    <h2>10. Key Concepts Used</h2>
    <ul>
      <li>React Components & Props</li>
      <li>State Management with <code>useState</code></li>
      <li>Conditional Rendering & Disabled Buttons</li>
      <li>Array Methods: <code>map</code>, <code>some</code>, <code>reduce</code>, <code>filter</code></li>
      <li>CSS Flexbox & Grid for layout</li>
      <li>Responsive Design</li>
      <li>Testing with Vitest & React Testing Library</li>
      <li>ES6 Features: Destructuring, Arrow Functions, Template Literals</li>
    </ul>
  </section>

</body>
</html>
