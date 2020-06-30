import React,{useState} from 'react';
import { Card, Button} from "react-bootstrap";
import { Cat } from "../../types";

export default function CatCard(props: Cat) {
const [styles, setStyles] = useState('');
const handleSetStyles = ()=>{
  styles? 
  setStyles('') :
  setStyles('shadow-lg');
}
    return (
        <Card key={props.id} className={`text-left ${styles}`} onMouseOver={handleSetStyles} onMouseLeave={handleSetStyles}>
        <Card.Img variant="top" src={props.url} />
        <Card.Body>
          <Card.Title>Name: {props.name}</Card.Title>
            <hr/>
            <p className="mb-1">Breed: {props.breeds}</p>
            <p className="mb-1">Genger: {props.gender}</p>
            <p className="mb-1">Body: Height {props.height} Width {props.width}</p>
        </Card.Body>
        <Card.Footer>
    <Button className="w-100">Adopt {props.name}</Button>
        </Card.Footer>
      </Card>
    )
}
