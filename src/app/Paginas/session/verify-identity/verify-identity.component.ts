import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent {

  constructor(private router: Router) { }

  returnToLogin() {
    this.router.navigate(['/login']);
  }
  goToMailVerification() {
    this.router.navigate(['/mail-verification']);
  }

}
