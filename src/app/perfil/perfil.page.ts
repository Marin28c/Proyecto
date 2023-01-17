import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Publicaciones } from './models';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { User } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { RegistroPage } from '../registro/registro.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  publicacion: Publicaciones[] = [];

  private path = 'Publicaciones/';

  // eslint-disable-next-line @typescript-eslint/member-ordering
  uid = '';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  newFile: any;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  login: User = {
    uid: '',
    nombre: '',
    email: '',
    password: '',
    confirpassword: '',
    usuario: '',
    foto: '',
  };
  // eslint-disable-next-line @typescript-eslint/member-ordering
  email: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  name: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  picture;

  constructor(
    public alertController: AlertController,
    public navegacion: NavController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public firebaseauthService: FirebaseauthService,
    private afAuth: AngularFireAuth,
  ) {
    this.firebaseauthService.stateAuth().subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      }
    });
  }


  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);
    this.getPublicacion();
  }


  async salir() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Desea salir?',
      buttons: [
        {
          text: 'No deseo salir',
          handler: () => {},
        },
        {
          text: 'si',
          handler: () => {
            this.firebaseauthService.auth.signOut();
            this.navegacion.navigateRoot('login');
            console.log('salio');
          },
        },
      ],
    });
    await alert.present();
  }

  getPublicacion() {
    this.firestoreService
      .getCollection<Publicaciones>(this.path)
      .subscribe((res) => {
        this.publicacion = res;
      });
  }


  async newImageUpdate(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.login.foto = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  getUserInfo(uid: string) {
    const path = 'Usuarios';
    this.firestoreService.getDoc<User>(path, uid).subscribe(res => {
      this.login = res;
    });

  }
  async loginGoogle() {
    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
 }
}
