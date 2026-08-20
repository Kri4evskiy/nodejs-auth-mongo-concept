import { ContactCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

export const addContact = async (contactData) => {
  const contact = new ContactCollection(contactData);
  await contact.save();
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findByIdAndDelete(contactId);
  return contact;
};

export const updateContact = async (contactId, contactData) => {
  const contact = await ContactCollection.findByIdAndUpdate(contactId, contactData, {
    new: true,
    runValidators: true,
  });
  return contact;
};
