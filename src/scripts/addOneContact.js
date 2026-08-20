import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
  try {
    const contacts = await readContacts();
    const randomContact = createFakeContact();
    contacts.push(randomContact);
    console.log(contacts);
    await writeContacts(contacts);
  } catch (err) {
    console.log(err);
  }
};

addOneContact();
