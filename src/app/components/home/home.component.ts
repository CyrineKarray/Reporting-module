import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Financement } from 'src/app/models/financement';
import { DatePipe } from '@angular/common';
import { Bailleur } from 'src/app/models/bailleur';

import { Color, Label } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { HomeService } from 'src/app/services/home.service';
import { Observable } from 'rxjs';
import {IVilles} from '../../interfaces/IVilles'
import { TypeService } from 'src/app/services/type.service';
import { Type } from 'src/app/models/type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
  
})

export class HomeComponent implements OnInit {

  title = 'Sesame';
  public financements!: Financement[];
  public bailleurs!: Bailleur[];
  public types!: Type[];
  public bailleurId: any;
  public financementId: any;
  public count!:number;
  public count_types!:number;
  public somme:number=0;
  public myObject!: Financement;

  public data!: Financement[];

  public chart_bailleur !: Bailleur[];
  //public villes!: Map<string,number>

  constructor(private router: Router, private toastr: ToastrService, public datePipe: DatePipe,  private homeService: HomeService, private typeService: TypeService) { 
    
  }

  ngOnInit(): void {
      this.getBailleurs()
      this.getTypes()

    }

    

    public getBailleurs(): void {
      this.homeService.getBailleurs().subscribe(
        (response: Bailleur[]) => {
          this.bailleurs = response;
          this.count = Object.keys(this.bailleurs).length
          this.bailleurs.forEach(element => {
            this.somme= element.somme_participation+this.somme
          })
        },
        (error: HttpErrorResponse) => {
        //  this.showToasterError(error.message);
        }
      );
  }

  
  public getTypes(): void {
    this.typeService.getTypes().subscribe(
      (Response: Type[]) => {
        this.types = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    public barChartLabels = ['2000', '2001', '2002', '2003', '2004', '2005', '2006'];
   
    public chartType: ChartType = "bar";
    public barChartLegend = true;
    public barChartData = [
      {data: [75, 49, 89, 31, 86, 35, 50], label: 'Series A'},
      {data: [48, 38, 65, 39, 66, 17, 80], label: 'Series B'}
    ];



  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public showToasterSuccess = (msg: string) => {
    this.toastr.success(msg);
  }

  public showToasterError = (msg: string) => {
    this.toastr.error(msg);
  }


  
  public getCharts(): void {
    this.homeService.getBailleurs().subscribe(
      (response: Bailleur[]) => {
        this.bailleurs = response;
      },
      (error: HttpErrorResponse) => {
        this.showToasterError(error.message);
      }
    );
    }


public getFinancements(): void {
    this.homeService.getFinancements().subscribe(
      (response: Financement[]) => {
        this.financements = response;
      },
      (error: HttpErrorResponse) => {
        this.showToasterError(error.message);
      }
    );
    }





      // public getFinancement(FinancementId: number): void {
      //   this.homeService.getBailleur(FinancementId).subscribe(
      //     (response: void) => {
      //       console.log(response);
      //       this.getBailleurs();
      //     },
      //     (error: HttpErrorResponse) => {
      //       this.showToasterError(error.message);
      //     }
      //   );
      //       }
public onAddFinancement(addForm: NgForm): void{
     document.getElementById('add-financement-form')?.click();
      this.bailleurId = addForm.value.bailleur;
      this.myObject = {
        code: addForm.value.code,
        date: addForm.value.date,
        montant_device: addForm.value.montant_device,
        montant_monnaie_local: addForm.value.montant_monnaie_local,
        taux_change: addForm.value.taux_change,
        date_signature: addForm.value.date_signature,
        date_premier_paiement: addForm.value.date_premier_paiement,
        date_dernier_paiement: addForm.value.date_dernier_paiement,
        numero_loi_finance: addForm.value.numero_loi_finance,
        date_loi_finance: addForm.value.date_loi_finance,
        bailleur: null,
      };
      console.log(this.myObject);
      console.log(this.bailleurId);

      this.homeService.addFinancement(this.myObject).subscribe(
        async (response: any) => {
          this.getFinancements();
          this.financementId = response.id;
          console.log('inside add financement');
          this.homeService.linkBailleurTofinancement(this.financementId, this.bailleurId).subscribe(
            async (response: any) => {
              console.log(response);
              this.showToasterSuccess('financement added successfully!');
              await this.delay(1000);
              window.location.reload();
            }, (error: HttpErrorResponse) => {
              console.log(error.message);
            }
          );
         
        }, (error: HttpErrorResponse) => {
          console.log(error.message);
          this.showToasterError(error.message);
        }
      );
    
    }





    public searchFinancements(key: string): void {
    }


    public onOpenModal(financement: any, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addFinancementModal');
      }
      container?.appendChild(button);
      button.click();
    }
}
