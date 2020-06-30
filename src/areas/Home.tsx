import React, { useEffect, useState } from 'react';
import { getCats, getCatBreeds, getCatBreedDetail } from './api/api';
import { CardColumns } from 'react-bootstrap';
import { Cat, Breed } from '../types';
import NavBar from './components/NavBar';
import CatCard from './components/CatCard';
import CatBreedSelector from './components/CatBreedSelector';
import CatBreedDetail from './components/CatBreedDetail';
import ActionToggleButton from './components/ActionToggleButton';

export default function Home() {
    const [ cats, setCats ] = useState<Cat[]>([]);
	const [ breeds, setBreeds ] = useState<Breed[]>([]);
	const [ breedDetail, setBreedDetail ] = useState<Breed>({});
	const [ selectedBreed, setSelectedBreed ] = useState<string>('');
	const [ view, setView ] = useState<string>('adopt');

	useEffect(() => {
		const callGetCatBreeds = async () => {
			const catBreeds: Breed[] = await getCatBreeds();
			setBreeds(catBreeds);
		};
		callGetCatBreeds();
    }, []);
    
    useEffect(() => {
		const callGetCats = async () => {
			const cats:Cat[] = await getCats();
			setCats(cats);
		};
		callGetCats();
	}, []);

	useEffect(() => {
			if (selectedBreed || view === 'learn') {
				const callGetCatBreedDetail = async () => {
					const detail: Breed = await getCatBreedDetail(selectedBreed);
          setBreedDetail(detail);
				};
				callGetCatBreedDetail();
			}
        },[ selectedBreed, view ]);
  
	return (
		<div className="App">
			<NavBar />
			<div className="container">
				<div className="row">
                	<div className="col-md-6">
						<ActionToggleButton view={view} setView={setView}/>
					</div>
					<div className="col-md-6">
						<CatBreedSelector breeds={breeds} handleSelectedBreed={setSelectedBreed} />
					</div>
				</div>
				<div className="row">
					{view === "adopt" && (
						<CardColumns>{cats.map((cat) => <CatCard key={cat.id} {...cat} />)}</CardColumns>
					)}
					{view === "learn" && <CatBreedDetail {...breedDetail} />}
				</div>
			</div>
		</div>
	);
}
