const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");
// const contacts = require("./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    const contact = contactList.find(({ id }) => id == contactId);
    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  // Получает параметр contactId
  // вызывает функцию removeContact для работы с json-файлом contacts.json
  // если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
  // если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
  // return { message: `template message : removeContact(contactId)` };

  // ...твой код
  try {
    const contactsList = await listContacts();
    let deletedContact = {};
    const updatedContactsList = contactsList.filter((contact) => {
      if (contact.id != contactId) {
        return true;
      }
      deletedContact = { ...contact };
    });

    if (!Object.keys(deletedContact).length) return;

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactsList),
      null,
      2
    );

    return deletedContact;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  console.log(body);
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    return;
  }

  try {
    const contactsList = await listContacts();
    const id = nanoid();
    const newContact = { id, name, email, phone };
    contactsList.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contactsList), null, 2);
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  //

  try {
    const contactList = await listContacts();

    const idx = contactList.findIndex(({ id }) => id == contactId);

    if (!~idx) return;

    const contact = contactList[idx];

    const dataToUpdateObj = { ...contact, ...body };

    const updatedContact = { ...contact, ...dataToUpdateObj };

    contactList[idx] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contactList), null, 2);

    return contactList[idx];
  } catch (error) {
    throw error;
  }
  //
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
