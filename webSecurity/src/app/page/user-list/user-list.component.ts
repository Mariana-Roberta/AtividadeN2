import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonDirective} from "primeng/button";
import {UtilService} from "../../service/util.service";
import {AuthServiceService} from "../../service/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonDirective
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  users: any[] = [];

  constructor(private utilService: UtilService, private authService: AuthServiceService, private _router: Router) {
  }

  ngOnInit() {

    this.utilService.getUserList().subscribe({
      next: (data) => {
        console.log('User details:', data);
        this.users = data;
      },
      error: (error) => {
        console.error('Erro ao obter lista de usuários:', error);
        if (error.status === 401) {
          alert('Autenticação falhou. Faça login novamente.');
        }
      },
    });
  }
}
