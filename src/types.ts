export interface Cat {
	url: string;
	id: string;
	width: number;
	height: number;
	name: string;
	gender: string;
	breed: string;
	origin: string;
	isAdopted: boolean;
	adoptedDate:string;
}

export interface Breed {
	id?: string;
	name?: string;
	alt_names?: string;
	experimental?: number;
	hairless?: number;
	hypoallergenic?: number;
	life_span?: string;
	natural?: number;
	origin?: string;
	rare?: number;
	reference_image_id?: string;
	rex?: number;
	short_legs?: number;
	suppressed_tail?: number;
	temperament?: string;
	weight_imperial?: string;
	wikipedia_url?: string;
	adaptability?: number;
	affection_level?: number;
	child_friendly?: number;
	energy_level?: number;
	grooming?: number;
	health_issues?: number;
	indoor?: number;
	intelligence?: number;
	social_needs?: number;
	shedding_level?: number;
	stranger_friendly?: number;
	vocalisation?: number;
	lap?: number;
	country_code?: string;
	description?: string;
	cfa_url?: string;
	weight?: { imperial: string };
	metric?: { imperial: string; metric: string };
}

export type Filter = {
	label: string;
	count: number;
};
export type LikeStringValueObject = { 
	[key: string]: string 
};

export type LikeNumberValueObject = { 
	[key: string]: number 
};

export type LikeNestedObject = { 
	Breed: LikeNumberValueObject,
	Gender: LikeNumberValueObject,
	Origin: LikeNumberValueObject ,
	'Adoption Status': LikeNumberValueObject ,
};
