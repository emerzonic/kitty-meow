import React, { Dispatch, SetStateAction } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

interface ActionToggleButtonProps {
    setView: Dispatch<SetStateAction<string>>;
    view: string;
}

export default function ActionToggleButton(props: ActionToggleButtonProps) {
    const handleChange = (val: any) => props.setView(val);

    return (
        <div className="mt-5">
            <h4 className="text-left h4">What will you like to do?</h4>
            <ToggleButtonGroup className="text-left" type="radio" name="toggle" value={props.view} onChange={handleChange}>
                <ToggleButton className="mx-1" name="adopt" value={'adopt'}>Adopt A Cat</ToggleButton>
                <ToggleButton className="mx-1" name="learn" value={'learn'}>Learn About Cats</ToggleButton>
            </ToggleButtonGroup>
        </div>

    );
}
