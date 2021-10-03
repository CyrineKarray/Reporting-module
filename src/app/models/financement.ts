export interface Financement{
    id?:any;
    code: number;
    date: Date;
    montant_device: number;
    montant_monnaie_local: number;
    taux_change: number;
    date_signature: Date;
    date_premier_paiement: Date;
    date_dernier_paiement: Date;
    numero_loi_finance: string;
    date_loi_finance: Date;
    bailleur: any;
}