import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthorService from './author.service';
import { request } from 'http';

const authorRouter = express.Router();

//GET: List of all authors
authorRouter.get('/', async (_: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return response.status(200).json(authors);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: single author by id
authorRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return response.status(200).json(author);
    }

    return response.status(400).json({ error: 'Author could not be found' });
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export { authorRouter };
