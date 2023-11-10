import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from "../../core/services/data.service";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthService} from "../../core/services/auth.service";

@Component({
  standalone: true,
  selector: 'app-results',
  templateUrl: './results.component.html',
  imports: [
    MatButtonModule,
    MatToolbarModule
  ],
  styleUrls: ['./results.component.css']
})
export default class ResultsComponent {
  private _router = inject(Router);

  private authservice = inject(AuthService);
  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      await this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }


  result: number;

  constructor(private dataService: DataService) {
    // Recupera el resultado almacenado en el servicio
    this.result = this.dataService.getResult();
  }
}
