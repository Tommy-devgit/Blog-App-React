export default function AboutPage() {
  return (
    <div className=" text-gray-800">
      {/* Hero Section */}
      <section className="bg-black  py-16 text-center flex flex-col items-center justify-center min-h-[100vh]">
        <h1 className="text-9xl text-white font-bold mb-4">About Us</h1>
        <p className="text-2xl text-gray-600">
          A space where writers and readers connect through stories, ideas, and inspiration.
        </p>
      </section>

      {/* Our Story */}
      <section className="bg-black text-white flex flex-col items-center justify-center min-h-[100vh] w-full mx-auto text-center p-16">
        <h2 className="text-9xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-600 text-2xl leading-relaxed">
          We built this platform to give every voice a chance to be heard. Whether you’re sharing knowledge,
          telling stories, or exploring new ideas, our mission is to connect writers and readers in one meaningful space.
        </p>
      </section>

      {/* What We Offer */}
      <section className="bg-black py-16 flex flex-col items-center justify-center text-center min-h-[100vh]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-9xl font-semibold text-white text-center mb-10">What We Offer</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-center">
            <div className="p-6 bg-black border-2 rounded-xl shadow hover:shadow-lg">
              <span className="text-3xl">✍️</span>
              <h3 className="font-bold text-white mt-4 mb-2">Write Freely</h3>
              <p className="text-gray-600 text-sm">Share your stories without limits.</p>
            </div>
            <div className="p-6 bg-black border-2 rounded-xl shadow hover:shadow-lg">
              <span className="text-3xl">🌍</span>
              <h3 className="font-bold text-white mt-4 mb-2">Reach Readers</h3>
              <p className="text-gray-600 text-sm">Connect with people worldwide.</p>
            </div>
            <div className="p-6 bg-black border-2 rounded-xl shadow hover:shadow-lg">
              <span className="text-3xl">🤝</span>
              <h3 className="font-bold text-white mt-4 mb-2">Community Driven</h3>
              <p className="text-gray-600 text-sm">Engage with like-minded creators.</p>
            </div>
            <div className="p-6 bg-black border-2 rounded-xl shadow hover:shadow-lg">
              <span className="text-3xl">⚡</span>
              <h3 className="font-bold text-white mt-4 mb-2">Simple & Modern</h3>
              <p className="text-gray-600 text-sm">A fast, distraction-free experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-black py-16 flex flex-col items-center justify-center text-center min-h-[100vh]">
        <h2 className="text-9xl text-white font-semibold mb-8">Meet the Team</h2>
        <div className=" gap-8">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Tommy Melesse</h3>
            <p className="text-gray-500 mb-3">Founder & Developer</p>
            <p className="text-gray-600 text-sm">
              I created this platform to make sharing stories easier and more enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Community Focus */}
      <section className=" text-white py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Community</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Our readers and writers are at the heart of everything we do. Every blog is a voice, and every voice matters.
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">Join Our Community Today</h2>
        <p className="text-gray-600 mb-8">Start reading, start writing, and start connecting.</p>
        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Get Started →
        </button>
      </section>
    </div>
  );
}
