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
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="text-left h5 mt-sm-2">Cat Breeds</Form.Label>
                    <Form.Control as="select" onChange={handleSelect} >
                        <option disabled selected hidden>Select a breed...</option>
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
