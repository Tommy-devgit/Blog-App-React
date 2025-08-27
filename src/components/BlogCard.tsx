import React from "react";
import { useNavigate } from "react-router-dom";

type BlogCardProps = {
  id: string;          // added
  title: string;
  content: string;
  author: string;
  thumbnail?: string | null;
};

const BlogCard: React.FC<BlogCardProps> = ({ id, title, content, author, thumbnail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/postdetails/${id}`);
  };

  return (
    <div
      className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Thumbnail or placeholder */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-200 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          <span className="text-sm">No Image</span>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-700 text-sm line-clamp-3">{content}</p>
        <p className="text-gray-500 text-xs mt-auto">By {author}</p>
      </div>
    </div>
  );
};

export default BlogCard;

// Post type stays the same
export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  thumbnail?: string;
  created_at: string; // ✅ Add this
};

