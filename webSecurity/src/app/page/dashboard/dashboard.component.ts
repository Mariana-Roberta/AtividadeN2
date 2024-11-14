import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../../service/auth-service.service";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  title: string = '';

  constructor(private _router: Router,
              private _service: AuthServiceService,
              private utilService: UtilService) {
  }

  ngOnInit() {
    this.utilService.dashboard().subscribe({
      next: (response) => {
        console.log(response)
        this.title = response;
      }
    })
  }

  user(){
    this._router.navigate(['/user']);
  }

  adm() {
    this._router.navigate(['/admin']);
  }

  profile(){
    this._router.navigate(['/profile']);
  }

  logout(){
    this._service.logout();
  }
}
