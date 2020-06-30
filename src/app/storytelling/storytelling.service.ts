import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url = 'https://cognizantreflectapi.com/StoryTellingForImpact/';

@Injectable()
export class StoryTellingService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    };
    getstorytellingquestions() {
        return this.httpClient.get(url + "getStoryTellingImpactQuizzes",this.httpOptions);
    }


    submitstorytellingresponse(responseData:any){

        return this.httpClient.post(url+"saveStoryTellingQuizAttempts",responseData,this.httpOptions).subscribe((res)=>{
        });
      
    }

}