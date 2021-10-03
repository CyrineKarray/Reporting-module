import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Financement } from 'src/app/models/financement';
import { DatePipe } from '@angular/common';
import { Bailleur } from 'src/app/models/bailleur';
import { FinancementService } from 'src/app/services/financement.service';
import { BailleurService } from 'src/app/services/bailleur.service';

@Component({
  selector: 'app-financement',
  templateUrl: './financement.component.html',
  styleUrls: ['./financement.component.css'],
  providers: [DatePipe]
  
})

export class FinancementComponent implements OnInit {

  title = 'Sesame';
  public financements!: Financement[];
  public bailleurs!: Bailleur[];
  public editFinancement!: Financement;
  public deleteFinancement!: Financement;
  public bailleurId: any;
  public financementId: any;
 
  public myObject!: Financement;
  financementDetails: any;


  constructor(private financementService: FinancementService, private bailleurService: BailleurService, private router: Router, private toastr: ToastrService, public datePipe: DatePipe) { }

  ngOnInit(): void {
      this.getFinancements();
      this.getBailleurs();
    }
    

  // tslint:disable-next-line:typedef
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public showToasterSuccess = (msg: string) => {
    this.toastr.success(msg);
  }

  public showToasterError = (msg: string) => {
    this.toastr.error(msg);
  }
  
public getFinancements(): void {
    this.financementService.getFinancement().subscribe(
      (response: Financement[]) => {
        this.financements = response;
      },
      (error: HttpErrorResponse) => {
        this.showToasterError(error.message);
      }
    );
    }

public getBailleurs(): void {
      this.bailleurService.getBailleurs().subscribe(
        (response: Bailleur[]) => {
          this.bailleurs = response;
          console.log(this.bailleurs);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      }

      public getFinancement(FinancementId: number): void {
        this.bailleurService.getBailleur(FinancementId).subscribe(
          (response: void) => {
            console.log(response);
            this.getBailleurs();
          },
          (error: HttpErrorResponse) => {
            this.showToasterError(error.message);
          }
        );
            }
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

      this.financementService.addFinancement(this.myObject).subscribe(
        async (response: any) => {
          this.getFinancements();
          this.financementId = response.id;
          console.log('inside add financement');
          this.bailleurService.linkBailleurTofinancement(this.financementId, this.bailleurId).subscribe(
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


public onDeleteFinancement(financementId: any): void {
      this.financementService.deleteFinancement(financementId).subscribe(
        (response: void) => {
          console.log(response);
          this.getFinancements();
          this.showToasterSuccess('Financement deleted successfully!');
        },
        (error: HttpErrorResponse) => {
          this.showToasterError(error.message);
        }
      );
    }

public onUpdateFinancement(financement: Financement): void {
  this.myObject = {
    code: financement.code,
    date: financement.date,
    montant_device: financement.montant_device,
    montant_monnaie_local: financement.montant_monnaie_local,
    taux_change: financement.taux_change,
    date_signature: financement.date_signature,
    date_premier_paiement: financement.date_premier_paiement,
    date_dernier_paiement: financement.date_dernier_paiement,
    numero_loi_finance: financement.numero_loi_finance,
    date_loi_finance: financement.date_loi_finance,
    bailleur: null
  };
  this.financementId = financement.id;

  console.log(this.financementId);
  console.log(this.myObject);
  this.financementService.updateFinancement(this.myObject, this.financementId).subscribe(
    async (response: any) => {
      console.log(response);
      if (financement.bailleur) {
        this.bailleurService.linkBailleurTofinancement(this.financementId, financement.bailleur).subscribe(
          async (response: any) => {
            console.log('inside link');
            console.log(response);
            await this.delay(1000);
            window.location.reload();
          }, (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        );
      }
      this.showToasterSuccess('financement updated successfully!');
      this.delay(1000);
      this.getFinancements();
    }, (error: HttpErrorResponse) => {
      this.showToasterError(error.message);
    }
  );
}



    public searchFinancements(key: string): void {
    }

 public onExportPdf(): void
 {
this.financementService.exportToPdf()
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
      if (mode === 'edit') {
      this.editFinancement = financement;
      button.setAttribute('data-target', '#updateFinancementModal');
      }
      if (mode === 'delete') {
       this.deleteFinancement = financement;
       button.setAttribute('data-target', '#deleteFinancementModal');
      }
      if (mode === 'details'){
        this.financementDetails = financement;
        button.setAttribute('data-target', '#getDetailsModal');
      }
      container?.appendChild(button);
      button.click();
    }
}
