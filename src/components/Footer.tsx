import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold">About</h3>
          <p className="text-gray-400 text-sm">
            Discover a space where ideas matter. Write, publish, and connect with readers who value authentic stories.
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/" className="hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-white transition-colors">Blogs</a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">Admin</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">Services</a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold">Follow Us on Our Socials</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Blogger. All rights reserved.
      </div>
    </footer>
  );
}
