import React from 'react';
import {Card } from "react-bootstrap";
import { Breed } from '../../types';
import ExternalLinks from './ExternalLinks';

export default function BreedDetailInfo(props:Breed) {
    return (
        <Card className="text-left bg-transparent shadow-sm">
        <Card.Body className="mt-sm-4">
            <Card.Title>{props.origin}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Origin</Card.Subtitle>
            <Card.Title>{props.life_span} years</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Life Span</Card.Subtitle>
            <Card.Title>{props.temperament}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Temperament</Card.Subtitle>
            <Card.Title>Imperial: {props.weight?.imperial}, Metric: {props.weight?.imperial}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Weight</Card.Subtitle>
            <hr />
            <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
            <Card.Text>{props.description}</Card.Text>
            <hr />
            <Card.Subtitle className="mb-2 text-muted">External Links</Card.Subtitle>
            <ExternalLinks url={props.cfa_url} text={`Read More about ${props.name}`}/>
            <ExternalLinks url={props.wikipedia_url} text="Wikipedia"/>
        </Card.Body>
    </Card>
    )
}
