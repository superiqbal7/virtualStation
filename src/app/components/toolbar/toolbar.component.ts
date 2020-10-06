import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;

  constructor(
    private tokenService: TokenService,
    protected router: Router
  ) { }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    //console.log(this.user);

    const dropDownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      allignment: 'right',
      hover: true,
      coverTrigger: false
    })
  }
  logout() {
    this.tokenService.DeleteToken()
    this.router.navigate(['']);
  }

  GoToHome(){
    this.router.navigate(['streams']);
  }

}
