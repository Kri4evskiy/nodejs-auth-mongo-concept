import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  try {
    const contacts = await readContacts();

    for (let i = 0; i < number; i++) {
      const randomContact = createFakeContact();
      contacts.push(randomContact);
    }

    await writeContacts(contacts);
  } catch (err) {
    console.log(err);
  }
};

generateContacts(3);
