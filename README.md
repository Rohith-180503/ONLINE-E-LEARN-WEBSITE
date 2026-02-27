# Online Learning Website – Full Project Explanation

## 1. Overview of the Project

This project is an Online Learning Platform built using React. Users can view courses, enroll in them, and see the enrolled courses in a cart panel. It demonstrates modern React concepts such as useState, component-based architecture, props, and conditional rendering. The UI is built with CSS Flexbox and Grid for responsive layout and has hover effects and animations.

### Main Features

- Course display with images, titles, instructor names, and prices  
- Cart panel showing enrolled courses, total price, and ability to remove courses  
- Dynamic updating of cart and buttons using React state  
- Responsive design for desktop and mobile  
- Testing with Vitest and React Testing Library  

---

## 2. index.html

This is the main HTML file. In React, we usually only have one HTML file because React dynamically renders the UI.

### Key Points

- `<div id="root"></div>`: Placeholder for React app  
- `<script type="module">`: Loads the main JSX entry point as a module  
- Meta tags ensure correct character encoding and responsive layout  
- Title is displayed on the browser tab  

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>online-learning-website</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 3. fakeData.js

This file contains mock data representing courses. It's like a fake database.

Each course is an object with:

- id  
- title  
- instructor  
- price  
- img  

Images are hosted online via URLs to display logos.

The array is exported using `export default` to be imported into other components. Using a separate file allows easier maintenance and scalability.

```javascript
const fakeData = [
  {
    id: 1,
    title: "Complete Linux Training",
    instructor: "Jason Cannon",
    price: 49.99,
    img: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/linux.png"
  },
  {
    id: 2,
    title: "Modern JavaScript from Scratch",
    instructor: "Jonas Schmedtmann",
    price: 39.99,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    id: 3,
    title: "HTML & CSS Bootcamp",
    instructor: "Colt Steele",
    price: 29.99,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  }
];

export default fakeData;
```

---

## 4. Course.jsx

This component renders a single course card.

### Key Points

- Receives `course`, `addToCart`, and `cart` as props from parent  
- Uses destructuring to extract course details  
- Checks if the course is already in the cart with `some()`  
- Button text and disabled state are conditional based on enrollment  
- Image, title, instructor, and price are displayed using JSX  
- Hover effect and styling come from CSS classes  

```javascript
const Course = ({ course, addToCart, cart }) => {
  const { title, instructor, price, img } = course;
  const isEnrolled = cart.some(item => item.id === course.id);

  return (
    <div className="course-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>Instructor: {instructor}</p>
      <p>${price}</p>
      <button onClick={() => addToCart(course)} disabled={isEnrolled}>
        {isEnrolled ? "Enrolled" : "Enroll"}
      </button>
    </div>
  );
};

export default Course;
```

---

## 5. Cart.jsx

This component displays the enrolled courses and total price.

### Key Points

- Calculates total using `reduce()`  
- Displays each enrolled course with a remove button  
- `removeFromCart` filters out the course by id  
- Updates automatically when the cart state changes  
- CSS dark theme with contrast for readability  

```javascript
const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, course) => sum + course.price, 0);

  return (
    <div className="cart-panel">
      <h2>CART</h2>
      <hr />
      <h5>Enrolled Courses: {cart.length}</h5>

      {cart.map(course => (
        <div key={course.id} className="course-item">
          <span>{course.title}</span>
          <span>
            ${course.price}
            <button
              onClick={() => removeFromCart(course.id)}
              style={{ marginLeft: "8px" }}
            >
              ❌
            </button>
          </span>
        </div>
      ))}

      <hr />
      <h5>Total: ${total.toFixed(2)}</h5>
    </div>
  );
};

export default Cart;
```

---

## 6. CourseInfo.jsx

Main component combining course cards and cart panel.

### useState

```javascript
const [cart, setCart] = useState([]);
```

### Functions

- `addToCart`: Adds course if not already enrolled  
- `removeFromCart`: Removes course from cart using `filter()`  

```javascript
import { useState } from "react";
import fakeData from "../../fakeData/fakeData";
import Course from "../Course/Course";
import Cart from "../Cart/Cart";

const CourseInfo = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (course) => {
    if (!cart.find(item => item.id === course.id))
      setCart([...cart, course]);
  };

  const removeFromCart = (id) =>
    setCart(cart.filter(item => item.id !== id));

  return (
    <div className="row p-4">
      <div className="col-md-4">
        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>

      <div className="col-md-8">
        <div className="course-grid">
          {fakeData.map(course => (
            <Course
              key={course.id}
              course={course}
              addToCart={addToCart}
              cart={cart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
```

---

## 7. App.jsx

The root component of the application.

- Renders the top header with logo and title  
- Renders CourseInfo to show courses and cart  
- CSS classes used for spacing, layout, and styling  

```javascript
import "./App.css";
import CourseInfo from "./Components/CourseInfo/CourseInfo";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="container-fluid">
      <div className="text-center bg-info p-3">
        <img src={logo} alt="logo" className="logo" />
        <h2>Online Learning Platform</h2>
      </div>
      <CourseInfo />
    </div>
  );
}

export default App;
```

---

## 8. main.jsx

Entry point for rendering React app to the DOM.

- `createRoot(document.getElementById("root"))`: Mounts React app into root div  
- `StrictMode`: Helps detect potential issues in development  
- Imports global CSS for styling  

```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 9. CSS Explanation (App.css & index.css)

The CSS styles the layout and appearance of the entire app:

- Global body styles: font, color, background, padding  
- Logo: hover shadow effect and optional spin animation  
- Course card: shadow, hover animation, rounded corners, spacing  
- Buttons: background, hover color, padding, rounded corners, disabled state  
- Cart panel: dark background, white text, spacing between items, border-radius  
- Responsive grid layout for courses using flex-wrap and gap  
- Media queries for light/dark mode using `prefers-color-scheme`  

---

## 10. Testing (Vitest + React Testing Library)

- Ensures the CART panel renders correctly  
- Ensures at least one course is displayed  
- Ensures Enroll buttons are rendered and clickable  
- Testing provides confidence that UI and state updates work correctly  

---

## 11. Key Concepts and Best Practices

### Component-based Architecture
Each UI element is modular and reusable.

### React Props
Pass data/functions from parent to child.

### useState
Manages dynamic state and triggers re-render on update.

### Array Methods
- `map()` – Render a list of components  
- `some()` – Check if an item exists  
- `reduce()` – Calculate total price  
- `filter()` – Remove item from array  

### Conditional Rendering
Dynamically change button text and disable it if already enrolled.

### CSS Flexbox & Grid
Responsive layouts, card alignment, spacing.

### Event Handling
`onClick` for adding/removing courses.

### Testing
Ensures app functions correctly under different scenarios.

### Code Maintainability
Separate files for data, components, and CSS makes the app modular and easy to update.

### Accessibility
Alt text for images and accessible buttons for screen readers.

---

## Future Improvements

- Add search  
- Add filters and sorting  
- Add login and user authentication  
- Backend integration  
- Database storage  
- Payment gateway integration  

---

This project demonstrates scalable, maintainable, and responsive frontend development using modern React best practices.
