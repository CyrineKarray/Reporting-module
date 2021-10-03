import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FinancementComponent } from './components/financement/financement.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BailleurComponent } from './components/bailleur/bailleur.component';

import { IndicateurComponent } from './components/indicateur/indicateur.component';

import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './modal/modal.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { ChartsModule } from 'ng2-charts';
import { FinancementService } from './services/financement.service';
import { BailleurService } from './services/bailleur.service';
import { IndicateurService } from './services/indicateur.service';
import { HomeService } from './services/home.service';
import { TypeService } from './services/type.service';
import { TypeComponent } from './components/type/type.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FinancementComponent,
    BailleurComponent,
    IndicateurComponent,
    HomeComponent,
    TypeComponent,
    ModalComponent,
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2500,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true,
      positionClass: 'toast-bottom-center',
    })
  ],
  providers: [FinancementService, BailleurService, IndicateurService, HomeService, TypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
