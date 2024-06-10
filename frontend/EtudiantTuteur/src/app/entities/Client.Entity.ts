import { Specialite } from "./Specialite.Entity";

export class Client{
    constructor(
      public id? : number,
      public nom? : string,
      public prenom? : string,
      public email? : string,
      public password? : string,
      public image?: string,
      public specialite? : Specialite ,
      
    )
    {}
}