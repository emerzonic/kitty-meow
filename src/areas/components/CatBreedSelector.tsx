import React, { Dispatch, SetStateAction } from 'react';
import { Form } from "react-bootstrap";
import { Breed } from '../../types';

interface CatBreedProps {
    breeds: Breed[];
    handleSelectedBreed: Dispatch<SetStateAction<string>>
}
export default function CatBreedSelector(props: CatBreedProps) {
    
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.handleSelectedBreed(e.target.value);
    };

    return (
        <div> 
            <Form className="mt-5 text-left">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="text-left h4">Cat Breeds</Form.Label>
                    <Form.Control as="select" onChange={handleSelect} >
                        <option disabled selected hidden>Select cat breed to filter.</option>
                        {props.breeds.map(b => (
                        <option 
                            key={b.id} 
                            value={b.name}
                        >
                            {b.name}
                        </option>
                        ))
                        }
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}
