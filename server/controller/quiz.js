"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
import { Utils } from '../utility/utils';
import {Messages} from '../utility/message'
import { QUESTIONSMODEL} from '../model/questions'
import { QUIZMODEL } from '../model/quiz';



let db = DbConnMgr.getInstance();
let util = new Utils();
let questionsModel = new QUESTIONSMODEL();
let quizModel = new QUIZMODEL();
var moment = require("moment");

const STATUS = {
    SUCCESS: 0,
    FAILURE: 1
  }

  export class QUIZ {
    constructor(userdata) {
        this.quizData = {
            'topic' :userdata.topic,
            'questions' : userdata.questions,
            'start_time':userdata.start_time,
            'end_time' :userdata.end_time
        }
        this.currentDateTime = util.getCurrentTimeStamp();
    }
  }


  export const createQuiz = (request,response) =>{
    __createQuiz(request, response).then(Res => {
        return Res;
      })
  }
  

  export const getAllQuiz = (request,response) =>{
    __getAllQuiz(request, response).then(Res => {
        return Res;
      })
  }

const __getAllQuiz = async (request,response) =>{
    let quizList = await quizModel.getAllQuiz();
    console.log(quizList)
    if(quizList) {
        let todayQuiz = [];
        for(let quiz=0;quiz<quizList.length;quiz++) {
            console.log('In for')
            let  Sec = await calculateSec(util.getCurrentTimeStamp(),quizList[quiz].start_time);
            console.log(Sec);
            if(Sec>0) {
                const Days = await calculateDays(util.getCurrentTimeStamp(),quizList[quiz].start_time);
                console.log(Days)
                if((Days>0 && Days < 1 )|| Days ==0 ) {
                    todayQuiz.push(quizList[quiz]);

                }
            }
        }
        response.send(ResponseHelper.buildSuccessResponse({todayQuiz},'Quiz List Fetched Successfully.' , STATUS.SUCCESS));
    }
    else {
 response.send(ResponseHelper.buildSuccessResponse({},'No Quiz Found' , STATUS.FAILURE));
    }
}


  const __createQuiz = async (request,response) =>{
      let userId = request.params.userId;
      let quiz = new QUIZ(request.body);
    let role = await questionsModel.getRole(userId);
    let secsDiff = await calculateSec(quiz.quizData.start_time,quiz.quizData.end_time);
    console.log(secsDiff);
    if(secsDiff>0) {
        if(role) {
            if(role[0].role_id == 1) {
               let createQuiz = await quizModel.createQuiz(quiz.quizData,userId);
               if(createQuiz) {
                response.send(ResponseHelper.buildSuccessResponse({}, 'Quiz Created Successfully', STATUS.FAILURE)); 
               }
               else {
                response.send(ResponseHelper.buildSuccessResponse({}, 'Error while Creating Quiz. Please try again later.', STATUS.FAILURE)); 
               }
    
            }
            else {
                response.send(ResponseHelper.buildSuccessResponse({}, 'User Doesnot have access.', STATUS.FAILURE)); 
            }
          }
          else {
            response.send(ResponseHelper.buildSuccessResponse({}, 'Something went wrong', STATUS.FAILURE));
          }
    }
    else {
        response.send(ResponseHelper.buildSuccessResponse({}, 'Enter Correct Start and End Time', STATUS.FAILURE));
    }
   
  }



  const  calculateSec = (startDate,endDate)=>
{
   var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
   var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
   var duration = moment.duration(end_date.diff(start_date));
   var secs = duration.asSeconds()       
   return secs;
}


const  calculateDays = (startDate,endDate)=>
{
   var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
   var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
   var duration = moment.duration(end_date.diff(start_date));
   var days = duration.asDays()       
   return days;
}




