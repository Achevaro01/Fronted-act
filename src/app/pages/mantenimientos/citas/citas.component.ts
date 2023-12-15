import { Component, OnInit } from '@angular/core';
import { Cita } from '../../../models/citas.model';
import { CitaService } from '../../../services/cita.service';
import Swal from 'sweetalert2';
import { ModalCitaService } from 'src/app/services/modal-cita.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
})
export class CitasComponent implements OnInit {

  public citas: Cita[] = [];
  public cargando: boolean = true;
  public fechaSeleccionada: Date | undefined;
  public horaSeleccionada: string | undefined;

  constructor(private citaService: CitaService,
              private modalCitaService: ModalCitaService) { }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {

    this.cargando = true;

    this.citaService.cargarCitas()
      .subscribe(citas => {
       this.cargando = false;
       this.citas = citas;
      });
  }

  abrirModal( cita: Cita ) {
    console.log(cita);
    this.modalCitaService.abrirModal();
  }

  eliminarCita( cita: Cita ) {

    Swal.fire({
      title: '¿Borrar cita?',
      text: `Esta a punto de borrar la ${ cita.motivoCita } de ${ cita.usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar la cita'
    }).then((result) => {
      if (result.value) {

        this.citaService.eliminarCita( cita )
          .subscribe( resp => {

            this.cargarCitas();
            Swal.fire(
              'Cita borrada',
              ` La cita de ${ cita.usuario.nombre } con motivo ${ cita.motivoCita } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }





}
