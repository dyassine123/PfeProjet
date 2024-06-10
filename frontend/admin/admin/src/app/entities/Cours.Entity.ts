import { Tuteur } from "./Tuteur.Entity";
import { Categorie } from "./Categorie.Entity";

export class Cours{
    constructor(
      public id? : number,
      public nom? : string,
      public description? : string,
      public prix? : number,
      public image?:String,
      public tuteur?:Tuteur,
      public categorie?:Categorie
    )
    {}
}