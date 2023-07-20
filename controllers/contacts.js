import Contact from "../models/contact.js";
import {HttpError, ctrlWrapper } from "../helpers/index.js";

const getListContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getContactId = async (req, res) => {
//   const { id } = req.params;
//   const result = await getContactById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const add = async (req, res) => {
//   const result = await addContact(req.body);
//   res.status(201).json(result);
// };

// const deleteById = async (req, res) => {
//   const { id } = req.params;

//   const result = await removeContact(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "Contact deleted",
//   });
// };

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const result = await updateContact(id, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

export default {
  getListContacts: ctrlWrapper(getListContacts),
  // getContactId: ctrlWrapper(getContactId),
  // add: ctrlWrapper(add),
  // deleteById: ctrlWrapper(deleteById),
  // updateById: ctrlWrapper(updateById),
};
