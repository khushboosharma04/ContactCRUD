const express = require("express");
const router = express.Router();
const contactController = require("../controller/contactController");
const checkRootRequest = require("../middleware/checkRootRequest");

router.use(checkRootRequest);

// Handling requests for the `/` route
router
  .route("/")
  .get(contactController.getContacts)
  .post(contactController.createContact);

// Handling requests for the `/:id` route
router
  .route("/:id")
  .get(contactController.getContactById)
  .put(contactController.updateContactById)
  .delete(contactController.deleteContactById);

module.exports = router;
