import { Domaine } from "./Domaine.Entity";

export class Tuteur{
    constructor(
      public id? : number,
      public nom? : string,
      public prenom? : string,
      public email? : string,
      public password? : string,
      public image? : string,
      public etat? : boolean,
      public domaine?: Domaine,

    )
    {}
}