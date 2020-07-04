import { LikeNestedObject } from '../../types';
export default class Aggregator {
    static aggregateBreed(filters: LikeNestedObject, key: string) {
        filters.Breed[key] ? filters.Breed[key]++ : filters.Breed[key] = 1;
    };

    static aggregateGender(filters: LikeNestedObject, key: string) {
        filters.Gender[key] ? filters.Gender[key]++ : filters.Gender[key] = 1;
    };

    static aggregateOrigin(filters: LikeNestedObject, key: string) {
        filters.Origin[key] ? filters.Origin[key]++ :filters.Origin[key] = 1;
    }

    static aggregateAdoption(filters: LikeNestedObject, isAdopted: boolean) {
        if (isAdopted) {
            filters["Adoption Status"]['Adopted']++;
        }
        else {
            filters["Adoption Status"]['Not Adopted']++;
        }
    }
}
