const express = require("express");
const router = express.Router();

const { validation } = require("../../middlewares");

const { joiSchema, Contact } = require("../../models");

const validationMiddleware = validation(joiSchema);

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await Contact.find({});
    res.status(200).json({
      contactsList,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const singleContact = await Contact.findById(contactId);
    if (!singleContact) throw error;
    res.json({ singleContact });
  } catch (error) {
    error.status = 404;
    error.message = `Contact with id: ${contactId}, is not found.`;
    next(error);
  }
});

router.post("/", validationMiddleware, async (req, res, next) => {
  const { body } = req;
  try {
    const result = await Contact.create(body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) throw error;
    res.json({ message: "contact deleted", deletedContact });
  } catch (error) {
    error.status = 404;
    error.message = `contactId = ${contactId}. Not found`;
    next(error);
  }
});

router.patch("/:contactId", validationMiddleware, async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  const bodyLength = Object.keys(body).length;
  if (!bodyLength) {
    return res.status(400).json({
      message: "missing fields!",
    });
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    console.log(`updatedContact`.red);
    console.log(`${updatedContact}`.red);
    if (!updatedContact)
      return res
        .status(404)
        .json({ message: `contactId =${contactId}. Not found` });

    res.json({
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
