import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url = 'https://cognizantreflectapi.com/MakingTimeForMeQuiz/';

@Injectable()
export class MakeTimeForMeService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    };

    getmaketimeformequestions() {
        return this.httpClient.get(url + "getMakingTimeForMeQuiz",this.httpOptions);        
    }


    submitmaketimeformeresponse(responseData:any){
       return this.httpClient.post(url+"saveMakingTimeForMeQuizAttempts",responseData,this.httpOptions).subscribe((data:any) => {});;

    }

}