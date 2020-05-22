import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

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

  }
  logout() {
    this.tokenService.DeleteToken()
    this.router.navigate(['']);
  }

}
