import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalCitaService } from '../../services/modal-cita.service';
import { Cita } from 'src/app/models/citas.model';

@Component({
  selector: 'app-modal-cita',
  templateUrl: './modal-cita.component.html',
  styles: [
  ]
})
export class ModalCitaComponent implements OnInit {

  @Input() cita: Cita;
  @Output() guardarCambios = new EventEmitter<any>();

  motivoCitaEdit: string = '';
  fechaCitaEdit: string = '';
  horaCitaEdit: string = '';

  constructor(public modalCitaService:ModalCitaService) { }


  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalCitaService.cerrarModal();
  }

  abrirModal(cita: Cita) {
    this.motivoCitaEdit = cita.motivoCita;
    this.fechaCitaEdit = cita.fecha;
    this.horaCitaEdit = cita.hora;
  }
  confirmarCambios() {
    // Emitir los cambios para que el componente principal los maneje
    this.guardarCambios.emit({
      motivoCita: this.motivoCitaEdit,
      fechaCita: this.fechaCitaEdit,
      horaCita: this.horaCitaEdit,
    });
  }

}
