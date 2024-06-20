const mongoose = require("mongoose");
const contactSchema = require("../src/model/contactModel");

describe("Contact schema", () => {
  it("shouldValidateContactWithAllRequiredFields", async () => {
    const contact = new contactSchema({
      name: "Harry Potter",
      email: "harryP34@gmail.com",
      phone: "+915632897733",
    });

    await contact.validate();

    expect(contact.errors).toEqual(undefined);
  });

  it("shouldFailToValidateContactWithoutName", async () => {
    const contact = new contactSchema({
      email: "harryP34@gmail.com",
      phone: "+915632897733",
    });

    const validationPromise = contact.validate();

    await expect(validationPromise).rejects.toThrow("Please add your name");
  });

  it("shouldFailToValidateContactWithoutEmail", async () => {
    const contact = new contactSchema({
      name: "Harry Potter",
      phone: "+915632897733",
    });

    const validationPromise = contact.validate();

    await expect(validationPromise).rejects.toThrow("Please add your email");
  });

  it("shouldFailToValidateContactWithoutPhoneNumber", async () => {
    const contact = new contactSchema({
      name: "Harry Potter",
      email: "harryP34@gmail.com",
    });

    const validationPromise = contact.validate();

    await expect(validationPromise).rejects.toThrow(
      "Please add your phone number"
    );
  });
});
