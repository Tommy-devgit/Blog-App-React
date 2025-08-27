import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16 ">
      <div className="max-w-3xl text-center mb-16 my-20">
        <h1 className="text-5xl font-light mb-6">Get in Touch</h1>
        <p className="text-gray-400 text-lg">
          Have questions, feedback, or collaboration ideas?  
          Drop us a message using the form below or reach out directly via email.
        </p>
      </div>
      <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-2xl shadow-lg">
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <textarea
            rows={6}
            placeholder="Your Message"
            className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          ></textarea>
          <button
            type="submit"
            className="w-full py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-300 transition"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="mt-16 text-center">
        <p className="text-gray-400">Or email us directly at:</p>
        <a
          href="mailto:contact@yourblog.com"
          className="text-white font-medium hover:underline"
        >
          contact@yourblog.com
        </a>
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-gray-400 hover:text-white">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
