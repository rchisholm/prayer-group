import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
import { exit } from 'nativescript-exit';
import { topmost } from "ui/frame";
import { AndroidApplication } from "application";
//import { TnsSideDrawer } from 'nativescript-sidedrawer'
import { Location } from '@angular/common';
//import { NavigationEnd } from '@angular/router';
//import 'rxjs/add/operator/pairwise';

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { setHintColor } from "../../utils/hint-util";

@Component({
  selector: "login",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css", "shared/drawer.css"],
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;

  @ViewChild("container") container: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(private router: Router, 
    private userService: UserService, 
    private page: Page, 
    private _changeDetectionRef: ChangeDetectorRef,
    private location: Location
    ) {
    this.user = new User();

    /*
    TnsSideDrawer.build({
    templates: [{
        title: 'Submit Prayer Intention',
        androidIcon: 'apple',
        iosIcon: 'apple',
    }, {
        title: 'Set Reminders',
        androidIcon: 'pear',
        iosIcon: 'pear',
    }, {
        title: 'Pray With Us',
        androidIcon: 'banana',
        iosIcon: 'banana',
    }, {
        title: 'Close Menu',
    }],
    title: 'Prayer Group',
    subtitle: 'Come pray with us.',
    listener: (index) => {
        switch(index) {
          case 0: {
            this.goSubmitIntention();
            break;
          }
          case 1:{
            this.goReminders();
            break;
          }
          case 2:{
            this.openDrawer();
            break;
          }
          case 3:{
            this.openDrawer();
            break;
          }

        }
    },
    context: this,
    })
    */
    
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
     let _this = this;
     /*
    _this.router.events
    .filter(e => e instanceof NavigationEnd)
    .pairwise().subscribe((e) => {
        console.log(e);
    });
    */

    this.page.actionBarHidden = true;
    //this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
    let activity = topmost().android.currentActivity || topmost().android.activity;

    activity.onBackPressed = function() {
        // Your implementation
        if(_this.drawer.getIsOpen()){
          _this.drawer.closeDrawer();
        }
        else if(_this.router.url != "/"){
          _this.location.back();
        }
        else {
          exit();
        }
    }
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }

    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.router.navigate(["/list"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    
    this.setTextFieldColors();
    
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
    
  }

  setTextFieldColors() {
    
    let emailTextField = <TextField>this.email.nativeElement;
    let passwordTextField = <TextField>this.password.nativeElement;

    let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
    
  }


}
