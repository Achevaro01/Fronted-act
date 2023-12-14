import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService:  FileUploadService) {

    this.usuario = usuarioService.usuario;
}

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
      .subscribe( resp => {
        const { nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire({
          title:'Guardado',
          text:'Cambios fueron guardado',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });

      }, (err) => {
        Swal.fire({
          title:'Error',
          text: err.error.msg,
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
      } )
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 =  reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        this.usuario.img = img;

        Swal.fire({
          title:'Guardado',
          text:'Cambios fueron guardado',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });

      }).catch( err => {
        Swal.fire({
          title:'Error',
          text: 'No se pudo subir la imagen',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
      });

  }

}
