import React, { useState } from 'react';
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', location: '', description: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: '', location: '', description: '' });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={4}>
        <Box w="100%">
          <FormControl>
            <FormLabel>Event Name</FormLabel>
            <Input name="name" value={newEvent.name} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input name="date" type="date" value={newEvent.date} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={newEvent.location} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={newEvent.description} onChange={handleChange} />
          </FormControl>
          <Button mt={4} onClick={handleAddEvent}>Add Event</Button>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Location</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>{event.location}</Td>
                <Td>{event.description}</Td>
                <Td>
                  <Button size="sm" onClick={() => setEditingEvent(event)}>Edit</Button>
                  <Button size="sm" ml={2} onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
      {editingEvent && (
        <Box mt={4}>
          <FormControl>
            <FormLabel>Event Name</FormLabel>
            <Input name="name" value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input name="date" type="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={editingEvent.location} onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} />
          </FormControl>
          <Button mt={4} onClick={() => handleUpdateEvent(editingEvent)}>Update Event</Button>
        </Box>
      )}
    </Container>
  );
};

export default Events;