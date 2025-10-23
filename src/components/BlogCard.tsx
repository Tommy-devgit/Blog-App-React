// src/components/BlogCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// motion.div's generic typing can sometimes cause jsx children typing issues
// in this project setup. Create a weakly-typed alias to avoid the error.
const MotionDiv: any = motion.div;

interface BlogCardProps {
  id: string;
  title: string;
  highlight: string;
  image_url: string;
  author_name: string;
  category?: string;
  created_at: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  highlight,
  image_url,
  author_name,
  category,
  created_at,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <MotionDiv
        className="bg-black-200 shadow-card rounded-2xl overflow-hidden hover:scale-[1.02] transition transform cursor-pointer"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
          {category && (
            <span className="absolute top-3 left-3 bg-secondary text-black-200 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {category}
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 italic">
            {highlight}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-400 italic">
            <span>By {author_name}</span>
            <span>{new Date(created_at).toLocaleDateString()}</span>
          </div>
        </div>
  </MotionDiv>

      {/* OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-200/70 backdrop-blur-sm p-6">
          <div className="bg-black-100 rounded-3xl max-w-3xl w-full overflow-y-auto max-h-[90vh] shadow-card relative p-6">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:opacity-80"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <div className="flex flex-col gap-4">
              <img
                src={image_url}
                alt={title}
                className="w-full h-64 object-cover rounded-2xl"
              />

              {category && (
                <span className="bg-secondary text-black-200 text-xs font-semibold px-3 py-1 rounded-full w-fit shadow-md">
                  {category}
                </span>
              )}

              <h2 className="text-3xl font-bold mb-2 text-white">{title}</h2>
              <p className="text-white-100 mb-4">{highlight}</p>

              <div className="flex items-center justify-between text-sm text-tertiary mb-4">
                <span>By {author_name}</span>
                <span>{new Date(created_at).toLocaleDateString()}</span>
              </div>

              <Link
                to={`/blog/${id}`}
                className="inline-block px-6 py-3 bg-secondary text-black-200 font-semibold rounded-full hover:opacity-90 transition"
                onClick={() => setIsOpen(false)}
              >
                Read Full Blog
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
