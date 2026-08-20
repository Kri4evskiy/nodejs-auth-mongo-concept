import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  try {
    const contacts = await readContacts();
    contacts.pop();
    await writeContacts(contacts);
  } catch (err) {
    console.log(err);
  }
};

removeLastContact();
