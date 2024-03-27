import {Residence} from "./Residence";

export class AdminWeb {
  pseudoname!: string;
  passkey!: string;
  role!: AdminRole;
  nom!: string;
  prenom!: string;
  contact!: bigint;
  dept_code!: string;
  nbr_session_allowed: any;
  number_of_tries_allowed: any;
  block_access: any;
  date_end_passkey: any;
  date_start_passkey: any;
  id!: number;
  residence!: Residence;


}

export enum AdminRole {
  SUPERADMIN = 'SUPERADMIN',
  SYNDIC = 'SYNDIC'
}

