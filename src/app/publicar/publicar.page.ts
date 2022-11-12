import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Publicaciones } from './models';
import { FirestorageService } from '../services/firestorage.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  publicacion: Publicaciones[] = [];

  newPublicacion: Publicaciones = {
    nombre: '',
    edad: null,
    raza: '',
    contacto: null,
    descripcion: '',
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date(),
  };

  private path = 'Publicaciones/';

  // eslint-disable-next-line @typescript-eslint/member-ordering
  newImage = '';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  newFile = '';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  loading: any;

  constructor(
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public firestorageService: FirestorageService
  ) {}

  ngOnInit() {
    this.getPublicacion();
  }

  async guardarPublicacion() {
    this.presentLoading();
    const path = 'Publicaciones';
    const name = this.newPublicacion.nombre;
    const res = await this.firestorageService.uploadImage(
      this.newFile,
      path,
      name
    );
    this.newPublicacion.foto = res;
    this.firestoreService
      .creatDoc(this.newPublicacion, this.path, this.newPublicacion.id).then(() => {
        this.loading.dismiss();
        this.presentToast('Guardado con exito');
      }).catch(error => {
        this.presentToast('No se pudo guardar');
      });
  }

  getPublicacion() {
    this.firestoreService
      .getCollection<Publicaciones>(this.path)
      .subscribe((res) => {
        this.publicacion = res;
      });
  }
  deletePublicacion(publicar: Publicaciones) {
    this.firestoreService.deleteDoc(this.path, publicar.id);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Guardando información...',
      cssClass: 'normal',
      duration:1500
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 1500,
    });
    toast.present();
  }

  async newImageUpdate(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newImage = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
