// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiWhatsappLine,
} from "@remixicon/react";

const Footer = () => {
  return (
    <footer className='bg-amber-100 border-t border-[#e0dccc] text-[#2f2f2f] px-6 pt-12 pb-6 font-sans'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10'>
        {/* Newsletter CTA */}
        <div>
          <h3 className='text-xl  font-["Geist"]  mb-4'>Subscribe to get special offers</h3>
          <form className='flex flex-col sm:flex-row gap-3'>
            <input
              type='email'
              placeholder='Enter your email'
              className='px-4 py-2 border border-[#ccc] rounded w-full sm:w-auto focus:outline-none'
            />
            <button
              type='submit'
              className='bg-[#d6e2c5] font-["Geist mono"]  text-[#2f2f2f] px-5 py-2 rounded hover:bg-[#c6d2b3] transition'
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Navigation Links */}
        <div className='text-center md:text-left'>
          <h4 className='text-lg font-["Geist"] mb-3'>Quick Links</h4>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link to='/' className='font-["Geist mono"]  hover:underline'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/products' className='font-["Geist mono"]  hover:underline'>
                Products
              </Link>
            </li>
            <li>
              <Link to='/ourstory' className='font-["Geist mono"]  hover:underline'>
                Our Story
              </Link>
            </li>
            <li>
              <Link to='/login' className='font-["Geist mono"]  hover:underline'>
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Branding + Social Links */}
        <div className='text-center md:text-right'>
          <h4 className='text-lg font-["Geist"] mb-3'>
            EAT BETTER<span className='text-[#7a9e49]'>.co</span>
          </h4>
          <p className='text-sm font-["Geist mono"] text-gray-600 mb-2'>
            Handcrafted Indian snacks with a modern twist.
          </p>

          <div className='flex justify-center md:justify-end gap-4 mt-3'>
            <a
              href='https://www.instagram.com/theeatbetterco/'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-[#7a9e49] text-white rounded-full p-2 hover:bg-[#6b8f3b] transition'
            >
              <RiInstagramLine className='w-5 h-5' />
            </a>
            <a
              href='https://www.facebook.com/theeatbetterco'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-[#7a9e49] text-white rounded-full p-2 hover:bg-[#6b8f3b] transition'
            >
              <RiFacebookCircleLine className='w-5 h-5' />
            </a>
            <a
              href='https://api.whatsapp.com/send?phone=9352178141'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-[#7a9e49] text-white rounded-full p-2 hover:bg-[#6b8f3b] transition'
            >
              <RiWhatsappLine className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className='mt-10 text-center text-xs font-["Geist"]  text-gray-500'>
        &copy; {new Date().getFullYear()} Eat Better Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
