import {BlocDepense} from "./BlocDepense";

export class Depense {
  id!: number;
  objectif!: string;
  description!: string;
  preuvePaiementPath!: string;
  mode?: ModePaiement;
  blocDepenses!: BlocDepense[];
  montantTotal !: number;
  datePaiement!: Date;
  dateDebut!: Date;
  dateFin!: Date;
  checked!: boolean;

}

export enum ModePaiement {
  Cash = 'Cash',
  Cheque = 'Cheque',
  Virement = 'Virement'
}
