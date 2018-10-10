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
  selector: "friday-reminder",
  templateUrl: "pages/reminders/friday-reminder.html",
  styleUrls: ["pages/reminders/reminders-common.css", "pages/reminders/reminders.css", "shared/drawer.css"],
})
export class FridayReminderComponent implements OnInit {
  public input: any;
  public fridays: Array<string>;
  public customTime: string;

  constructor(private router: Router, private page: Page, private _changeDetectionRef: ChangeDetectorRef) {
    this.input = {
      "id":"1",
      "title":"First Friday",
      "body":"This is your reminder to pray on the first Friday."
    };

    this.fridays = [
      "December 1, 2017",
      "January 5, 2018",
      "February 2, 2018",
      "March 2, 2018",
      "April 6, 2018",
      "May 4, 2018",
      "June 1, 2018",
      "July 6, 2018",
      "August 3, 2018",
      "September 7, 2018",
      "October 5, 2018",
      "November 2, 2018",
      "December 7, 2018"
    ];

    //assign the user's current first friday time to customTime
    //if the reminder is not set...
    this.customTime = "9:00";
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
              for(let x = 0; x < this.fridays.length; x++) {
                let aDate = new Date(this.fridays[x]+" "+this.customTime+":00");
                //if date is in the future, schedule the reminder.
                if (aDate > new Date(new Date().getTime())) {
                  LocalNotifications.schedule([{
                      id: 100 + x,
                      title: this.input.title,
                      body: this.input.body,
                      at: aDate
                  }]).then(() => {
                      Toast.makeText("Reminder scheduled!").show();
                      console.log("REMINDER SCHEDULED: ID "+Number(100+x))
                  }, error => {
                      console.dir(error);
                  });
                }
              }

          }
      });
  }

  public cancel() {
    //cancels all, later only cancel friday notifications
    LocalNotifications.cancelAll();
  }

  
}
