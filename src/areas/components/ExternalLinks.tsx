import React from 'react';
import { Card } from "react-bootstrap";
export default function ExternalLinks(props: { url?: string; text: string; }) {

    if (!props.url) {
        return null;
    }

    return (
        <Card.Link
            target="_blank"
            href={props.url}
        >
            {props.text}
        </Card.Link>
    );
}
