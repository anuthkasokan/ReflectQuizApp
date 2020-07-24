import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url = 'https://cognizantreflectapi.com/blindspot/';
var userUrl ='https://cognizantreflectapi.com/dashboard/';


@Injectable()
export class BlindSpotService {
    constructor(private httpClient: HttpClient, private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    }; 

    getCoWorkers(){

        return this.httpClient.get(userUrl+"getUser",this.httpOptions);
    }

    getblindspotquestions() {

        return this.httpClient.get(url+"getBlindSpotQuestions",this.httpOptions);
    }


    submitblindspotresponse(responseData:any){

       return this.httpClient.post(url+"saveUserAttempts",responseData,this.httpOptions);

    }

    showBlindSpotResult(user:any) {

        return this.httpClient.get(url+"getBlindSpotResult/"+user,this.httpOptions);
    }
}