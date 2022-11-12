import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navegacion: NavController) {
    this.formularioLogin = this.fb.group({
      usuario: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });


  }

  ngOnInit() {
  }

  async ingresar(){
    var f = this.formularioLogin.value;

    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor llene todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if ((usuario.usuario === f.usuario && usuario.password === f.password)=== null )
    {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Por favor verifica los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }

    if (usuario.usuario === f.usuario && usuario.password === f.password ){
      console.log('ingresado');
      localStorage.setItem('ingresado','true');
      this.navegacion.navigateRoot('inicio');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Por favor verifica los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}
