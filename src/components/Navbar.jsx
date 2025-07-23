// components/Navbar.jsx
import { Link } from "react-router-dom";
import { isLoggedIn, logout, getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { RiShoppingCartLine } from "@remixicon/react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const { cartItems } = useCart();

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-amber-200 shadow-sm border-[#dabf82]/40"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
        {/* Logo */}
        <span className='text-2xl md:text-3xl font-serif font-bold text-[#2f2f2f]'>
          <img
            className='w-1/4 scale-115 object-cover h-full'
            src='https://eatbetterco.com/cdn/shop/files/EB-LOGO-02.svg?v=1740123835&width=160'
            alt=''
          />
        </span>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-8 items-center text-sm'>
          {[
            { label: "Home", to: "/" },
            { label: "Our Story", to: "/ourstory" },
            { label: "Products", to: "/products" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className='relative font-semibold group'
            >
              {link.label}
              <span className='block h-[2px] w-0 bg-amber-400 transition-all group-hover:w-full'></span>
            </Link>
          ))}
          <Link to='/cart' className='relative'>
            <RiShoppingCartLine className='w-5 h-5' />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn() ? (
            <>
              <span className='text-sm text-gray-800 font-medium'>
                Hi, {user?.name || "User"}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className='text-red-600 hover:underline'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login'
              onClick={closeMenu}
              className='relative font-semibold group'
            >
              Login
              <span className='block h-[2px] w-0 bg-[#7a9e49] transition-all group-hover:w-full'></span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(true)}
          className='md:hidden bg-[#d6e2c5] p-2 rounded-lg focus:outline-none shadow'
        >
          <img src='icons/menu-3-line.svg' alt='Menu' className='w-5 h-5' />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Blurred Backdrop */}
            <motion.div
              className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className='fixed top-0 left-0 w-64 h-full bg-amber-200 shadow-lg p-6 z-50'
            >
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-serif font-semibold'>Menu</h2>
                <button onClick={closeMenu} className='text-2xl'>
                  ✕
                </button>
              </div>
              <nav className='flex flex-col gap-5'>
                <Link
                  to='/'
                  onClick={closeMenu}
                  className='hover:text-[#7a9e49] border-b border-[#dabf82]/40 pb-2'
                >
                  Home
                </Link>
                <Link
                  to='/ourstory'
                  onClick={closeMenu}
                  className='hover:text-[#7a9e49] border-b border-[#dabf82]/40 pb-2'
                >
                  Our Story
                </Link>
                <Link
                  to='/products'
                  onClick={closeMenu}
                  className='hover:text-[#7a9e49] border-b border-[#dabf82]/40 pb-2'
                >
                  Products
                </Link>
                <Link to='/cart' className='relative'>
                  <RiShoppingCartLine className='w-5 h-5' />
                  {cartCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                      {cartCount}
                    </span>
                  )}
                </Link>

                {isLoggedIn() ? (
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                      closeMenu();
                    }}
                    className='text-left text-red-600 border-b border-[#dabf82]/40 pb-2'
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to='/login'
                    onClick={closeMenu}
                    className='hover:text-[#7a9e49] border-b border-[#dabf82]/40 pb-2'
                  >
                    Login
                  </Link>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
