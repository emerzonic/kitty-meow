import React, { useState } from 'react';
import { Card, ListGroup, Accordion, Button } from 'react-bootstrap';
import CheckBox from './CheckBox';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export interface FilterProps {
    filterOption: (e: any) => void,
    group: any;
    title: string;
}

export default function Filters(props: FilterProps) {
    const [open, setOpen] = useState(false);
    return (
        <Accordion className="my-2">
            <Card>
                <Card.Header className="p-2 d-flex justify-content-between">
                    <h6 className="h6 mb-0 p-1"> {props.title}</h6>
                    <Accordion.Toggle className="p-0" as={Button} onClick={() => setOpen(!open)} variant="link" eventKey={props.title}>
                        {open ?
                            <MdKeyboardArrowUp className="h3 mb-0 p-0" /> :
                            <MdKeyboardArrowDown className="h3 mb-0 p-0" />
                        }
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.title}>
                    <Card.Body className="p-0 filter-body">
                        <ListGroup className="border-0">
                            {Object.keys(props.group).sort()
                                .map((label: string) => {
                                    const count: number = props.group[label];
                                    return (<CheckBox
                                        key={label}
                                        label={label}
                                        count={count}
                                        filterOption={props.filterOption} />
                                    );
                                })}
                        </ListGroup>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};
