import { gql, useQuery } from '@apollo/client';
import { Box, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from '@mui/material';
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Book } from '../types/types';
  
  interface BookSearchProps {
    onAddBook: (book: Book) => void;
  }
  
  const GET_BOOKS = gql`
    query GetBooks{
        books {
            title
            author
            coverPhotoURL
            readingLevel
        }
    }
  `;

const BookSearch: React.FC<BookSearchProps> = ({onAddBook}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const { data, loading, error } = useQuery(GET_BOOKS)
    const [ isFocused, setIsFocused ] = useState(false)

    if(loading) return <p>Loading ...</p>
    if(error) return <p>Error: {error.message}</p>
    
    const filteredBooks = data.books.filter((book: Book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div>
        <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={()=>setIsFocused(true)}
        onBlur={()=>setIsFocused(false)}
        margin="normal"
        />
        {isFocused &&(
          <Box
          mt={2}
          style={{
            maxHeight: 300,
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
          >
            <List>
            {filteredBooks.map((book: Book, i: number) => (
              <ListItem key={i}>
                <img src={book.coverPhotoURL} alt={`${book.title} cover`} style={{ width: 50, height: 50, marginRight: 10 }} />
                <ListItemText 
                  primary={book.title} 
                  secondary={book.author} 
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="add" onMouseDown={() => onAddBook(book)}>
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            </List>
          </Box>
        )}
    </div>
  )
}

export default BookSearch