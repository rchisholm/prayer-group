import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class Navigation {

  constructor(private router: Router) {}

  goSubmitIntention() {
    //alert("Test message...");
    this.router.navigate(["/intention"]);
  }

  goReminders() {
    //alert("Test message...");
    this.router.navigate(["/reminders"]);
  }

  goLogin() {
    this.router.navigate(["/login"]);
  }

  goFriday() {
    this.router.navigate(["/friday-reminder"]);
  }

  goSaturday() {
    this.router.navigate(["/saturday-reminder"]);
  }

  goThree() {
    this.router.navigate(["/three-reminder"]);
  }

}
