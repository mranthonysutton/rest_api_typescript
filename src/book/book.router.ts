import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as BookService from './book.service';
import { request } from 'http';

export const bookRouter = express.Router();

// GET: list all books
bookRouter.get('/', async (request: Request, response: Response) => {
  try {
    const books = await BookService.listBooks();
    return response.status(200).json(books);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: book by id
bookRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    const book = await BookService.getBook(id);
    if (book) {
      return response.status(200).json(book);
    }

    return response.status(404).json({ message: 'Book could not be found' });
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: create new book
bookRouter.post(
  '/',
  body('title').isString(),
  body('authorId').isInt(),
  body('datePublished').isDate().toDate(),
  body('isFiction').isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const book = request.body;
      const newBook = await BookService.createBook(book);
      return response.status(201).json(newBook);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// PUT: update book
bookRouter.put(
  '/:id',
  body('title').isString(),
  body('authorId').isInt(),
  body('datePublished').isDate().toDate(),
  body('isFiction').isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const id: number = parseInt(request.params.id, 10);

    try {
      const book = request.body;
      const updatedBook = await BookService.updateBook(book, id);
      return response.status(201).json(updatedBook);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE: delete book
bookRouter.delete('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    await BookService.deleteBook(id);
    return response
      .status(204)
      .json({ message: 'Book was successfully deleted' });
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
