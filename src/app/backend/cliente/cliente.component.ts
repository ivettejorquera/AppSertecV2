import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent  implements OnInit {

  constructor(public menucontroller: MenuController, 
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.getClientes()
  }

  clientes: Cliente[] = []

  newCliente: Cliente;

  enableNewCliente = false;

  private path = 'Cliente/';

  loading: any;

  AbrirMenu() {
    console.log('Abrir menu')
    this.menucontroller.toggle('custom')
  }

  guardarCliente(){
    this.presentLoading();
    this.firestoreService.crearDoc(this.newCliente, this.path, this.newCliente.id).then( res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito!!!!')
    }).catch( error => {
      this.presentToast('No se pudo guardar, intente nuevamente: ');
    });
    
  }

  getClientes(){
    this.firestoreService.getCollection<Cliente>(this.path).subscribe( res => {
      this.clientes = res;
    })
  }

  async eliminarCliente(cliente: Cliente){
      const alert = await this.alertController.create({
        cssClass: '',
        header: 'Advertencia',
        message: 'Seguro desea eliminar este cliente?',
        buttons: [
          {
            text: 'Cancel',
            role: 'Cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm cancel: blah');
            }
          }, {
            text: 'Si',
            cssClass: 'danger',
            handler: () => {
              this.firestoreService.deleteDoc(this.path, cliente.id).then( res=> {
                this.loading.dismiss();
                this.presentToast('Eliminado con exito!!!!')
              }).catch( error => {
                this.presentToast('No se pudo eliminar, intente nuevamente: ');
              });
            }
          }
        ]
      });

      await alert.present();
    
  }

  nuevoCliente(){
    this.enableNewCliente = true;
    this.newCliente = {
      nombre: '',
      direccion: '',
      correo: '',
      numero: null,
      id: this.firestoreService.getId(),
      fecha: new Date,
    }
  
  }

  async presentLoading(){
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });

    await this.loading.present();
    //await loading.onDidDismiss();
    console.log('Mensaje');
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'light',
    });
    toast.present();
  }

}
