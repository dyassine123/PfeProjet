
export class SaveCours{
    constructor(
      public id? : number,
      public nom? : string,
      public description? : string,
      public prix? : number,
      public image?:String,
      public idTuteur?:number,
      public idCategorie?:number
    )
    {}
}