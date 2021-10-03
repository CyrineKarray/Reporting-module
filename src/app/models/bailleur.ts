import { Financement } from "./financement";

export interface Bailleur {
    id?: any;
    code: number;
    intitule: string;
    adresse: string;
    ville: string;
    telephone: string;
    fax: string;
    email: string;
    somme_participation: number;
    financement : any; 
}