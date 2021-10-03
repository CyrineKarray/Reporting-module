import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {




  ngOnInit(): void {
  }

  public clickFun(event:any){
    var list: any = document.getElementsByClassName('item');
    for (let item of list) {
    item.removeAttribute('id');
    }
    event.target.setAttribute('id','active');
  }

  
  public clickReset(){
    var list: any = document.getElementsByClassName('item');
    for (let item of list) {
    item.removeAttribute('id');
    }
  }

}
