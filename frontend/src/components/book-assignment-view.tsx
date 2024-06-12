import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import BookSearch from './book-search';
import ReadingList from './reading-list';
import { Book } from '../types/types';

const BookAssignmentView= () => {
  const [readingList, setReadingList] = useState<Book[]>([]);

  const addBookToReadingList = (book: Book) => {
    setReadingList([...readingList, book]);
  };

  const removeBookFromReadingList = (bookTitle: string) => {
    setReadingList(readingList.filter(book => book.title !== bookTitle));
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" color={'#335C6E'} gutterBottom>
          Assign Book(s)
        </Typography>
        <BookSearch onAddBook={addBookToReadingList} />
        <div
        style={{
          marginTop: 10
        }}
        >
          <Typography variant="h4" color={'#335C6E'} gutterBottom>
            Assigned Book(s)
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <ReadingList books={readingList} onRemoveBook={removeBookFromReadingList} />
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default BookAssignmentView;

