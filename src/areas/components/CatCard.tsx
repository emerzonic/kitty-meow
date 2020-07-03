import React, { useState, SetStateAction, Dispatch } from 'react';
import { Card, Button, Spinner } from "react-bootstrap";
import { Cat } from "../../types";
import { GenderMapping } from '../constants';

interface CatCardProps {
  setAdopted: Dispatch<SetStateAction<{ id: string, date: string }>>;
  cat: Cat;
}
export default function CatCard({cat, setAdopted}: CatCardProps) {
  const [styles, setStyles] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasBeenAdopted, setHasBeenAdopted] = useState(false);
  const [adoptedDate, setAdoptedDate] = useState('');

  const handleSetStyles = () => {
    styles ?
      setStyles('') :
      setStyles('shadow-lg');
  }

  const handleOnclick = () => {
    const adoptedDate = new Date().toLocaleDateString();
    setIsLoading(true);
    setTimeout(() => {
      setAdopted({ date: adoptedDate, id: cat.id });
      setAdoptedDate(adoptedDate);
      setHasBeenAdopted(true);
      setIsLoading(false);
    }, 3000);

  }

  const isAdopted = cat.isAdopted;
  const adoptedText = `Adopted on ${adoptedDate || cat.adoptedDate}`;
  const buttonText = isAdopted || hasBeenAdopted ? adoptedText : `Adopt ${cat.name}`;

  return (
    <Card key={cat.id} className={`text-left ${styles}`} onMouseOver={handleSetStyles} onMouseLeave={handleSetStyles}>
      <Card.Img variant="top" src={cat.url} />
      <Card.Body>
        <Card.Title>Name: {cat.name}</Card.Title>
        <hr className="my-1"/>
        <p className="mb-1">Breed: {cat.breed}</p>
        <p className="mb-1">Origin: {cat.origin}</p>
        <p className="mb-1">Genger: {GenderMapping[cat.gender]}</p>
        <p className="mb-1">Body: Height {cat.height} Width {cat.width}</p>
      </Card.Body>
      <Card.Footer>
        <Button onClick={handleOnclick} disabled={isAdopted || hasBeenAdopted} className="w-100">
          {isLoading ? <Spinner className="mr-2" size="sm" animation="border" /> : null}
          {isLoading ? 'Processing...' : buttonText}
        </Button>
      </Card.Footer>
    </Card>
  )
}
