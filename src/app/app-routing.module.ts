import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClienteComponent } from './backend/cliente/cliente.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
