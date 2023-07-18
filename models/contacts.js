import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid"; //yarn add nanoid@3.3.4

const contactsPath = path.resolve("models", "contacts.json");

const updateContactsStorage = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactIdString = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactIdString);
  return result || null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: String(nanoid()),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContactsStorage(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contactIdString = String(contactId);
  // console.log(contactId);
  // console.log(contactIdString);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactIdString);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContactsStorage(contacts);
  return result;
};

const updateContact = async (id, body) => {
  const contactIdString = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactIdString);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await updateContactsStorage(contacts);
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
