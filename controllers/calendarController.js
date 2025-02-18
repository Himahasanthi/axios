const { Calendar } = require('../models');

// Create Calendar Event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Calendar(req.body);
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', data: newEvent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Calendar Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Calendar.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Calendar Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Calendar Event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Calendar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated successfully', data: updatedEvent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Calendar Event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Calendar.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
