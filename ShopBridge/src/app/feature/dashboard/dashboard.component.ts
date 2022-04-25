import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public showInfo = false;

  constructor(public router: Router) { }

  goToInventory() {
    this.router.navigate(['/inventory']);
  }

  showHideInformation() {
    this.showInfo = !this.showInfo;
  }

}
