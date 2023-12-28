import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-confirmation',
  templateUrl: './mail-confirmation.component.html',
  styleUrls: ['./mail-confirmation.component.css']
})
export class MailConfirmationComponent implements AfterViewInit  {

  constructor(private router: Router) { }

  returnToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  @ViewChild('verifyInput1') verifyInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('verifyInput2') verifyInput2!: ElementRef<HTMLInputElement>;
  @ViewChild('verifyInput3') verifyInput3!: ElementRef<HTMLInputElement>;
  @ViewChild('verifyInput4') verifyInput4!: ElementRef<HTMLInputElement>;
  @ViewChild('verifyInput5') verifyInput5!: ElementRef<HTMLInputElement>;
  @ViewChild('verifyInput6') verifyInput6!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    // Los elementos verifyInput están disponibles después de la vista
  }

  onInput(event: any, nextInput: any): void {
    const inputElement = event.target as HTMLInputElement;
    const maxLength = 1;

    if (inputElement.value.length === maxLength && nextInput) {
      nextInput.nativeElement.focus();
    }
  }

}
