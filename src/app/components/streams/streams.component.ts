import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {
  token: any;
  constructor(
    private tokenService: TokenService,
    protected router: Router
  ) { }

  ngOnInit() {
    this.token = this.tokenService.GetPayload();
    console.log(this.token);

    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }

  logout(){
    this.tokenService.DeleteToken()
    this.router.navigate(['']);
  }

}
