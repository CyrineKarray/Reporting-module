import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Type } from 'src/app/models/type';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
})

export class TypeComponent implements OnInit {
  title = 'Type';
  public types: Type[] = [];
  public editType!: Type;
  public deleteType: any;
  typeDetails: any;
  constructor(
    private typeService: TypeService,
    private router: Router,
    private toastr: ToastrService
  ) {}
 


  ngOnInit(): void {
      this.getTypes();
  }


    public showToasterSuccess = (msg: string) => {
      this.toastr.success(msg);
    }
  
    public showToasterError = (msg: string) => {
      this.toastr.error(msg);
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
  public getType(TypeId: number): void {
    this.typeService.getType(TypeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTypes(); 
     this.showToasterSuccess("type affiché");
      },
      (error: HttpErrorResponse) => {
     this.showToasterError(error.message);
      }
    );
        }
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  public onAddType(addForm: NgForm): void {
    document.getElementById('add-type-form')?.click();
    this.typeService.addType(addForm.value).subscribe(
     async (response: any) => {
      console.log(response);
      this.toastr.success("Type ajouté avec succès!","Félicitations")
      await this.delay(2510);
      window.location.reload();
      this.getTypes();
      addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message,"Une erreur s'est produite :(");
        addForm.reset();
      }
    );
  }

  public onUpdateType(type: Type): void {
    this.typeService.updateType(type, type.id).subscribe(
      (response: any) => {
        console.log(response);
   //  this.showToasterSuccess('Type updated successfully!');
        this.getTypes();
      },
      (error: HttpErrorResponse) => {
      //  this.showToasterError(error.message);
      }
    );
  }

  public onDeleteType(typeId: number): void {
    this.typeService.deleteType(typeId).subscribe(
      (response: void) => {
        console.log(response);
        window.location.reload();
        this.getTypes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(type: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTypeModal');
    }
    if (mode === 'edit') {
      this.editType = type;
      button.setAttribute('data-target', '#updateTypeModal');
    }
    if (mode === 'details'){
      this.typeDetails = type;
      button.setAttribute('data-target', '#getDetailsModal');
    }
    if (mode === 'delete') {
      this.deleteType = type;
      button.setAttribute('data-target', '#deleteTypeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
