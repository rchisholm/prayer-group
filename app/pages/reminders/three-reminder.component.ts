import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";
import * as Dialogs from "ui/dialogs";
import * as LocalNotifications from "nativescript-local-notifications";
import * as Toast from "nativescript-toast";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';

@Component({
  selector: "three-reminder",
  templateUrl: "pages/reminders/three-reminder.html",
  styleUrls: ["pages/reminders/reminders-common.css", "pages/reminders/reminders.css", "shared/drawer.css"],
})
export class ThreeReminderComponent implements OnInit {
  public input: any;

  constructor(private router: Router, private page: Page, private _changeDetectionRef: ChangeDetectorRef) {
    this.input = {
      "id":"1",
      "title":"3 O' Clock Hour",
      "body":"This is your reminder to pray on the 3 o' clock hour."
    };
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
    LocalNotifications.addOnMessageReceivedCallback(notificationData => {
                Dialogs.alert({
                    title: "Notification received",
                    message: "ID: " + notificationData.id +
                    "\nTitle: " + notificationData.title +
                    "\nBody: " + notificationData.body,
                    okButtonText: "Excellent!"
                });
            }
        );
  }

  public schedule() {
      LocalNotifications.requestPermission().then(granted => {
          if(granted) {
                let aDate = new Date();
                aDate.setHours(15);
                aDate.setMinutes(0);
                aDate.setSeconds(0);
                LocalNotifications.schedule([{
                    id: 300,
                    title: this.input.title,
                    body: this.input.body,
                    at: aDate,
                    interval: "day"
                }]).then(() => {
                    Toast.makeText("Reminder scheduled!").show();
                    console.log("REMINDER SCHEDULED: ID 300")
                }, error => {
                    console.dir(error);
                });

          }
      });
  }

  public cancel() {
    //cancels all, later only cancel three o clock notifications
    LocalNotifications.cancelAll();
  }

  
}
