import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box bg="none" shadow="sm" px={6} py={4}>
      <Flex align="center">
        <Heading size="xl" as={RouterLink} to="/">
          Blog
        </Heading>
        <Spacer />
        <Button as={RouterLink} to="/create" bg={"none"} mr={3}>
          Create Post
        </Button>
        <Button as={RouterLink} to="/details" bg={"none"} mr={3}>
          Post Details
        </Button>
        <Button as={RouterLink} to="/contact" bg={"none"} mr={3}>
          Contact
        </Button>
      </Flex>
    </Box>
  );
}
