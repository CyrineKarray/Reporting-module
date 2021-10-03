import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Indicateur } from 'src/app/models/indicateur';
import { IndicateurService } from 'src/app/services/indicateur.service';

@Component({
  selector: 'app-indicateur',
  templateUrl: './indicateur.component.html',
  styleUrls: ['./indicateur.component.css'],
})

export class IndicateurComponent implements OnInit {
  title = 'Indicateur';
  public indicateurs: Indicateur[] = [];
  public editIndicateur!: Indicateur;
  public deleteIndicateur: any;
  indicateurDetails: any;
  constructor(
    private indicateurService: IndicateurService,
    private router: Router,
    private toastr: ToastrService
  ) {}
 


  ngOnInit(): void {
      this.getIndicateurs();
  }


    public showToasterSuccess = (msg: string) => {
      this.toastr.success(msg);
    }
  
    public showToasterError = (msg: string) => {
      this.toastr.error(msg);
    }
    
  public getIndicateurs(): void {
    this.indicateurService.getIndicateurs().subscribe(
      (Response: Indicateur[]) => {
        this.indicateurs = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getIndicateur(IndicateurId: number): void {
    this.indicateurService.getIndicateur(IndicateurId).subscribe(
      (response: void) => {
        console.log(response);
        this.getIndicateurs(); 
     this.showToasterSuccess("indicateur affiché");
      },
      (error: HttpErrorResponse) => {
     this.showToasterError(error.message);
      }
    );
        }
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  public onAddIndicateur(addForm: NgForm): void {
    document.getElementById('add-indicateur-form')?.click();
    this.indicateurService.addIndicateur(addForm.value).subscribe(
     async (response: any) => {
      console.log(response);
      this.toastr.success("Indicateur ajouté avec succès!","Félicitations")
      await this.delay(2510);
      window.location.reload();
      this.getIndicateurs();
      addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message,"Une erreur s'est produite :(");
        addForm.reset();
      }
    );
  }

  public onUpdateIndicateur(indicateur: Indicateur): void {
    this.indicateurService.updateIndicateur(indicateur, indicateur.id).subscribe(
      (response: any) => {
        console.log(response);
   //  this.showToasterSuccess('indicateur updated successfully!');
        this.getIndicateurs();
      },
      (error: HttpErrorResponse) => {
      //  this.showToasterError(error.message);
      }
    );
  }

  public onDeleteIndicateur(indicateurId: number): void {
    this.indicateurService.deleteIndicateur(indicateurId).subscribe(
      (response: void) => {
        console.log(response);
        window.location.reload();
        this.getIndicateurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(indicateur: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addIndicateurModal');
    }
    if (mode === 'edit') {
      this.editIndicateur = indicateur;
      button.setAttribute('data-target', '#updateIndicateurModal');
    }
    if (mode === 'details'){
      this.indicateurDetails = indicateur;
      button.setAttribute('data-target', '#getDetailsModal');
    }
    if (mode === 'delete') {
      this.deleteIndicateur = indicateur;
      button.setAttribute('data-target', '#deleteIndicateurModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
