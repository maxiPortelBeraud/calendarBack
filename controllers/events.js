const { response } = require("express");

const Event = require("../models/EventModel");

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");
    res.status(200).json({
      ok: true,
      msg: "getEvents",
      info: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Events are not available" });
  }
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventCreated = await event.save();
    res.status(200).json({ ok: true, msg: "CreatedEvent", info: eventCreated });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, msg: "Cannot create event. Contact support" });
  }
};

const updateEvent = async (req, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    const event = await Event.findById(id);
    const isUser = event.user.toString() === uid;
    if (!event || !isUser) {
      return res
        .status(400)
        .json({ ok: false, msg: `Cannot Update Event ${id}. Contact support` });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };
    const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    });

    res
      .status(200)
      .json({ ok: true, msg: `Event ${id} updated`, info: eventUpdated });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, msg: `Cannot Update Event ${id}. Contact support` });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { uid } = req;
  try {
    const event = await Event.findById(id);
    const isUser = event.user.toString() === uid;
    if (!event || !isUser) {
      return res
        .status(400)
        .json({ ok: false, msg: `Cannot delete Event ${id}. Contact support` });
    }

    await Event.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      msg: "DeletedEvent",
      info: `Event ${id} has been deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Cannot Delete Event" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
