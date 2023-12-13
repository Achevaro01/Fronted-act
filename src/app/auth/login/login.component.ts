import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group({

    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    remember: [false]

  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "759289451191-tnsoimdqjjs2hpmfsujjuvko75ft8fju.apps.googleusercontent.com",
      callback: (response: any ) =>  this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }


  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe(resp => {
        console.log({ login: resp})
      });
  }


  login() {

    // console.log( this.loginForm.value );

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if( this.loginForm.get('remember').value ) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        }else{
          localStorage.removeItem('email');
        }


        // console.log(resp)
      }, (err) => {
        Swal.fire({
          title:'Error',
          text: err.error.msg,
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
      })



    // this.router.navigateByUrl('/');
  }

}
