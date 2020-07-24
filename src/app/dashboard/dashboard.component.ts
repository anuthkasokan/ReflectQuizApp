import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from './dashboard.service';
import { Chart } from 'chart.js'
import { MsalUserService } from 'app/msaluser.service';

class performance{
  incScore:boolean;
  percent:string;
  quiz:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  attemptHistory:any;
  scoreChart=[];
  claChart:any;
  curiosityAnswers:any;
  GrowthMindsetAnswers:any;
  MakeTimeAnswers:any;
  AdminComments: any;
  curiosityAttempts:any;
  growthMindsetAttempts:any;
  makingTimeAttempts:any;
  cultureObservationAttempts:any;
  attemptChartType:any;
  attemptChartDatasets:Array<any>;
  attemptChartLabels:Array<any>;
  attemptChartColors:Array<any>;
  attemptChartOptions:any;
  claChartType:any;
  claChartDatasets:Array<any>;
  claChartLabels:Array<any>;
  claChartColors:Array<any>;
  claChartOptions:any;
  quizAttempts = new Array<any>();
  blindAttempts = new Array<any>();
  scoreArray =['Curiosity', 'Growth Mindset', 'Make Time','Culture Observation'];
  blindArray = ['Arena ', 'Blind Spot', 'Facade', 'Unknown'];
  users =[];
  showBlindSpot=true;
  percentageOfQuizCompletion:any;
  scoreChartDetails:any;
  attemptCounts:any;
  curiosityAnswerTable:any;
  growthMindsetAnswerTable:any;
  makingTimeForMeTable:any;
  attemptHistoryChartDetails:any;
  continuousLearningChart:any;
  getAdminComments:any;
  hideDoughnut=false;
  current:any;
  max= 100;
  showForAdmin=false;
  showDashboard=false;

  constructor(private dashBoardService: DashboardService, private msalUserService:MsalUserService) { }

  ngOnInit() {

    this.msalUserService.getRoleByUser()
    .subscribe(
      (response: any) => {
        let userDetails = response;
        localStorage.setItem("user",userDetails[0].userId);
        localStorage.setItem("role",userDetails[0].role);
        if(userDetails[0].role =="Admin")
        {
          this.dashBoardService.getUsers()
          .subscribe(
            (response: any) => {
              this.users = response;
              this.showForAdmin = true;
              this.getAllData();
            },
            (error) => console.log(error)
          );
        }
        else{
          this.getUserWiseAllData(userDetails[0].userId);
        }
      },
      (error) => console.log(error)
    );

  }

  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
};

getUserWiseAllData(user:any)
{
  this.showDashboard = false;
  this.dashBoardService.getPercentageOfCompletionForUser(user)
  .subscribe(
    (response: any) => {
    
      this.current= response;
    },
    (error) => console.log(error)
  );
   this.dashBoardService.getScoreChartByUser(user)
  .subscribe(
    (response: any) => {
    
      this.scoreChart = response;
      this.getScoreChart();
      this.showDashboard = true;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getAttemptHistoryChartByUser(user)
  .subscribe(
    (response: any) => {
      console.log(response);
      this.attemptHistory = response;
      this.attemptChartDatasets = [{

        data: this.attemptHistory, 
    
        label: 'Attempt History' 
    }];
    this.getAttemptHistoryDoughnut();

    this.attemptHistory.every(item => item === 0)?this.hideDoughnut =true:this.hideDoughnut=false
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getCLACountsByUser(user)
  .subscribe(
    (response: any) => {

      this.claChart = response;
      this.claChartDatasets = [{

        data: this.claChart, 
      
        label: 'Continuous learning quiz History' 
      }];
      this.getContinuousLearningDoughnut();
      this.claChart.every(item => item === 0)?this.hideDoughnut =true:this.hideDoughnut=false
    },
    (error) => console.log(error)
  );

this.dashBoardService.getCuriosityAnswersByUser(user)
  .subscribe(
    (response: any) => {
    
      this.curiosityAnswers = response;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getGrowthMindsetAnswersByUser(user)
  .subscribe(
    (response: any) => {
    
      this.GrowthMindsetAnswers = response;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getMakeTimeAnswersByUser(user)
  .subscribe(
    (response: any) => {
    
      this.MakeTimeAnswers = response;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getAdminComments(user)
  .subscribe(
    (response: any) => {
    
      this.AdminComments = response;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getAttemptCountsByUser(user)
  .subscribe(
    (response: any) => {
    
      let attemptCounts = response;
      this.curiosityAttempts = attemptCounts.curiosityQuizAttemptCount;
      this.growthMindsetAttempts = attemptCounts.growthMindsetAttemptCount;
      this.makingTimeAttempts = attemptCounts.makingTimeForMeAttemptCount;
      this.cultureObservationAttempts = attemptCounts.cultureObservationAttemptCount;
    },
    (error) => console.log(error)
  );

}

getAllData()
{
   this.showDashboard=false;   
  this.dashBoardService.getPercentageOfCompletion()
  .subscribe(
    (response: any) => {
    
      this.current= this.percentageOfQuizCompletion=  response;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getScoreChart()
  .subscribe(
    (response: any) => {
    
      this.scoreChart =this.scoreChartDetails = response;
      this.getScoreChart();
      this.showDashboard=true;
    },
    (error) => console.log(error)
  );

   this.dashBoardService.getAttemptCounts()
  .subscribe(
    (response: any) => {
    
      this.attemptCounts = response;
      this.curiosityAttempts =  this.attemptCounts.curiosityQuizAttemptCount;
      this.growthMindsetAttempts =  this.attemptCounts.growthMindsetAttemptCount;
      this.makingTimeAttempts =  this.attemptCounts.makingTimeForMeAttemptCount;
      this.cultureObservationAttempts =  this.attemptCounts.cultureObservationAttemptCount;
    },
    (error) => console.log(error)
  );

   this.dashBoardService.getCuriosityAnswers()
  .subscribe(
    (response: any) => {
    
      this.curiosityAnswers=this.curiosityAnswerTable = response;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getGrowthMindsetAnswers()
  .subscribe(
    (response: any) => {
    
      this.GrowthMindsetAnswers=this.growthMindsetAnswerTable =response;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getMakeTimeAnswers()
  .subscribe(
    (response: any) => {
    
      this.MakeTimeAnswers= this.makingTimeForMeTable = response;
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getAttemptHistoryChart()
  .subscribe(
    (response: any) => {
    
      this.attemptHistory= this.attemptHistoryChartDetails = response;
      this.getAttemptHistoryDoughnut();
    },
    (error) => console.log(error)
  );

  this.dashBoardService.getCLACounts()
  .subscribe(
    (response: any) => {
    
      this.claChart=this.continuousLearningChart = response;    
      this.getContinuousLearningDoughnut();
    },
    (error) => console.log(error)
  );

   this.dashBoardService.getAdminComments('')
  .subscribe(
    (response: any) => {
    
      this.AdminComments = response;    
    },
    (error) => console.log(error)
  );
}

RefreshList()
{

  this.current= this.percentageOfQuizCompletion;
  this.scoreChart = this.scoreChartDetails;
  this.attemptHistory = this.attemptHistoryChartDetails;
  this.claChart =  this.continuousLearningChart;
  this.curiosityAnswers =  this.curiosityAnswerTable;
  this.GrowthMindsetAnswers = this.growthMindsetAnswerTable;
  this.MakeTimeAnswers =  this.makingTimeForMeTable;
  this.AdminComments = this.getAdminComments;
  this.curiosityAttempts = this.attemptCounts.curiosityQuizAttemptCount;
  this.growthMindsetAttempts = this.attemptCounts.growthMindsetAttemptCount;
  this.makingTimeAttempts = this.attemptCounts.makingTimeForMeAttemptCount;
  this.cultureObservationAttempts = this.attemptCounts.cultureObservationAttemptCount;
  this.getAttemptHistoryDoughnut();
  this.getContinuousLearningDoughnut();
  this.hideDoughnut=false;
}

getScoreChart(){

  this.quizAttempts =[];
  this.blindAttempts=[];

  if(this.scoreChart.length ==2)
  {

    let latestScore = this.scoreChart[0];
    let previousScore = this.scoreChart[1];

    for (let index = 0; index < latestScore.length; index++) {
      
      if(previousScore[index]==0)
      {
          let quizPerform = new performance();
          quizPerform.incScore= true;
          quizPerform.percent='0';
          quizPerform.quiz =this.scoreArray[index];
          this.quizAttempts.push(quizPerform);
         
      }
      else{
        let quizPerform = new performance();

        if(latestScore[index] >=previousScore[index])
          quizPerform.incScore= true;
          else
          quizPerform.incScore = false;

        quizPerform.quiz =this.scoreArray[index];
        quizPerform.percent= Math.abs((((latestScore[index] - previousScore[index])*100)/previousScore[index])).toFixed(2);

        this.quizAttempts.push(quizPerform);
      } 
    }

  }else{
    for (let index = 0; index < 5; index++) {
    let quizPerform = new performance();
    quizPerform.incScore= true;
    quizPerform.percent='0';
    quizPerform.quiz =this.scoreArray[index];
    this.quizAttempts.push(quizPerform);
    
    }
  }
    /* ----------==========     Score Chart    ==========---------- */
    const dataScoreChart: any = {
      labels: this.scoreArray,
      series: this.scoreChart,
      
  };

  var optionsScoreChart = {
    // height:'270px',
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
  }),
      axisX: {
          showGrid: false
      },
      low: 0,
      high:  this.scoreChart[0].max > this.scoreChart[1].max?this.scoreChart[0].max:this.scoreChart[1].max,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  let scoreChart = new Chartist.Line('#scoreChart', dataScoreChart, optionsScoreChart,responsiveOptions);

  this.startAnimationForLineChart(scoreChart);
}

getAttemptHistoryDoughnut()
{
  this.attemptChartDatasets = [{

    data: this.attemptHistory, 

    label: 'Attempt History' 
}];
this.attemptChartType= 'doughnut';


this.attemptChartLabels = ["Blind Spot", "Productivity Zone","Continuous Learning", "Reflection Tool", "Story Telling","Learning Myths"];

this.attemptChartColors= [
  {
    backgroundColor: ['#D9D9D9', '#ADD1FF', '#000063', '#033A0', '#328DFF',"#0033a0"],
    hoverBackgroundColor: ['#D9D9D9', '#ADD1FF', '#000063', '#033A0', '#328DFF',"#0033a0"],
    borderWidth: 2,
  }
];

this.attemptChartOptions= {
  responsive: true
};
}

getContinuousLearningDoughnut()
{
  this.claChartDatasets = [{

    data: this.claChart, 
  
    label: 'Continuous learning quiz History' 
  }];
  this.claChartType= 'doughnut';

  this.claChartLabels = ["Yes","Some What","No"];

  this.claChartColors= [
    {
      backgroundColor: ['#328DFF', '#ADD1FF', '#000063' ],
      hoverBackgroundColor: ['#328DFF', '#ADD1FF', '#000063'],
      borderWidth: 3,
    }
  ];

  this.claChartOptions= {
    responsive: true
  };
}

filterDashboard(event:any)
{
    this.getUserWiseAllData(event.option.value);
}

resetDashboard(event:any)
{
 if(event.target.value =='' || event.target.value == undefined)
 {
  this.RefreshList();
 }
}

attemptChartClicked(e: any): void { }
attemptChartHovered(e: any): void { }
claChartClicked(e: any): void { }
claChartHovered(e: any): void { }
}
