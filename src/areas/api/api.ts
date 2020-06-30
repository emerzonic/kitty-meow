import axios from 'axios';
import { Breed, Cat } from '../../types';
import Faker from 'faker';
axios.defaults.headers['x-api-key'] = 'ccef54e7-98da-4c95-810d-47f3079fe24a';

export async function getCats() {
	try {
        const cats: Cat[] = getDataFromLocalStorageByKey('cat-list');

        if (cats.length) {
			return cats;
        }
        
		const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=100&page=1&order=Desc');
        const genders = ['female', 'male'];
        const data = response.data.map((d:any) => {
            const gender = genders[Math.floor(Math.random() * genders.length)];
            const name = Faker.name.firstName(gender === 'male'? 1: 2);
            return {
            url: d.url,
            height:d.height,
            name: name,
            id: d.id,
            gender: gender,
            breeds: getBreed(d.breed),
            width: d.width
            };
        });
        setDataInLocalStorageWithKey('cat-list', data);
        return response.data;
	} catch (error) {
		throw new Error(error.message);
	}
}

function getBreed(breeds:any[]) {
    if (breeds?.length) {
        return breeds[0].name;
    }
    const catBreeds:Breed[] = getDataFromLocalStorageByKey('cat-breeds-details');
    const breed = catBreeds[Math.floor(Math.random() * catBreeds.length)].name;   
    return breed;
}

export async function getCatBreeds() {
	try {
        await getCats()
		const breeds:Breed[] = getDataFromLocalStorageByKey('cat-breeds-details');
        
        if (breeds.length) {
			return breeds;
        }
        
		const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        setDataInLocalStorageWithKey('cat-breeds-details',response.data);
        return response.data;
	} catch (error) {
		throw new Error(error.message);
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
		throw new Error(error.message);
	}
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
