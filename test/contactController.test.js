const request = require("supertest");
const express = require("express");
const app = express();
const errorHandler = require("../src/middleware/errorHandler");

const {
  getContacts,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("../src/controller/contactController");

const Contact = require("../src/model/contactModel");

app.use(express.json());
app.get("/contacts", getContacts);
app.post("/contacts", createContact);
app.get("/contacts/:id", getContactById);
app.put("/contacts/:id", updateContactById);
app.delete("/contacts/:id", deleteContactById);
app.use(errorHandler);

jest.spyOn(Contact, "find");

jest.spyOn(Contact, "create");

jest.spyOn(Contact, "findById");

jest.spyOn(Contact, "findOneAndUpdate");

jest.spyOn(Contact, "deleteOne");

describe("Contact Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case for POST /contacts

  describe("POST /contacts", () => {
    it("shouldCreateNewContact", async () => {
      Contact.create.mockResolvedValue({
        _id: 7460,
        name: "July Miller",
        email: "julMil5@gmail.com",
        phone: "+918834567890",
        createdAt: "2023-09-28T05:53:41.925Z",
        updatedAt: "2023-09-28T05:53:41.925Z",
        __v: 0,
      });

      const newContact = {
        name: "July Miller",
        email: "julMil5@gmail.com",
        phone: "+918834567890",
      };

      const response = await request(app).post("/contacts").send(newContact);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("July Miller");
      expect(response.body.email).toBe("julMil5@gmail.com");
      expect(response.body._id).toBeDefined();
      expect(response.body.phone).toBe("+918834567890");
    });
    it("shouldReturnErrorIfFieldsMissing", async () => {
      const contact = {
        email: "julMil5@gmailcom",
        phone: "+918834567890",
      };

      const response = await request(app).post("/contacts").send(contact);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Name is required, Email is not valid"
      );
    });
    it("shouldReturnErrorIfRequestBodyEmpty", async () => {
      const contact = {};

      const response = await request(app).post("/contacts").send(contact);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Request body cannot be empty.");
    });
  });

  // Test case for GET /contacts

  describe("GET /contacts", () => {
    it("shouldReturnListOfContacts", async () => {
      const contacts = [
        {
          _id: 7811,
          name: "John Wick",
          email: "johnwick45@gmail.com",
          phone: "+916721984322",
          createdAt: "2023-09-28T07:28:15.508Z",
          updatedAt: "2023-09-28T07:28:15.508Z",
          __v: 0,
        },
      ];
      Contact.find.mockResolvedValue({
        contacts,
      });

      const response = await request(app).get("/contacts");

      expect(response.status).toBe(200);
      expect(response.body.contacts).toBeDefined;
      expect(response.body.message).toBe("Contacts retrieved successfully!");
    });

    it("shouldReturnErrorIfContactsNotFound", async () => {
      Contact.find.mockResolvedValue([]);

      const response = await request(app).get("/contacts");

      expect(response.status).toBe(404);
      expect(response.body).notDefined;
      expect(response.body.message).toBe("There are no existing contacts");
    });
  });

  // Test for GET BY ID /contacts/:id

  describe("GET /contacts/:id", () => {
    it("shouldReturnContactById", async () => {
      Contact.findById.mockResolvedValue({
        _id: 7811,
        name: "John Wick",
        email: "johnwick45@gmail.com",
        phone: "+916721984322",
        createdAt: "2023-09-28T07:28:15.508Z",
        updatedAt: "2023-09-28T07:28:15.508Z",
        __v: 0,
      });

      const response = await request(app).get("/contacts/7811");
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined;
      expect(response.body.name).toBe("John Wick");
      expect(response.body._id).toBeDefined;
      expect(response.body.phone).toBe("+916721984322");
    });
    it("shouldReturnErrorIfIdInvalid", async () => {
      const response = await request(app).get("/contacts/64e");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid ID!!");
    });

    it("shouldReturnErrorIfContactNotFound", async () => {
      Contact.findById.mockResolvedValue(null);

      const response = await request(app).get("/contacts/4432");
      expect(response.status).toBe(404);
      expect(response.body).notDefined;
      expect(response.body.message).toBe("Contact not found");
    });
  });

  // Test for PUT /contacts/:id

  describe("PUT /contacts/:id", () => {
    it("shouldUpdateContactById", async () => {
      const updatedContact = {
        _id: 7811,
        name: "John Wick",
        email: "johnwi45@gmail.com",
        phone: "+918821984322",
        createdAt: "2023-09-28T07:28:15.508Z",
        updatedAt: "2023-09-28T07:57:48.064Z",
        __v: 0,
      };

      Contact.findById.mockResolvedValue({
        updatedContact,
      });

      Contact.findOneAndUpdate.mockResolvedValue({
        updatedContact,
      });

      const updatedFields = {
        email: "johnwi45@gmail.com",
        phone: "+918821984322",
      };

      const response = await request(app)
        .put("/contacts/7811")
        .send(updatedFields);

      expect(response.status).toBe(200);
      expect(response.body).isDefined;
      expect(response.body.message).toBe("Contact updated successfully!");
    });

    it("shouldReturnErrorIfIdInvalid", async () => {
      const updatedFields = {
        email: "johnwi45@gmail.com",
        phone: "+918821984322",
      };
      const response = await request(app)
        .put("/contacts/64e")
        .send(updatedFields);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid ID!!");
    });

    it("shouldReturnErrorIfRequestBodyEmpty", async () => {
      const updatedContact = {};

      const response = await request(app)
        .put("/contacts/4322")
        .send(updatedContact);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Request body cannot be empty.");
    });

    it("shouldReturnErrorIfContactNotFound", async () => {
      const updatedFields = {
        email: "johnwi45@gmail.com",
        phone: "+918821984322",
      };

      Contact.findById.mockResolvedValue(null);
      const response = await request(app)
        .put("/contacts/6461")
        .send(updatedFields);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "Contact with this ID does not exist."
      );
    });
  });

  // Test for DELETE /contacts/:id

  describe("DELETE /contacts/:id", () => {
    it("shouldDeleteContactById", async () => {
      const contactToBeDeleted = {
        _id: 7811,
        name: "John Wick",
        email: "johnwi45@gmail.com",
        phone: "+918821984322",
        createdAt: "2023-09-28T07:28:15.508Z",
        updatedAt: "2023-09-28T07:57:48.064Z",
        __v: 0,
      };

      Contact.findById.mockResolvedValue(contactToBeDeleted);
      Contact.deleteOne.mockResolvedValue({
        acknowledged: true,
        deletedCount: 1,
      });

      const response = await request(app).delete("/contacts/7811");
      expect(response.status).toBe(200);
      expect(response.body).isDefined;
      expect(response.body.message).toBe("Contact deleted with ID: 7811");
    });

    it("shouldReturnErrorIfContactNotFound", async () => {
      Contact.findById.mockResolvedValue(null);

      const response = await request(app).delete("/contacts/6467");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "Contact with this ID does not exist."
      );
    });

    it("shouldReturnErrorIfIdInvalid", async () => {
      const response = await request(app).delete("/contacts/64e");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid ID!!");
    });
  });
});
