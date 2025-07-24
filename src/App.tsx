

import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
// import image from "../src/assets/thought-catalog-505eectW54k-unsplash.jpg"
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Box minH="100vh" backgroundColor={"white"} 
          // bg="gray" 
          // bgImage={`url(${image})`}
          // bgRepeat="no-repeat"
          >
      <Navbar />
      <Box minW="960px" >
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<PostDetails />} />

        </Routes>
      </Box>
    </Box>
  );
}
