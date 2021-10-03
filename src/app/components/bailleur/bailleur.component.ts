import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Bailleur } from 'src/app/models/bailleur';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BailleurService } from 'src/app/services/bailleur.service';

@Component({
  selector: 'app-bailleur',
  templateUrl: './bailleur.component.html',
  styleUrls: ['./bailleur.component.css'],
  providers: [DatePipe]
  
})

export class BailleurComponent implements OnInit {

  title = 'Sesame';
  public bailleurs!: Bailleur[];
  public editBailleur!: Bailleur;
  public deleteBailleur!: Bailleur;
  bailleurDetails: any;
 


  constructor(private bailleurService: BailleurService, private router: Router, private toastr: ToastrService, public datePipe: DatePipe) { }

  ngOnInit(): void {
      this.getBailleurs();
      console.log("hh",  this.getBailleurs())
    }
    

  // tslint:disable-next-line:typedef
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  
public getBailleurs(): void {
    this.bailleurService.getBailleurs().subscribe(
      (response: Bailleur[]) => {
        this.bailleurs = response;
      },
      (error: HttpErrorResponse) => {
      //  this.showToasterError(error.message);
      }
    );
}


public getBailleur(BailleurId: number): void {
  this.bailleurService.getBailleur(BailleurId).subscribe(
    (response: void) => {
      console.log(response);
      this.getBailleurs();
    },
    (error: HttpErrorResponse) => {
 //  this.showToasterError(error.message);
    }
  );
      }


public onAddBailleur(addForm: NgForm): void{
    //   document.getElementById('add-Bailleur-form')?.click();
    //   this.bailleurService.addBailleur(addForm.value).subscribe(
    //     async (response: Bailleur) => {
    //       console.log(response);
    //       await this.delay(1000);
    //       window.location.reload();
    //     },
    //     (error: HttpErrorResponse) => {
    //    //   this.showToasterError(error.message);
    //       addForm.reset();
    //     }
    //   );
    //   this.bailleurService.getBailleurs().subscribe(
    //     (response: Bailleur[]) => {
    //       this.bailleurs = response;
    //  //     this.showToasterSuccess('Bailleur ajouté avec succés!');
    //       console.log(this.bailleurs);
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(error.message);
    //  //     this.showToasterError(error.message);
    //     }
    //   );
    }



public onDeleteBailleur(BailleurId: number): void {
      this.bailleurService.deleteBailleur(BailleurId).subscribe(
        (response: void) => {
          console.log(response);
          this.getBailleurs();
      //    this.showToasterSuccess('Bailleur deleted successfully!');
        },
        (error: HttpErrorResponse) => {
     //     this.showToasterError(error.message);
        }
      );
    }

public onUpdateBailleur(bailleur: Bailleur): void {
      this.bailleurService.updateBailleur(bailleur, bailleur.id).subscribe(
        (response: any) => {
          console.log(response);
       //   this.showToasterSuccess('Bailleur updated successfully!');
          this.getBailleurs();
        },
        (error: HttpErrorResponse) => {
     //     this.showToasterError(error.message);
        }
      );
    }

    public searchBailleurs(key: string): void {
    
  
    }

 public onExportPdf(): void
 {
this.bailleurService.exportToPdf()
}

public onOpenModal(bailleur: any, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addBailleurModal');
      }
      if (mode === 'details'){
        this.bailleurDetails = bailleur;
        button.setAttribute('data-target', '#getDetailsModal');
      }
      if (mode === 'edit') {
      this.editBailleur = bailleur;
      button.setAttribute('data-target', '#updateBailleurModal');
      }
      if (mode === 'delete') {
       this.deleteBailleur = bailleur;
       button.setAttribute('data-target', '#deleteBailleurModal');
      }
      container?.appendChild(button);
      button.click();
    }
}
