import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';

import { setHintColor } from "../../utils/hint-util";

@Component({
  selector: "prayers",
  templateUrl: "pages/prayers/prayers.html",
  styleUrls: ["pages/prayers/prayers-common.css", "pages/prayers/prayers.css", "shared/drawer.css"],
})
export class PrayersComponent implements OnInit {

  constructor(private router: Router, private _changeDetectionRef: ChangeDetectorRef) {
  }

  //navigation drawer...

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;

  ngAfterViewInit() {
      this.drawer = this.drawerComponent.sideDrawer;
      this._changeDetectionRef.detectChanges();
  }

  public openDrawer() {
      this.drawer.showDrawer();
  }

  public onCloseDrawerTap() {
     this.drawer.closeDrawer();
  }

  goSubmitIntention() {
    this.router.navigate(["/intention"]);
  }

  goReminders() {
    this.router.navigate(["/reminders"]);
  }

  goLogin() {
    this.router.navigate(["/login"]);
  }

  //end nav drawer


  

  ngOnInit() {
  }

  

}
