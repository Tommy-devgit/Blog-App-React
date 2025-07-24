import {
  Heading,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase"
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

    if (!title || !content) {
      toast({ title: "Please fill in all fields.", status: "error" });
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: serverTimestamp(),
      });
      toast({ title: "Post created!", status: "success" });
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
      toast({ title: "Something went wrong.", status: "error" });
    }
  };

  return (
    <Flex w={"full"} p={10} justifyContent={"center"} alignItems={"center"} minH={"100vh"} flexDirection={"column"} gap={4}> 
      <Heading>Share your Thoughts here....</Heading>
      <Box minW="600px" mx="auto" bg={"white"} p={8} borderRadius={10} border={"1px solid black"} boxShadow={"2xl"}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input value={title} placeholder="Title For Your Blog" onChange={(e) => setTitle(e.target.value)} border={"1px solid black"}/>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
              value={content}
              placeholder="Describe Your Blog Here"
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              border={"1px solid black"}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Post
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
