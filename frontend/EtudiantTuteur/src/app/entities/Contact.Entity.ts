export class Contact{
    isNew: unknown;
    constructor(
      public id? : number,
      public nom? : string,
      public email? : string,
      public sujet? : string,
      public message? : string,
    )
    {}
}