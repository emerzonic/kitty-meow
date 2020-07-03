import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

type CheckBoxProps = {
    label: string;
    count: number;
    filterOption: (e: any) => void;
};
export default function CheckBox(props: CheckBoxProps){
    const [check, setCheck] = useState<boolean>(false);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.checked);
        props.filterOption(e);
    };

    return (
        <ListGroup.Item className="px-2 py-1">
            <label className="m-0">
                <input
                    checked={check}
                    onChange={handleCheck}
                    className="mr-2"
                    type="checkbox"
                    value={props.label} />
                {props.label} ({props.count})
        </label>
        </ListGroup.Item>
    );
};
