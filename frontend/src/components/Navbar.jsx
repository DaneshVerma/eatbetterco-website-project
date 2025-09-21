import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, logout, getUser } from "../utils/auth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { RiShoppingCartLine, RiMenu3Line } from "@remixicon/react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(!!isLoggedIn());
  const [user, setUser] = useState(getUser());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();

  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  // Re-evaluate auth state on route changes
  useEffect(() => {
    setAuthed(!!isLoggedIn());
    setUser(getUser());
  }, [location]);

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
        <Link
          to='/'
          className='text-2xl md:text-3xl font-serif font-bold text-[#2f2f2f]'
        >
          <img
            className='w-1/4 scale-115 object-cover h-full'
            src='https://eatbetterco.com/cdn/shop/files/EB-LOGO-02.svg?v=1740123835&width=160'
            alt='Eat Better Co Logo'
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-8 items-center text-sm'>
          {[
            { label: "Home", to: "/" },
            { label: "Our Story", to: "/ourstory" },
            { label: "Products", to: "/products" },
            ...(authed ? [{ label: "Profile", to: "/profile" }] : []),
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className='relative font-["Geist mono"] font-semibold group'
            >
              {link.label}
              <span className='block h-[2px] w-0 bg-amber-400 transition-all group-hover:w-full'></span>
            </Link>
          ))}

          {/* Cart Icon with Count */}
          <Link to='/cart' className='relative'>
            <RiShoppingCartLine className='w-5 h-5' />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                {cartCount}
              </span>
            )}
          </Link>

          {authed ? (
            <>
              <span className='text-sm text-gray-800 font-medium'>
                Hi, {user?.name || "User"}
              </span>
              <button
                onClick={() => {
                  logout();
                  setAuthed(false);
                  setUser(null);
                  navigate("/");
                }}
                className='text-red-600 cursor-pointer font-bold hover:underline'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login'
              onClick={closeMenu}
              className='relative font-["Geist mono"] font-semibold group'
            >
              Login
              <span className='block h-[2px] w-0 bg-[#7a9e49] transition-all group-hover:w-full'></span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className='md:hidden bg-[#d6e2c5] p-2 rounded-lg focus:outline-none shadow'
        >
          <RiMenu3Line className='w-6 h-6 text-[#2f2f2f]' />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
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
              <nav className='flex flex-col gap-5 font-["Geist mono"]'>
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
                {authed && (
                  <Link
                    to='/profile'
                    onClick={closeMenu}
                    className='hover:text-[#7a9e49] border-b border-[#dabf82]/40 pb-2'
                  >
                    Profile
                  </Link>
                )}

                {/* Cart with badge */}
                <Link
                  to='/cart'
                  onClick={closeMenu}
                  className='relative border-b border-[#dabf82]/40 pb-2'
                >
                  <RiShoppingCartLine className='w-5 h-5 inline-block mr-1' />
                  Cart
                  {cartCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                      {cartCount}
                    </span>
                  )}
                </Link>

                {authed ? (
                  <button
                    onClick={() => {
                      logout();
                      setAuthed(false);
                      setUser(null);
                      navigate("/");
                      closeMenu();
                    }}
                    className='text-red-600 font-bold border-b border-[#dabf82]/40 pb-2 text-left'
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
