import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Book = (props) => {
  const { title, shortDescription, thumbnailUrl} = props.data

  const [isFav, setIsFav] = useState(false);
  const [isWish, setIsWish] = useState(false);

  const toggleFav = () => {
    setIsFav((isFav) => !isFav);
  }

  const toggleWish = () => {
    setIsWish((isWish) => !isWish);
  }
    
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={thumbnailUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {shortDescription}
        </Card.Text>
        <Button variant="success" onClick={() => { toggleFav(); props.addToFavList(props.data)}}>{isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}</Button>
        <Button variant="primary" onClick={() => { toggleWish(); props.addToWishList(props.data)}}>{isWish ? 'Retirer des souhaits' : 'Ajouter aux souhaits'}</Button>
      </Card.Body>
    </Card>
  );
}

export default Book;
