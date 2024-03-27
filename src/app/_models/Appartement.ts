import {Residence} from "./Residence";
import {MobUser} from "./MobUser";

export class Appartement {
  id!: number;
  number!: number;
  residence!: Residence;
  proprietaire?: MobUser;

}
