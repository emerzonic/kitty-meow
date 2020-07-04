import React, { Dispatch, SetStateAction } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

interface ActionToggleButtonProps {
    setView: Dispatch<SetStateAction<string>>;
    view: string;
}

export default function ActionToggleButton(props: ActionToggleButtonProps) {
    const handleChange = (val: any) => props.setView(val);

    return (
        <div>
            <h4 className="text-left h5 mt-2">What will you like to do?</h4>
            <ToggleButtonGroup className="w-100" type="radio" name="toggle" value={props.view} onChange={handleChange}>
                <ToggleButton className="mx-sm-1 ml-md-0" name="adopt" value={'adopt'}>Adopt</ToggleButton>
                <ToggleButton className="mx-sm-1 mr-md-0" name="learn" value={'learn'}>Learn</ToggleButton>
            </ToggleButtonGroup>
        </div>

    );
}
