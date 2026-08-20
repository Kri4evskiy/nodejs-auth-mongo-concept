import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/api-docs', swaggerDocs());
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router); // Додаємо роутер до app як middleware

  app.use(notFoundHandler);
  app.use(errorHandler);

  // app.get('/contacts', async (req, res) => {
  //   const contacts = await getAllContacts();

  //   res.status(200).json({
  //     message: 'All contacts get successfully!',
  //     data: contacts,
  //   });
  // });

  // app.get('/contacts/:contactId', async (req, res) => {
  //   const { contactId } = req.params;
  //   const contact = await getContactById(contactId);

  //   // Відповідь, якщо контакт не знайдено
  //   if (!contact) {
  //     res.status(404).json({
  //       message: 'Contact not found',
  //     });
  //     return;
  //   }

  //   // Відповідь, якщо контакт знайдено
  //   res.status(200).json({ data: contact });
  // });

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
