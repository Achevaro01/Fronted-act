import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Cita } from '../models/citas.model';
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class CitaService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarCitas() {

    const url = `${ base_url }/citas`;
    return this.http.get( url, this.headers )
            .pipe(
              map( (resp: {ok:boolean, citas:Cita[] }) => resp.citas)
            );
  }

  crearCita(cita: Cita ): Observable<any> {

    const url = `${ base_url }/citas`;
    return this.http.post( url, cita, this.headers );
  }

  // borrarCita( _id: string ) {

  //   const url = `${ base_url }/citas/${ _id }`;
  //   return this.http.delete( url, this.headers );
  // }

  eliminarCita(cita) {
    const url = `${ base_url }/citas/${ cita.id }`;
    return this.http.delete( url, this.headers );
  }

}
