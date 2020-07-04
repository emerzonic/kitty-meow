import React, { useEffect, useState } from 'react';
import { getCats, getCatBreeds, getCatBreedDetail, filterCats, addAdoptedCat, buildFilters } from './api/api';
import { CardColumns } from 'react-bootstrap';
import { Cat, Breed, LikeNestedObject } from '../types';
import NavBar from './components/NavBar';
import CatCard from './components/CatCard';
import CatBreedSelector from './components/CatBreedSelector';
import CatBreedDetail from './components/CatBreedDetail';
import ActionToggleButton from './components/ActionToggleButton';
import Filters from './Filters';

export default function Home() {
	const [breeds, setBreeds] = useState<Breed[]>([]);
	const [cats, setCats] = useState<Cat[]>([]);
	const [breedDetail, setBreedDetail] = useState<Breed>({});
	const [selectedBreed, setSelectedBreed] = useState<string>('');
	const [view, setView] = useState<string>('adopt');

	const initial = {
		Breed: {},
		Gender: {},
		Origin: {},
		'Adoption Status': { Adopted: 0, 'Not Adopted': 0 },
	};
	const [filters, setFilters] = useState<LikeNestedObject>(initial);
	const [filterValues, setFilterValues] = useState<string[]>([]);
	const [adopted, setAdopted] = useState<{ date: string, id: string }>({ id: '', date: '' });

	const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (e.target.checked) {
			setFilterValues([...filterValues, value]);
		} else {
			const newValues = filterValues.filter(v => v !== value);
			setFilterValues(newValues);
		}
	}

	useEffect(() => {
		const init = async () => {
			const catBreeds: Breed[] = await getCatBreeds();
			setBreeds(catBreeds);
			const cats: Cat[] = await getCats();
			if (cats?.length) {
				const catFilters = buildFilters(cats);
				setFilters(catFilters);
				setCats(cats);
			}
		};
		init();
	}, []);

	useEffect(() => {
		if (adopted.id) {
			addAdoptedCat(adopted);
			const callGetCats = async () => {
				const cats: Cat[] = await getCats();
				const catFilters = buildFilters(cats);
				setFilters(catFilters);
				setCats(cats);
			};
			callGetCats();
		}
	}, [adopted]);

	useEffect(() => {
		const callFilterCats = async () => {
			let cats: Cat[] = [];
			if (filterValues.length) {
				cats = filterCats(filterValues);
			} else {
				cats = await getCats();
			}
			const catFilters = buildFilters(cats);
			setFilters(catFilters);
			setCats(cats);
		}
		callFilterCats();
	}, [filterValues]);

	useEffect(() => {
		if (selectedBreed || view === 'learn') {
			const callGetCatBreedDetail = async () => {
				const detail: Breed = await getCatBreedDetail(selectedBreed);
				setBreedDetail(detail);
			};
			callGetCatBreedDetail();
		}
	}, [selectedBreed, view]);

	const adoptStyle = 'col-md-9 col-sm-12';
	const learnStyle = 'col-sm-12';
	
	return (
		<div className="">
			<NavBar />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-12 mt-md-5 mt-sm-2">
						<ActionToggleButton view={view} setView={setView} />
					</div>
					<div className="col-md-9 mt-md-5 mt-sm-2">
						{view === "learn" && <CatBreedSelector breeds={breeds} handleSelectedBreed={setSelectedBreed} />}
					</div>
				</div>
				<div className="row">
					{view === "adopt" && <div className="col-md-3 col-sm-12">
						<h4 className="p-2 mt-2 bg-light shadow-sm border">Filters</h4>
						<div className="w-100">
							<Filters filterOption={handleFiltering} group={filters.Breed} title="Breed" />
							<Filters filterOption={handleFiltering} group={filters.Gender} title="Gender" />
							<Filters filterOption={handleFiltering} group={filters.Origin} title="Origin" />
							<Filters filterOption={handleFiltering} group={filters["Adoption Status"]} title="Adoption Status" />
						</div>
					</div>}
					<div className={view === 'adopt' ? adoptStyle : learnStyle}>
						{view === "adopt" && (
							<CardColumns>{cats?.map((cat) => <CatCard key={cat.id} cat={cat} setAdopted={setAdopted} />)}</CardColumns>
						)}
						{view === "learn" && <CatBreedDetail {...breedDetail} />}
					</div>
				</div>
			</div>
		</div>
	);
}
