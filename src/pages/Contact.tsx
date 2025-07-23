import { Flex, Box, Heading } from "@chakra-ui/react";

export default function Contact() {
    return (
        <Flex minH="100vh" direction="column" align="center" justify="center">
        <Box bg="gray.100" w="100%" p={4} textAlign="center">
            <Heading as="h1" size="xl" color="blue.600">
            Contact Us
            </Heading>
            <Box mt={4}>
            <p>If you have any questions, feel free to reach out!</p>
            </Box>
        </Box>
        </Flex>
    );
}