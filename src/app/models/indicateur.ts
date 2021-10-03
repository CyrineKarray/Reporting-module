export interface Indicateur {
    id?: number;
    code: number;
    designation: string;
    frequence: string;
    methodologie: string;
    hypothese: string;
    formule:string;
    resp_collecte: string;
    resp_synthese: string;
    source_donnees: string;
    nature: string;
    definition: string;
    origine: string;
    risque: string;
    decoupages?: any;
    financements?: any;
    parametre?: any;
    type?: any;
    unite?: any;
  }