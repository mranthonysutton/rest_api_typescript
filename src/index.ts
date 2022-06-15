import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { authorRouter } from './author/author.router';
import { bookRouter } from './book/book.router';

dotenv.config();

// Closes the application if no port in .env
if (!process.env.PORT) {
  process.exit(1);
}

// Checks if port exists, if not sets it to default value of 8000
const PORT = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
