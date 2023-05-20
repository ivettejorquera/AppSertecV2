import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClienteComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class BackendModule { }
