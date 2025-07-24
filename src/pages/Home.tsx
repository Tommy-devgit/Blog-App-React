import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Link as ChakraLink,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import image from "../assets/thought-catalog-505eectW54k-unsplash.jpg";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt?: any; 
};


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Post, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });

        setPosts(docs);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Spinner size="lg" />;

  return (
    <>
      <Flex minH={"100vh"} bgImg={image} bgRepeat={"none"} bgSize={"cover"} width={"full"} p={10} justifyContent={"center"} alignItems={"center"}>
        <Box>
          <Heading fontSize={"9xl"} textAlign={"center"} color={"white"}>You Have Something on your Mind, <br />
          Why not Share It?</Heading>
        </Box>
      </Flex>
      <VStack align="start" spacing={6}>
        {posts.map((post) => (
          <Box key={post.id} p={4} borderWidth="1px" rounded="md" w="100%">
            <Heading size="md" mb={2}>
              <ChakraLink as={Link} to={`/post/${post.id}`}>
                {post.title}
              </ChakraLink>
            </Heading>
            <Text noOfLines={2}>{post.content}</Text>
          </Box>
        ))}
        {posts.length === 0 && <Text>No posts yet.</Text>}
      </VStack>
    </>
    
  );
}
