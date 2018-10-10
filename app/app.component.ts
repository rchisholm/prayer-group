import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
/*
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
*/

import { setStatusBarColors } from "./utils/status-bar-util";

@Component({
  selector: "main",
  //templateUrl: "app.html",
  template:`<page-router-outlet></page-router-outlet>`,
})
export class AppComponent/* implements AfterViewInit*/{
  constructor(/*private _changeDetectionRef: ChangeDetectorRef*/) {
    setStatusBarColors();
  }
  	/*
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
	*/

	
}
