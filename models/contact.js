const Joi = require("joi");

const { Schema, model } = require("mongoose");
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().pattern(new RegExp("^[a-яА-Я a-zA-Z-]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string().regex(/(.*\d.*){10,}/),
});
//
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
};
//
//

// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "./contacts.json");
// // const contacts = require("./contacts.json");

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
//   } catch (error) {
//     throw error;
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contactList = await listContacts();
//     const contact = contactList.find(({ id }) => id == contactId);
//     return contact;
//   } catch (error) {
//     throw error;
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const contactsList = await listContacts();
//     let deletedContact = {};
//     const updatedContactsList = contactsList.filter((contact) => {
//       if (contact.id != contactId) {
//         return true;
//       }
//       deletedContact = { ...contact };
//     });

//     if (!Object.keys(deletedContact).length) return;

//     await fs.writeFile(
//       contactsPath,
//       JSON.stringify(updatedContactsList, null, 2)
//     );

//     return deletedContact;
//   } catch (error) {
//     throw error;
//   }
// };

// const addContact = async (body) => {
//   try {
//     return Contact.create(body);
//   } catch (error) {
//     throw error;
//   }
// };

// const updateContact = async (contactId, body) => {
//   //

//   try {
//     const contactList = await listContacts();

//     const idx = contactList.findIndex(({ id }) => id == contactId);

//     if (!~idx) return;

//     const contact = contactList[idx];

//     const dataToUpdateObj = { ...contact, ...body };

//     const updatedContact = { ...contact, ...dataToUpdateObj };

//     contactList[idx] = updatedContact;

//     await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

//     return contactList[idx];
//   } catch (error) {
//     throw error;
//   }
//   //
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
