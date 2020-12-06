import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit  {

  tabElement: any;

  constructor() { }

  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit(){
    this.tabElement.style.display = 'none';
  }

}
