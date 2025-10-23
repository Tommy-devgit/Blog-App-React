// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { styles } from "../styles";
import { motion, AnimatePresence } from "framer-motion";
const MotionDiv: any = motion.div;
import CreateBlog from "../pages/CreateBlog";

const navLinks = [
  { id: "home", title: "Home", path: "/" },
  { id: "blogs", title: "Blogs", path: "/blogs" },
  { id: "about", title: "About", path: "/about" },
  { id: "contact", title: "Contact", path: "/contact" },
  { id: "create", title: "+", path: "/create" },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false); // mobile menu
  const [user, setUser] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full m-2  flex items-center py-3 top-0 z-20 bg-primary rounded-3xl`}
      >
        <div className="w-full flex justify-between items-center mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => window.scrollTo(0, 0)}
          >
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              Blogger &nbsp;
              <span className="sm:block hidden"> | Write what's on your Mind</span>
            </p>
          </Link>

          {/* Desktop Links */}
          <ul className="list-none hidden sm:flex flex-row gap-6 items-center">
            {navLinks.map((link) => {
              if (link.id === "create") {
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => setIsCreateOpen(true)}
                      className="text-[14px] font-medium cursor-pointer text-secondary hover:text-white"
                    >
                      {link.title}
                    </button>
                  </li>
                );
              }
              return (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className={`text-[14px] font-medium cursor-pointer ${
                      currentPath === link.path ? "text-white" : "text-secondary"
                    } hover:text-white`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}

            {user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="text-[14px] font-medium text-white hover:text-secondary"
                  >
                    {user.user_metadata?.full_name || "Profile"}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-[14px] font-medium text-red-400 hover:text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-[14px] font-medium text-white hover:text-secondary"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-[14px] font-medium text-white hover:text-secondary"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu */}
          <div className="sm:hidden flex flex-1 justify-end items-center relative">
            <div
              className={`cursor-pointer ${toggle ? "text-white" : "text-secondary"}`}
              onClick={() => setToggle(!toggle)}
            >
              ☰
            </div>

            <AnimatePresence>
              {toggle && (
                  <MotionDiv
                  key="mobile-menu"
                  className="p-6 bg-primary absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl flex-col flex"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <ul className="list-none flex flex-col gap-4">
                    {navLinks.map((link) => {
                      if (link.id === "create") {
                        return (
                          <li key={link.id}>
                            <button
                              onClick={() => {
                                setIsCreateOpen(true);
                                setToggle(false);
                              }}
                              className="text-white font-medium text-[16px]"
                            >
                              {link.title}
                            </button>
                          </li>
                        );
                      }
                      return (
                        <li key={link.id}>
                          <Link
                            to={link.path}
                            onClick={() => setToggle(false)}
                            className={`font-medium text-[16px] ${
                              currentPath === link.path ? "text-white" : "text-secondary"
                            }`}
                          >
                            {link.title}
                          </Link>
                        </li>
                      );
                    })}

                    {user ? (
                      <>
                        <li>
                          <Link
                            to="/profile"
                            className="text-white font-medium text-[16px]"
                            onClick={() => setToggle(false)}
                          >
                            {user.user_metadata?.full_name || "Profile"}
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              handleLogout();
                              setToggle(false);
                            }}
                            className="text-red-400 font-medium"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/login"
                            className="text-white font-medium text-[16px]"
                            onClick={() => setToggle(false)}
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/signup"
                            className="text-white font-medium text-[16px]"
                            onClick={() => setToggle(false)}
                          >
                            Sign Up
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Create Blog Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <MotionDiv
            key="create-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black-200/70 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionDiv
              className="relative w-full max-w-3xl"
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold hover:opacity-80"
                onClick={() => setIsCreateOpen(false)}
              >
                ×
              </button>

              <CreateBlog onClose={() => setIsCreateOpen(false)} />
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
