import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Perfil } from 'src/app/model';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  perfilClie: Perfil = {
    uid: '',
    email: '',
    celular: '',
    nombre: '',
    foto: '',
    password: '',
  }

  newFile: any;

  uid = '';

  suscriberUserInfo: Subscription;

  ingresarEnable = false;

  constructor(public menucontroller: MenuController,
    public firebaseauthservice: FirebaseauthService,
    public firestoreservice: FirestoreService,
    public firestorageservice: FirestorageService,
  ) {

    this.firebaseauthservice.stateAuth().subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      } else {
        this.initCliente();
      }
    });
  }

  async ngOnInit() {
    const uid = await this.firebaseauthservice.getUid()
    console.log(uid);
  }

  initCliente() {
    this.uid = '';
    this.perfilClie = {
      uid: '',
      email: '',
      celular: '',
      nombre: '',
      foto: '',
      password: '',
    }
  }

  AbrirMenu() {
    this.menucontroller.toggle('custom')
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.perfilClie.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async registrarse() {
    const credenciales = {
      email: this.perfilClie.email,
      password: this.perfilClie.password,
    };
    const res = await this.firebaseauthservice.registrar(credenciales.email, credenciales.password).catch(err => {
      console.log('error -> ', err);
    });
    const uid = await this.firebaseauthservice.getUid();
    this.perfilClie.uid = uid;
    this.guardarUser();
  }

  async guardarUser() {
    const path = 'PerfilCliente';
    const name = this.perfilClie.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageservice.uploadImage(this.newFile, path, name);
      this.perfilClie.foto = res;
    }
    this.firestoreservice.crearDoc(this.perfilClie, path, this.perfilClie.uid).then(res => {

    }).catch(error => {

    })

  }

  async salir() {
    this.firebaseauthservice.logout();
    this.suscriberUserInfo.unsubscribe();
  }

  getUserInfo(uid: string) {
    const path = 'PerfilCliente';
    this.suscriberUserInfo = this.firestoreservice.getDoc<Perfil>(path, uid).subscribe(res => {
      this.perfilClie = res
    })
  }

  ingresar() {
    const credenciales = {
      email: this.perfilClie.email,
      password: this.perfilClie.password,
    };

    this.firebaseauthservice.login(credenciales.email, credenciales.password).then(res => {
      console.log('Ingresar')
    })
  }

}
