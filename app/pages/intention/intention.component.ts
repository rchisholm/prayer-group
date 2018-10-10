import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { TextField } from "ui/text-field";
import { IntentionService } from "../../shared/intention/intention.service";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';

import * as SocialShare from "nativescript-social-share";

@Component({
  selector: "intention",
  providers: [IntentionService],
  templateUrl: "pages/intention/intention.html",
  styleUrls: ["pages/intention/intention-common.css", "pages/intention/intention.css", "shared/drawer.css"]
})
export class IntentionComponent implements AfterViewInit, OnInit {
  intention: String;
  dialogs = require("ui/dialogs");
  doClear: boolean;

  constructor(private router: Router,
    private zone: NgZone, 
    private intentionService: IntentionService, 
    private _changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.intention="";
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


  //user clicks submit
  submit() {
    //there is a typed intention
    if(this.intention.length != 0)
      this.dialogs.confirm({
        title: "Submit",
        message: "Send intention \""+this.intention+"\"?",
        okButtonText: "OK",
        cancelButtonText: "Edit"
      }).then(result => this.submitIntention(result));
    else {
      //there was no intention entered
      this.dialogs.alert({
        title:"Nothing entered",
        message:"Please enter an intention.",
        okButtonText:"OK"
      })
    }
  }

  //clear intention entry field
  clearIntention() {
      this.intention="";
  }

  //called when submission is confirmed
  submitIntention(submit: boolean):any {
    if(submit){
        //console.log("SENT: "+this.intention);

        //pass intention to webservice...
         this.intentionService.submitP(this.intention)
          .subscribe(serverOk => 
            /*
            response => {
            console.log("RESPONSE: "+JSON.stringify(response.json()));
            alert("Your intention was successfully sent.");
          },
            () => alert("Unfortunately we were unable to send your intention.")
            */

        {
          console.log("serverOk: "+serverOk);
          if(serverOk != "TRUE")
            alert("Unfortunately we were unable to send your intention.");
          else
            alert("Your intention was successfully sent.");
        },

        //() => alert("Your intention was successfully sent."),
        (error) => alert("Unfortunately we were unable to send your intention.")
           
          ); 
      this.clearIntention();
      }

    
  }


  

}