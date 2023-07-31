import React, { useEffect, useState } from 'react';
import Book from './Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const BookType = () => {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favList, setFavList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [filteredBookList, setFilteredBookList] = useState(bookList);
  const [value, setValue] = useState([1, 2]);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/MathisDYKDan/76bc73ec77481ccb82677cc7c0d8b524/raw/a23c99027b9bfc1bfdb22e22ddcb4301a5f870ee/books.json')
      .then((response) => response.json())
      .then((data) => {
        setBookList(data.books);
        setFilteredBookList(data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const addToFavList = (book) => {
    if (favList.includes(book)) {
      setFavList((prevFavList) => {
        const updatedFavList = prevFavList.filter((favBook) => favBook !== book);
        console.log(updatedFavList)
        return updatedFavList;
      })
    } else {
      setFavList((prevFavList) => {
        const updatedFavList = [...prevFavList, book];
        console.log(updatedFavList)
        return updatedFavList;
      });
    }
  };
  
  const addToWishList = (book) => {
    if (wishList.includes(book)) {
      setWishList((prevWishList) => {
        const updatedWishList = prevWishList.filter((WishBook) => WishBook !== book);
        console.log(updatedWishList)
        return updatedWishList;
      })
    } else {
      setWishList((prevWishList) => {
        const updatedWishList = [...prevWishList, book];
        console.log(updatedWishList)
        return updatedWishList;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target[0].value
    console.log(input)
    const filteredBooks = bookList.flat().filter(book => book.title.toLowerCase().includes(input.toLowerCase()));
    console.log(filteredBooks)
    setFilteredBookList(filteredBooks);
  }

  const handleChange = (event) => {
    console.log(event);
  }

  return (
    <div>
      <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
        <ToggleButton id="tbg-btn-1" value={1}>
          Favoris
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value={2}>
          Souhaits
        </ToggleButton>
      </ToggleButtonGroup>
      <div className="SearchBar">
        <form onSubmit={handleSubmit}>
          <label>
            Rechercher:
            <input type="text" placeholder='Entrer un titre'/>
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </div>
      <div className="d-flex flex-wrap">
        <div>
          <p> Favoris</p>
          <ul>
            {favList.map((book, index) => (
              <li key={index}>{book.title}</li>
            ))}
          </ul>
          <p> Souhaits</p>
          <ul>
            {wishList.map((book, index) => (
              <li key={index}>{book.title}</li>
            ))}
          </ul>
          <br />
        </div>
        {filteredBookList.flat().map((book, index) => (
            <Book
              key={index}
              data={book}
              addToFavList={addToFavList}
              addToWishList={addToWishList}
            />
        ))}
      </div>
    </div>
  );
};

export default BookType;
