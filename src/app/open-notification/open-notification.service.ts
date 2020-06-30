import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var feedBackUrl = 'https://cognizantreflectapi.com/feedback/Feedback/';
var blindSpotUrl='https://cognizantreflectapi.com/blindspot/'


@Injectable()
export class OpenNotificationService {
    constructor(private httpClient: HttpClient, private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    }; 

    getblindspotquestions() {

        return this.httpClient.get(blindSpotUrl+"getBlindSpotQuestions", this.httpOptions);

    }

    
    saveFeedback(feedback:any)
    {
        return this.httpClient.post(feedBackUrl+"saveFeedbackReply",feedback,this.httpOptions);

    }

    saveBlindSpot(blindspot:any)
    {
        return this.httpClient.post(blindSpotUrl+"saveCoWorkerReplies",blindspot,this.httpOptions);
    }

}


