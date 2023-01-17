import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { User } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  login: User = {
    uid: '',
    email: '',
    nombre:'',
    confirpassword:'',
    password: '',
    usuario: '',
    foto: '',
  };

  picture;
  name;
  email;

  newFile: any;
  constructor( private afAuth: AngularFireAuth, private   firebaseauthService: FirebaseauthService,
    public navegacion: NavController, ) {}

  ngOnInit() {}

  async newImageUpdate(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.login.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async loginGoogles() {
    try{
      this.firebaseauthService.loginGoogle();
    }catch(error){
      console.log(error);
    }

    this.navegacion.navigateRoot('inicio');
 }

}
