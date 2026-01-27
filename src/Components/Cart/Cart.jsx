

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
