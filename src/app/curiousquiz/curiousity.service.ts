import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

// var url = 'https://cognizantreflectapi.com/CuriousQuiz/'
var url = 'https://cognizantreflectapi.com/CuriousQuiz/';

@Injectable()
export class CuriosityService {
    constructor(private httpClient: HttpClient, private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
    
    };
    

    getcuriosityquestions() {
        return this.httpClient.get(url + "getCuriousQuiz",this.httpOptions);
    }


    submitcuriosityresponse(responseData:any){
        return this.httpClient.post(url+"saveCuriosQuizAttempts",responseData,this.httpOptions).subscribe((res)=>{
        });
    }

}