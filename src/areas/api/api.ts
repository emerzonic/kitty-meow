import axios from 'axios';
import { Breed, Cat, LikeStringValueObject } from '../../types';
import Faker from 'faker';
import Aggregator  from './Aggregator';
import { GenderMapping } from '../constants';
axios.defaults.headers['x-api-key'] = 'ccef54e7-98da-4c95-810d-47f3079fe24a';

export async function getCats() {
    let cats = [];
	try {
        cats = getDataFromLocalStorageByKey('cat-list');

        if (cats.length) {
			return cats;
        }
        
		const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=100&page=1&order=Desc');
        
        if (!response.data) {
            return cats;
        }

        const genders = ['female', 'male'];
        cats = response.data.map((d:any) => {
            const gender = genders[Math.floor(Math.random() * genders.length)];
            const name = Faker.name.firstName(gender === 'male' ? 1 : 2);
            const {origin, breed} = getBreedData(d.breed);
            return {
                origin,
                breed,
                gender,
                name,
                url: d.url,
                height:d.height,
                id: d.id,
                width: d.width,
                isAdopted: false,
                adoptedDate: null
            };
        });
        setDataInLocalStorageWithKey('cat-list', cats);
        return cats;
	} catch (error) {
        console.log(error)
	}
}

function getBreedData(breeds:any[]):LikeStringValueObject{
    if (breeds?.length) {
        const breed = breeds[0];
        return {
            breed :breed.name , 
            origin: breed.origin
        };
    }
    const catBreeds:Breed[] = getDataFromLocalStorageByKey('cat-breeds-details');
    const breed: any = catBreeds[Math.floor(Math.random() * catBreeds.length)]; 
    return {
        breed :breed.name, 
        origin: breed.origin
    };
}

export async function getCatBreeds() {
	try {
		const breeds:Breed[] = getDataFromLocalStorageByKey('cat-breeds-details');
        
        if (breeds.length) {
			return breeds;
        }
        
		const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        setDataInLocalStorageWithKey('cat-breeds-details',response.data);
        return response.data;
	} catch (error) {
		console.log(error)
	}
}
export async function getCatBreedDetail(breedName: string) {
	try {
        const breeds: Breed[] = getDataFromLocalStorageByKey('cat-breeds-details');
        const breedDetail = breeds.find(b => b.name === breedName);
        
        if (breedDetail) {
            return breedDetail;
        }
        
        const response = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`);
		return response.data?.[0];
	} catch (error) {
		console.log(error)
	}
}
export function filterCats(values: string[]) {
        const cats: Cat[] = getDataFromLocalStorageByKey('cat-list');
        const filteredCats = cats.filter(cat => {
            const matched = values.includes(cat.breed) ||
                            values.includes(GenderMapping[cat.gender]) ||
                            values.includes(cat.origin) ||
                            (values.includes('Adopted') && cat.isAdopted) ||
                            (values.includes('Not Adopted') && !cat.isAdopted);
            return matched;
        });
        
		return filteredCats;
}

export function addAdoptedCat(adopted: {date:string, id:string}) {
        const cats: Cat[] = getDataFromLocalStorageByKey('cat-list');
        const updatedCats = cats.map(cat=>{
            if (cat.id === adopted.id) {
                cat.isAdopted = true;
                cat.adoptedDate = adopted.date;
            }
            return cat;
        })
        localStorage.removeItem('cat-list');
        setDataInLocalStorageWithKey('cat-list', updatedCats);
}

export function buildFilters(cats:Cat[]){
	const filterTemplate = {
		Breed: {}, 
		Gender: {},
		Origin: {},
		'Adoption Status': { Adopted: 0, 'Not Adopted': 0 },
	};

	if (!cats?.length) {
		return filterTemplate;
	}

	return cats.reduce((result, cat) => {
		Aggregator.aggregateBreed(result, cat.breed);
		Aggregator.aggregateGender(result, cat.gender);
		Aggregator.aggregateOrigin(result, cat.origin);
		Aggregator.aggregateAdoption(result, cat.isAdopted);
		return result;
	}, filterTemplate);
}

function getDataFromLocalStorageByKey(key: string) {
	const stringData = localStorage.getItem(key);
	if (!stringData) {
		return [];
	}
	return JSON.parse(stringData);
}

function setDataInLocalStorageWithKey(key: string, data: any) {
	const stringData = JSON.stringify(data);
	localStorage.setItem(key, stringData);
}
