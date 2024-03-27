import {Residence} from "./Residence";
import {Appartement} from "./Appartement";


export class MobUser {
  id!: number;
  passkey!: string;
  blockAccess!: string;
  numberOfTriesAllowed!: number;
  nom!: string;
  prenom!: string;
  tel!: string;
  dateNaissance!: Date;
  pseudoname!: string;
  sexe!: string;
  type!: UserType;
  cin !: String;
  appartement!: Appartement;
  residence!: Residence;
  service!: string;

}

export enum UserType {
  COPROPRIETAIRE = 'COPROPRIETAIRE',
  AGENT = 'AGENT'
}
