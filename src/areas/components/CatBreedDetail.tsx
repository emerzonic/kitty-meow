import React from 'react'
import { Breed } from '../../types';
import { Jumbotron } from "react-bootstrap";
import BreedDetailInfo from './BreedDetailInfo';
import Characteristics from './Characteristics';


export default function CatBreedDetail(props: Breed) {
    return (
        <Jumbotron className="w-100">
            {props.id ? (
                <>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-left">{props.name}</h1>
                            <h4 className="text-left">Breed</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Characteristics {...props} />
                        </div>
                        <div className="col-md-6">
                            <BreedDetailInfo {...props} />
                        </div>
                    </div>
                </>) :
                (<h4 className="h3 text-center">Select a breed from the dropdown</h4>)
            }
        </Jumbotron>
    )
}
