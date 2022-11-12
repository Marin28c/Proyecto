import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navegacion: NavController,
  ) {
    this.formularioRegistro = this.fb.group({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmacionPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor llene todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    var usuario = {
      usuario: f.usuario,
      password: f.password,
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('ingresado','true');
    this.navegacion.navigateRoot('inicio');
  }
}
