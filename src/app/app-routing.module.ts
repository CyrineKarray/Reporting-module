import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BailleurComponent } from './components/bailleur/bailleur.component';
import { FinancementComponent } from './components/financement/financement.component';
import { HomeComponent } from './components/home/home.component';
import { IndicateurComponent } from './components/indicateur/indicateur.component';
import { TypeComponent } from './components/type/type.component';

const routes: Routes = [
  {path:'financement',component:FinancementComponent},
  {path:'bailleur',component:BailleurComponent},
  {path:'indicateur',component:IndicateurComponent},
  {path:'home',component:HomeComponent},
  {path:'type',component:TypeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
