import { db } from '../utils/db.server';

type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

const listAuthors = async (): Promise<Author[]> => {
  return db.author.findMany({
    select: { id: true, firstName: true, lastName: true },
  });
};

const getAuthor = async (id: number): Promise<Author | null> => {
  return db.author.findUnique({ where: { id } });
};

export { listAuthors, getAuthor };
