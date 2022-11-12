import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Publicaciones } from './models';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {
  publicacion: Publicaciones[] = [];

  private path = 'Publicaciones/';

  constructor(
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,) { }

  ngOnInit() {
    this.getPublicacion();
  }
  getPublicacion() {
    this.firestoreService
      .getCollection<Publicaciones>(this.path)
      .subscribe((res) => {
        this.publicacion = res;
      });
  }

}
