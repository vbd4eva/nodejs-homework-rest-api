// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const listContacts = async () => {
  // возвращает массив всех контактов в json-формате со статусом 200
  return { message: "template message : listContacts()" };
};

const getContactById = async (contactId) => {
  //   если такой id есть, возвращает обьект контакта в json-формате со статусом 200
  // если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
  return { message: `template message : getById(${contactId})` };
};

const removeContact = async (contactId) => {
  return { message: `template message : removeContact(contactId)` };
};

const addContact = async (body) => {
  return {
    message: `template message : addContact(body)`,
  };
};

const updateContact = async (contactId, body) => {
  return {
    message: `template message : (contactId, body)`,
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
