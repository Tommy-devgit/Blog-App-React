import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { styles } from '../styles'
// import { logo, menu, close } from '../assets'

const navLinks = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'blog', title: 'Blog', path: '/blog' },
  { id: 'blogs', title: 'Blogs', path: '/blogs' },
  { id: 'about', title: 'About', path: '/about' },
  { id: 'contact', title: 'Contact', path: '/contact' },
  // { id: 'admin', title: 'Admin', path: '/admin' },
]

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <nav
      className={`${styles.paddingX} w-[95%] m-5 flex items-center py-3 fixed top-0 z-20 bg-primary rounded-3xl`}
    >
      <div className="w-full flex justify-between items-center mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          {/* <img src={logo} alt="logo" className="w-9 h-9 object-contain" /> */}
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Blogger &nbsp;
            <span className="sm:block hidden"> | Write whats on your Mind</span>
          </p>
        </Link>

        {/* Desktop Links */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={`text-[12px] font-medium cursor-pointer ${
                  currentPath === link.path ? 'text-white' : 'text-secondary'
                } hover:text-white`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          {/* <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          /> */}

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl flex-col`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className={`font-medium cursor-pointer text-[16px] ${
                      currentPath === link.path
                        ? 'text-white'
                        : 'text-secondary'
                    }`}
                    onClick={() => setToggle(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
