import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalCitaService } from '../../services/modal-cita.service';
import { Cita } from 'src/app/models/citas.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from 'src/app/services/cita.service';
import Swal from 'sweetalert2';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-modal-cita',
  templateUrl: './modal-cita.component.html',
  styles: [
  ]
})
export class ModalCitaComponent implements OnInit {

  @Input() cita: Cita;
  @Output() guardarCambios = new EventEmitter<any>();

  public citaForm: FormGroup;
  public citaSeleccionada: Cita;

  constructor(public modalCitaService:ModalCitaService,
              private  citaService: CitaService,
              private fb: FormBuilder) { }


  ngOnInit(): void {
      this.citaForm = this.fb.group({
      motivoCita: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });

    // this.cargarCita(this.cita._id);
  }

  cerrarModal() {
    this.modalCitaService.cerrarModal();
  }

  cargarCita(id: string) {
    if ( id === 'nuevo' ) {
      return;
    }

    this.citaService.obtenerCitaPorId( id )
    .pipe().subscribe( cita => {

      const { motivoCita, fecha, hora} = cita;
      this.citaSeleccionada = cita;
      this.citaForm.setValue({motivoCita, fecha, hora});
    })
  }


  // confirmarCambios() {
  //   // Emitir los cambios para que el componente principal los maneje
  //   this.guardarCambios.emit({
  //     motivoCita: this.motivoCitaEdit,
  //     fechaCita: this.fechaCitaEdit,
  //     horaCita: this.horaCitaEdit,
  //   });
  // }

  actualizarCita() {

    const { motivoCita, fecha, hora} = this.citaForm.value;

    if( this.citaSeleccionada ) {
      //actualizar
      const data = {
        ...this.citaForm.value,
        _id: this.citaSeleccionada._id
      }
      this.citaService.actualizarCita( data ).subscribe( resp => {
        Swal.fire(
          'Cita actualizada',
          ` La cita con motivo ${ motivoCita } con fecha ${ fecha } a las ${ hora } horas fue eliminado correctamente`,
          'success'
        );
      })
    }

  }

}


    // this.citaService.actualizarCita(this.cita)
    //     .subscribe( () => {
    //       Swal.fire(
    //         'Cita actualizada',
    //         ` La cita con motivo ${ this.motivoCitaEdit } con fecha ${ this.fechaCitaEdit } a las ${ this.horaCitaEdit } horas fue eliminado correctamente`,
    //         'success'
    //       );
    //       this.confirmarCambios();
    //       this.cerrarModal();
    //     }, error => {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'Hubo un problema al actualizar la cita. Por favor, inténtalo de nuevo.',
    //       });
    //     })

    // const { motivo, fecha, hora} = this.citaForm.value;

    // if( this.citaSeleccionada ) {
    //   const data = {
    //     ...this.citaForm.value,
    //     _id: this.citaSeleccionada._id
    //   }
    //   this.citaService.actualizarCita( data )
    //     .subscribe( resp => {
    //       Swal.fire(
    //         'Cita borrada',
    //         ` La cita con motivo ${ motivo } con fecha ${ fecha } a las ${ hora } horas fue eliminado correctamente`,
    //         'success'
    //       );
    //     })
    // }
