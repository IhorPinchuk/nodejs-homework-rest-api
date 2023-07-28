import contactModel from "../models/contact.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const { Contact } = contactModel;

const getListContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.find({owner}, "-createdAt -updatedAt");
  res.json(result);
};

const getContactId = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const {_id: owner} = req.user;
  console.log(req.user)
  console.log(owner)
  console.log(req.user)
  const result = await Contact.create({...req.body, owner});  
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  getListContacts: ctrlWrapper(getListContacts),
  getContactId: ctrlWrapper(getContactId),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
