import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url = 'https://cognizantreflectapi.com/feedback/Feedback/';


@Injectable()
export class AdminLayoutService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { } 

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    }; 

    sendQuery(query:any)
    {
         return this.httpClient.post(url+"saveFeedbackQuestion",query,this.httpOptions);
    }
}
