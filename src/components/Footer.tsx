import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black-100 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-bold">Blogger</h3>
          <p className="text-gray-400 text-sm">
            Share your thoughts, publish your stories, and connect with readers. Your ideas deserve a platform.
          </p>
        </div>

        {/* Quick Links */}
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
              <a href="/profile" className="hover:text-white transition-colors">Profile</a>
            </li>
          </ul>
        </div>

        {/* Services / Resources */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/create" className="hover:text-white transition-colors">Create Blog</a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
            </li>
            <li>
              <a href="/support" className="hover:text-white transition-colors">Support</a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold">Stay Connected</h3>
          <p className="text-gray-400 text-sm">
            Subscribe to our newsletter to get the latest blogs and updates.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 p-2 rounded-xl bg-black-200 text-white placeholder-gray-500 focus:outline-none"
            />
            <button className="px-4 py-2 bg-secondary text-black-200 font-semibold rounded-xl hover:opacity-90 transition">
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Blogger. All rights reserved.
      </div>
    </footer>
  );
}
