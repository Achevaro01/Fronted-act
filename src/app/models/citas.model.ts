interface _citaUser {
  _id:string;
  nombre:string;
  img:string;

}

export class Cita {

  constructor(
    public motivoCita: string,
    public fecha: string,
    public hora: string,
    public _id?: string,
    public usuario?: _citaUser,
  ) {}




}
