const asyncHandler = require("express-async-handler");

const Contact = require("../model/contactModel");

const getRandomInt = require("../utilities/randomNumGenerate");

const {
  validateId,
  validateContactExistence,
  validateRequestBodyNotEmpty,
  validateContactWithIdExists,
  validateNoContactsFound,
  validateContactData,
} = require("../validator/contactValidation");

// Method to create new contact
const createContact = asyncHandler(async (req, res) => {
  console.log("Received POST request for contact");

  validateRequestBodyNotEmpty(req, res);
  const id = getRandomInt(1000, 9999);

  // Validate the request body using the validateContactData function
  validateContactData(req.body, res);

  const newContact = await Contact.create({
    _id: id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  return res.status(201).json(newContact);
});

// Method to retrieve all contacts
const getContacts = asyncHandler(async (req, res) => {
  console.log("Received GET request to list all contacts that are present");

  const contacts = await Contact.findAll();

  await validateNoContactsFound(contacts, res);

  return res.status(200).json({
    contacts,
    message: "Contacts retrieved successfully!",
  });
});

// Method to retrieve contact by id
const getContactById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log("Received GET request for contact with ID:", id);

  validateId(res, id);

  const contact = await Contact.findById(id);
  validateContactExistence(contact, res);

  return res.status(200).json(contact);
});

// Method to update contact by id
const updateContactById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Received PUT request for contact with ID:", id);

  validateId(res, id);
  validateRequestBodyNotEmpty(req, res);
  await validateContactWithIdExists(id, res);

  // Validate the request body using the validateContactData function
  validateContactData(req.body, res, true);
  const updateFields = {
    ...req.body,
  };

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id },
    { $set: updateFields },
    { new: true }
  );

  return res.status(200).json({
    updatedContact,
    message: "Contact updated successfully!",
  });
});

// Method to delete contact by id
const deleteContactById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Received DELETE request for contact with ID:", id);

  validateId(res, id);

  await validateContactWithIdExists(id, res);

  const isDeleted = await Contact.deleteOne({ _id: id });

  if (isDeleted.acknowledged === true && isDeleted.deletedCount === 1) {
    return res.status(200).json({
      message: `Contact deleted with ID: ${id}`,
    });
  }
});

module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
