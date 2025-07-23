import { Flex, Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex 
      textAlign={"center"} 
      justifyContent={"center"} 
      margin={"0 auto"}
      color={"black"}
      alignItems="center">

      <Box color={"white"}>
        <Box minH={"100vh"} justifyContent={"center"} alignItems={"Center"}>
          <Heading fontSize={"9xl"} maxW={"full"} mb={4} color={"black"}>
          Welcome To Blog
          </Heading>
          <Text fontSize="md" mb={8} color={"gray"}>
            Share Your Thoughts and Ideas To the World
          </Text>
        </Box>
        <VStack spacing={6} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
          <Heading color={"black"}>Features</Heading>
          <VStack spacing={6} flexDirection={"row"}>
            <Box border={"1px solid black"} borderRadius={6} p={10}>
              <Text fontWeight="bold" fontSize="4xl" color={"blackAlpha.800"}>Create & Publish Posts</Text>
              <Text fontSize="sm" color="gray.500">
                Easily write, edit, and share your thoughts with the world.
              </Text>
            </Box>
            <Box border={"1px solid black"} borderRadius={6} p={10}>
              <Text fontWeight="bold" fontSize="lg" color={"blackAlpha.800"}>Comment & Interact</Text>
              <Text fontSize="sm" color="gray.500">
                Engage with other users through comments and discussions.
              </Text>
            </Box>
            <Box border={"1px solid black"} borderRadius={6} p={10}>
              <Text fontWeight="bold" fontSize="lg" color={"blackAlpha.800"}>Personalized Profiles</Text>
              <Text fontSize="sm" color="gray.500">
                Customize your profile and manage your published articles.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
      <Box>

      </Box>
    </Flex>
  );
}