import {
  Box,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      if (!id) return;

      try {
        const ref = doc(db, "posts", id);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const data = snapshot.data() as Omit<Post, "id">;
          setPost({ id: snapshot.id, ...data });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  if (loading) return <Spinner size="lg" />;

  if (!post) return <Text>Post not found.</Text>;

  const formattedDate = post.createdAt
    ? new Date(post.createdAt.seconds * 1000).toLocaleString()
    : "Unknown date";

  return (
    <Box>
      <Heading mb={4}>{post.title}</Heading>
      <Text mb={2} fontSize="sm" color="gray.500">
        Posted on: {formattedDate}
      </Text>
      <Text whiteSpace="pre-wrap">{post.content}</Text>
    </Box>
  );
}
