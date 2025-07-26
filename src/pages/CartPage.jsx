// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <div className='py-32 text-center text-xl'>Your cart is empty!</div>;
  }

  return (
    <div className='pt-24 px-6 pb-20 max-w-4xl mx-auto bg-[#fff9f0]'>
      <h1 className='text-3xl font-serif mb-6 text-center'>Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className='flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200'
        >
          {/* Image and Info */}
          <div className='flex items-center gap-4 w-full sm:w-auto'>
            <img
              src={item.img1}
              alt={item.name}
              className='w-20 h-20 object-cover rounded'
            />
            <div>
              <h2 className='font-semibold'>{item.name}</h2>
              <p className='text-sm text-gray-600'>₹{item.price}</p>
            </div>
          </div>

          {/* Quantity controls */}
          <div className='flex items-center gap-2'>
            <button
              onClick={() => decrementQuantity(item.id)}
              className='px-2 py-1 rounded bg-[#e6e6e6] hover:bg-[#d5d5d5]'
            >
              −
            </button>
            <span className='px-3 font-medium'>{item.quantity}</span>
            <button
              onClick={() => incrementQuantity(item.id)}
              className='px-2 py-1 rounded bg-[#e6e6e6] hover:bg-[#d5d5d5]'
            >
              +
            </button>
          </div>

          {/* Remove button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className='bg-red-600 text-white p-2 rounded-sm cursor-pointer transition-all hover:bg-red-700 text-sm'
          >
            Remove
          </button>
        </div>
      ))}

      {/* Total Price */}
      <div className='text-right mt-6 font-semibold text-lg'>
        Total: ₹{totalPrice}
      </div>
    </div>
  );
};

export default CartPage;
