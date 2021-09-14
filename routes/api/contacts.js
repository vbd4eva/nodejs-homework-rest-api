const express = require("express");
const router = express.Router();

const {
  // listContacts,
  // getContactById,
  // addContact,
  // removeContact,
  // updateContact,
  Contact,
} = require("../../models");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.status(200).json({
      contactsList,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const singleContact = await getContactById(contactId);
    if (!singleContact)
      return res
        .status(404)
        .json({ message: `Contact with id: ${contactId}, is not found.` });
    res.json({ singleContact });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    // const { error } = joiSchema.validate(body);
    // if (error) {
    //   return res.status(400).json({
    //     message: error.message,
    //   });
    // }

    const result = Contact.create(body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await removeContact(contactId);
    if (!deletedContact)
      res.status(404).json({ message: `contactId = ${contactId}. Not found` });
    res.json({ message: "contact deleted", deletedContact });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const bodyLength = Object.keys(body).length;
  const { error } = schemaContact.or("name", "email", "phone").validate(body);

  if (!bodyLength) {
    return res.status(400).json({
      message: "missing fields! " + error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
    const updatedContact = await updateContact(contactId, body);
    if (!updatedContact)
      return res
        .status(404)
        .json({ message: `contactId =${contactId}. Not found` });
    //
    res.json({
      message: "template message ",
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
