const { Router } = require("express");
const { jwtValidate } = require("../middlewares/jwtValidator");
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(jwtValidate);
router.get("/", getEvents);
router.post(
  "/",
  [check("title", "Title is required").notEmpty()],
  [check("start", "Start date is required").custom(isDate)],
  [check("end", "End date is required").custom(isDate)],
  fieldValidator,
  createEvent
);
router.put(
  "/:id",
  [check("title", "Title is required").notEmpty()],
  [check("start", "Start date is required").custom(isDate)],
  [check("end", "End date is required").custom(isDate)],
  fieldValidator,
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
