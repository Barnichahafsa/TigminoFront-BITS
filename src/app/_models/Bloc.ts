import {Residence} from "./Residence";
import {BlocDepense} from "./BlocDepense";

export class Bloc {
  id!: number;
  nom!: string;
  residence!: Residence;
  blocDepenses!: BlocDepense[];

}
