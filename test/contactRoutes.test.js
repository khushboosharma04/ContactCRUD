const express = require("express");
const request = require("supertest");
const app = express();
const Contact = require("../src/model/contactModel");
const router = require("../src/route/contactRoutes");
const contactController = require("../src/controller/contactController");

app.use(express.json());
app.use("/contacts", router);

// Mocking the controller functions
jest.mock("../src/controller/contactController");
const controllerMocks = {
  createContact: jest.fn(),
  getContacts: jest.fn(),
  getContactById: jest.fn(),
  updateContactById: jest.fn(),
  deleteContactById: jest.fn(),
};
Object.assign(contactController, controllerMocks);

// Mocking the model methods
jest.mock("../src/model/contactModel");
const modelMocks = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
};
Object.assign(Contact, modelMocks);

describe("Contact API Routes", () => {
  beforeEach(() => {
    Object.values(controllerMocks).forEach((mockFn) => mockFn.mockReset());
    Object.values(modelMocks).forEach((mockFn) => mockFn.mockReset());
  });

  // Test POST /contacts
  it("shouldCreateNewContact", async () => {
    const newContact = {
      name: "July Miller",
      email: "julMil5@gmail.com",
      phone: "+918834567890",
    };

    const contactCreated = {
      _id: 7460,
      name: "July Miller",
      email: "julMil5@gmail.com",
      phone: "+918834567890",
      createdAt: "2023-09-28T05:53:41.925Z",
      updatedAt: "2023-09-28T05:53:41.925Z",
      __v: 0,
    };

    controllerMocks.createContact.mockResolvedValue(contactCreated);
    modelMocks.create.mockResolvedValue(contactCreated);

    const response = await request(app).post("/contacts").send(newContact);
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toBe("July Miller");
    expect(response.body.email).toBe("julMil5@gmail.com");
    expect(response.body.phone).toBe("+918834567890");
  });

  // Test GET /contacts
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
    controllerMocks.getContacts.mockResolvedValue(contacts);
    modelMocks.find.mockResolvedValue(contacts);

    const response = await request(app).get("/contacts");
    expect(response.status).toBe(200);
    expect(response.body.contacts).toBeInstanceOf(Array);
    expect(response.body.message).toBe("Contacts retrieved successfully!");
  });

  // Test GET /contacts/:id
  it("shouldReturnSpecificContact", async () => {
    const contactId = 7811;

    const contact = {
      _id: 7811,
      name: "John Wick",
      email: "johnwick45@gmail.com",
      phone: "+916721984322",
      createdAt: "2023-09-28T07:28:15.508Z",
      updatedAt: "2023-09-28T07:28:15.508Z",
      __v: 0,
    };

    controllerMocks.getContactById.mockResolvedValue(contact);
    modelMocks.findById.mockResolvedValue(contact);

    const response = await request(app).get(`/contacts/${contactId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined;
    expect(response.body.name).toBe("John Wick");
    expect(response.body._id).toBeDefined;
    expect(response.body.phone).toBe("+916721984322");
  });

  // Test PUT /contacts/:id
  it("shouldUpdateSpecificContact", async () => {
    const contactId = 7811;

    const updatedFields = {
      email: "johnwi45@gmail.com",
      phone: "+918821984322",
    };

    const updatedContact = {
      _id: 7811,
      name: "John Wick",
      email: "johnwi45@gmail.com",
      phone: "+918821984322",
      createdAt: "2023-09-28T07:28:15.508Z",
      updatedAt: "2023-09-28T07:57:48.064Z",
      __v: 0,
    };

    modelMocks.findById.mockResolvedValue(updatedContact);
    modelMocks.findOneAndUpdate.mockResolvedValue(updatedContact);
    controllerMocks.updateContactById.mockResolvedValue({
      updatedContact,
      message: "Contact updated successfully!",
    });

    const response = await request(app)
      .put(`/contacts/${contactId}`)
      .send(updatedFields);

    expect(response.status).toBe(200);
    expect(response.body).isDefined;
    expect(response.body.message).toBe("Contact updated successfully!");
  });

  // Test DELETE /contacts/:id
  it("shouldDeleteSpecificContact", async () => {
    const contactId = 7811;
    const contactToBeDeleted = {
      _id: 7811,
      name: "John Wick",
      email: "johnwi45@gmail.com",
      phone: "+918821984322",
      createdAt: "2023-09-28T07:28:15.508Z",
      updatedAt: "2023-09-28T07:57:48.064Z",
      __v: 0,
    };

    modelMocks.findById.mockResolvedValue(contactToBeDeleted);
    modelMocks.deleteOne.mockResolvedValue({
      acknowledged: true,
      deletedCount: 1,
    });
    controllerMocks.deleteContactById.mockResolvedValue({
      message: `Contact deleted with ID: ${contactId}`,
    });

    const response = await request(app).delete(`/contacts/${contactId}`);
    expect(response.status).toBe(200);
    expect(response.body).isDefined;
    expect(response.body.message).toBe("Contact deleted with ID: 7811");
  });
});
