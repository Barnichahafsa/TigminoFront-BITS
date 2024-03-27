// residence.ts
import {AdminWeb} from "./AdminWeb";
import {Appartement} from "./Appartement";

export class Residence {
  id!: number;
  nom!: string;
  adresse!: string;
  syndic!: AdminWeb;
  appartements!: Appartement[];
}
