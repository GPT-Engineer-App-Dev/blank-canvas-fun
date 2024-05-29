import { Container, VStack, Text, Box, Flex, Spacer, Link } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="gray.800" color="white" p={4} align="center">
        <Box p="2">
          <Text fontSize="xl" fontWeight="bold">Blank Canvas</Text>
        </Box>
        <Spacer />
        <Box>
          <Link p={2} href="#" color="white">Home</Link>
          <Link p={2} href="#" color="white">About</Link>
          <Link p={2} href="#" color="white">Contact</Link>
          <Link p={2} href="/events" color="white">Events</Link>
        </Box>
      </Flex>
      <Container centerContent maxW="container.md" height="80vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        </VStack>
      </Container>
    </Container>
  );
};

export default Index;