import { Injectable } from '@angular/core';
import { IAgenda } from '../interfaces/iagenda';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class BdLocalService {

  agenda: IAgenda[]=[];
  private _storage: Storage | null = null;

  constructor(private storage: Storage, public toastController: ToastController) {
    this.init();
    this.cargarContactos();
   }

   guardarContacto(nombre:string, nro:string){
    const existe=this.agenda.find(c=>c.strNumero===nro);

    if(!existe){
      this.agenda.unshift({strNombre:nombre, strNumero:nro})
      this._storage.set('agenda', this.agenda);
      this.presentToast("Contacto guardado con exito")
    }else{
      this.presentToast("Error: Contanto ya existe")
    }
   }

   async cargarContactos() {
    const miAgenda = await this.storage.get('agenda');
    if(miAgenda){
      this.agenda = miAgenda;
    }
   }

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
   }

   async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent: true,
      color:'medium',
      position: 'top',
      duration: 2000
    })
    toast.present();
   }
}
