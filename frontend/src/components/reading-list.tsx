import { ListItemText, Grid, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Book } from '../types/types';


interface ReadingListProps {
  books: Book[];
  onRemoveBook: (bookTitle: string) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ books, onRemoveBook }) => {
  return (
    <Grid container spacing={4}>
      {books.map(book => (
        <Grid item xs={6} md={2} key={book.id}
        >
          <img src={book.coverPhotoURL} alt={`${book.title} cover`} style={{ backgroundSize: 'auto', width: '100%', height: 'auto', marginRight: 10 }} />
          <ListItemText 
           primary={book.title} 
           secondary={book.author} 
          />
          <Button color='error' variant='outlined' onClick={() => onRemoveBook(book.title)}>
            remove 
            <DeleteIcon />
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReadingList;
