import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url = 'https://cognizantreflectapi.com/ProductivityZoneQuiz/';

@Injectable()
export class ProductivityZoneService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
    
    };
    productivityzonequestions() {


        return this.httpClient.get(url+"getProductivityZoneQuiz", this.httpOptions);
    }


    submitproductivityzoneresponse(responseData:any){

        return this.httpClient.post(url+"SaveProductivityZoneQuizAttempts",responseData,this.httpOptions).subscribe((res)=>{
        });
      

    }

}