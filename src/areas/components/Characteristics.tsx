import React from 'react';
import {Card, Table } from "react-bootstrap";
import { Breed } from '../../types';
import Row from './Row';

export default function Characteristics(props:Breed) {
    return (
        <Card className="text-left bg-transparent shadow-sm">
        <Card.Body>
            <Table responsive hover className="text-left" size="sm">
                <thead>
                    <tr>
                        <th>Charateristic</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    <Row name="Adaptability" rating={props.adaptability} />
                    <Row name="Affection Level" rating={props.affection_level} />
                    <Row name="Child Friendly" rating={props.child_friendly} />
                    <Row name="Energy Level" rating={props.energy_level} />
                    <Row name="Experimental" rating={props.experimental} />
                    <Row name="Grooming" rating={props.grooming} />
                    <Row name="Hairless" rating={props.hairless} />
                    <Row name="Health Issues" rating={props.health_issues} />
                    <Row name="Hypoallergenic" rating={props.hypoallergenic} />
                    <Row name="Indoor" rating={props.indoor} />
                    <Row name="Intelligence" rating={props.intelligence} />
                    <Row name="Natural" rating={props.natural} />
                    <Row name="Rare" rating={props.rare} />
                    <Row name="Lap" rating={props.lap} />
                    <Row name="Rex" rating={props.rex} />
                    <Row name="Shedding Level" rating={props.shedding_level} />
                    <Row name="Short Legs" rating={props.short_legs} />
                    <Row name="Social Needs" rating={props.social_needs} />
                    <Row name="Stranger Friendly" rating={props.stranger_friendly} />
                    <Row name="Suppressed Tail" rating={props.suppressed_tail} />
                    <Row name="Vocalisation" rating={props.vocalisation} />
                </tbody>
            </Table>
        </Card.Body>
    </Card>
    )
}
