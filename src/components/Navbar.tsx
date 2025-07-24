import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box bg="none" shadow="sm" px={6} py={4} position={"fixed"} width={"full"}>
      <Flex align="center">
        <Heading size="xl" as={RouterLink} to="/">
          Blog
        </Heading>
        <Spacer />
        <Box>
          <Button as={RouterLink} to="/" bg={"white"} mr={3}>
            Home
          </Button>
          <Button as={RouterLink} to="/create" bg={"white"} mr={3}>
            Create Post
          </Button>
          {/* <Button as={RouterLink} to="/post" bg={"none"} mr={3}>
            Post Details
          </Button> */}
          <Button as={RouterLink} to="/contact" bg={"white"} mr={3}>
            Contact
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
