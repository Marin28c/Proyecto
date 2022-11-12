import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Publicaciones } from './models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  publicacion: Publicaciones[] = [];

  private path = 'Publicaciones/';

  constructor(
    public alertController: AlertController,
    public navegacion: NavController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
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
            localStorage.removeItem('ingresado');
            this.navegacion.navigateRoot('login');
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
}
