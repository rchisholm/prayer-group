import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";
import { alert } from "tns-core-modules/ui/dialogs";
import * as Dialogs from "ui/dialogs";
import * as LocalNotifications from "nativescript-local-notifications";
import * as Toast from "nativescript-toast";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';

import { setHintColor } from "../../utils/hint-util";

@Component({
  selector: "reminders",
  templateUrl: "pages/reminders/reminders.html",
  styleUrls: ["pages/reminders/reminders-common.css", "pages/reminders/reminders.css", "shared/drawer.css"],
})
export class RemindersComponent implements OnInit {

  constructor(private router: Router, private page: Page, private _changeDetectionRef: ChangeDetectorRef) {
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

  goNotification(name: String){
    switch(name){
      case 'friday': {
        this.router.navigate(["/friday-reminder"]);
        break;
      }
      case 'saturday': {
        this.router.navigate(["/saturday-reminder"]);
        break;
      }
      case 'three':{
        this.router.navigate(["/three-reminder"]);
        break;
      }
      default:{
        console.log("ERROR: goNotification() arg "+name);
        break;
      }
    }
  }

  public cancelAll() {
    //cancels all, later only cancel friday notifications
    LocalNotifications.cancelAll();
    console.log("ALL REMINDERS CLEARED.")
    this.listAll();
  }

  public listAll() {
    //list all  notifications in the console
    LocalNotifications.getScheduledIds().then(
      function(ids) {
        console.log("ID's: " + ids);
      }
    );
    console.log("TIME: "+new Date().getHours()+":"+new Date().getMinutes());
  }

}
