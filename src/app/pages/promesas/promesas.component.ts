import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cita } from 'src/app/models/citas.model';
import { CitaService } from 'src/app/services/cita.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: [ './promesas.component.css' ]

})
export class PromesasComponent {

  citaForm: FormGroup;

  constructor(private fb: FormBuilder, private citaService: CitaService ) {
    this.citaForm = this.fb.group({
      motivoCita: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.citaForm.valid) {
      const { motivoCita, fecha, hora } = this.citaForm.value;
      const nuevaCita = new Cita(motivoCita, fecha, hora);

      this.citaService.crearCita(nuevaCita).subscribe(
        (respuesta) => {
          console.log('Cita creada con éxito', respuesta);
          Swal.fire({
            title: 'Cita creada',
            text: 'La cita se ha creado con éxito.',
            icon: 'success',
          });
        },
        (error) => {
          console.error('Error al crear la cita', error);
          Swal.fire({
            title: 'Error',
            text: 'Ya existe una cita en esa fecha y hora',
            icon: 'error',
          });
          // Maneja el error según tus necesidades.
        }
      );
    }
  }
}





