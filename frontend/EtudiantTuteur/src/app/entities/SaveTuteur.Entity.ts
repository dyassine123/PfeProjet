export class SaveTuteur{
    constructor(
      public id? : number,
      public nom? : string,
      public prenom? : string,
      public email? : string,
      public password? : string,
      public etat? : boolean,
      public idDomaine?: number,

    )
    {}
}