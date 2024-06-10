import { Client } from "./Client.Entity";
import { Cours } from "./Cours.Entity";

export class Reservation{
    constructor(
      public id? : number,
      
      public cours?: Cours,
      public client?: Client,

    )
    {}
}