import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalUserService } from 'app/msaluser.service';

var url = 'https://cognizantreflectapi.com/CulturalObservation/';
@Injectable({
  providedIn: 'root'
})
export class CulturalobservationService {

  constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }


  httpOptions = {  
    headers: new HttpHeaders({  
        'Content-Type': 'application/json',  
        'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
    })  

};

  getCulturalobservationquizService() {

    return this.httpClient.get(url + "getCulturalObservationQuiz",this.httpOptions);
}

submitculturalobervationresponse(responseData:any[]){

  return this.httpClient.post(url+"saveCultureObservationAttempt",responseData,this.httpOptions).subscribe((res)=>{
  });

}
}
