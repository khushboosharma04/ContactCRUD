const Contact = require("../model/contactModel");
const validator = require("validator");

function validateId(res, id) {
  if (!id || isNaN(id)) {
    res.status(400);
    throw new Error("Invalid ID!!");
  }
}

function validateContactExistence(contact, res) {
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
}

function validateRequestBodyNotEmpty(req, res) {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Request body cannot be empty.");
  }
}

async function validateContactWithIdExists(id, res) {
  if (!(await Contact.findByPk(id))) {
    res.status(404);
    throw new Error("Contact with this ID does not exist.");
  }
}

async function validateNoContactsFound(contacts, res) {
  if (contacts.length === 0) {
    res.status(404);
    throw new Error("There are no existing contacts");
  }
}

function validateContactData(data, res, partial = false) {
  const errors = [];

  const { name, email, phone } = data;
  if (!partial || (partial && name)) {
    if (!name) {
      errors.push("Name is required");
    } else {
      const nameParts = name.split(" ");

      for (const part of nameParts) {
        if (!validator.isAlpha(part)) {
          errors.push("Name is not valid");
        }
      }
    }
  }
  if (!partial || (partial && email)) {
    if (!email) {
      errors.push("Email is required.");
    } else if (!validator.isEmail(email)) {
      errors.push("Email is not valid");
    }
  }

  if (!partial || (partial && phone)) {
    if (!phone) {
      errors.push("Phone number is required");
    } else if (!validator.isMobilePhone(phone, "any", { strictMode: true })) {
      errors.push("Phone is not valid");
    }
  }

  if (errors.length > 0) {
    const errorMessage = errors.join(", ");
    res.status(400);
    throw new Error(errorMessage);
  }
}

module.exports = {
  validateId,
  validateContactExistence,
  validateRequestBodyNotEmpty,
  validateContactWithIdExists,
  validateNoContactsFound,
  validateContactData,
};
