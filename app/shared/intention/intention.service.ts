import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Config } from "../config";

@Injectable()
export class IntentionService {
  constructor(private http: Http) {}

  //submits using json (post), returns json object (USE THIS ONE)
  submitP(intention: String) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    //log send JSON for testing
    console.log("SENT: "+JSON.stringify({
        func: 'add',
        format: 'json',
        new: intention
      }));

    //send via http
    return this.http.post(
      Config.servicePostUrl,
      JSON.stringify({
        func: 'add',
        format: 'json',
        new: this.clean(intention)
      }),
      { headers: headers }
    )
    .map(response => response.json())//map the response json object members to data
    .map(data => {//do things w the json object members in data
      console.log("OK: "+data.response.ok);//get the "ok" member
      console.log("INFO: "+data.response.info);//get the "info" member
      return data.response.ok;
    })
    .catch(this.handleErrors);
  }

  //handles offline error, etc
  handleErrors(error: Response) {
    console.log("ERROR: "+JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  //replace spaces w underscores for networking
  clean(string: String){
    return string.replace(" ", "_");
  }

  //submits using query string, returns json object
  submitQ(intention: String) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    console.log("SENT: "+ Config.serviceUrl + "?func=add&format=json&new="+intention);

    return this.http.post(
      Config.serviceUrl + "?func=add&format=json&new="+intention,
      '',
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  //returns a static json object, regardless of submission
  submitTest(intention: String) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    console.log("SENT: "+JSON.stringify({
        func: 'add',
        format: 'json',
        new: intention
      }));

    return this.http.post(
      Config.testUrl,
      JSON.stringify({
        func: 'add',
        format: 'json',
        new: intention
      }),
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

}