"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
import { TokenModel } from '../model/tokenManager';
import { Utils } from '../utility/utils';
import {Messages} from '../utility/message'
import { QUESTIONSMODEL} from '../model/questions'

const tokenModel = new TokenModel();
let db = DbConnMgr.getInstance();
let util = new Utils();

const STATUS = {
    SUCCESS: 0,
    FAILURE: 1
  }

  export class QUESTIONS {
    constructor(userdata) {

    }
  }



  export const addQuestions = (request,response)=>{
    __addQuestions(request, response).then(Res => {
        return Res;
      })
  }

  export const getAllQuestions = (request,response)=>{
    __getAllQuestions(request, response).then(Res => {
        return Res;
      })
  }

 

  const __addQuestions = async (request,response) =>{
      let userId = request.params.userId;
      let questionsModel = new QUESTIONSMODEL();
      let role = await questionsModel.getRole(userId);
      if(role) {
        if(role[0].role_id == 1) {
            let questions  = request.body;
            console.log(questions)
            let count = 0;
            for(let question=0;question< questions.length;question++) {
                await questionsModel.createQuestion(questions[question],userId);
                count++;
            }
            if(count==questions.length){
                response.send(ResponseHelper.buildSuccessResponse({}, 'Questions Created Successfully', STATUS.SUCCESS)); 
            }
            else {
                response.send(ResponseHelper.buildSuccessResponse({}, 'Error While Creating Questions.Please try again later.', STATUS.SUCCESS)); 
            }

        }
        else {
            response.send(ResponseHelper.buildSuccessResponse({}, 'User Doesnot have access to add Questions.', STATUS.FAILURE)); 
        }
      }
      else {
        response.send(ResponseHelper.buildSuccessResponse({}, 'Something went wrong', STATUS.FAILURE));
      }
      
  }



  const __getAllQuestions = async (request,response) =>{
      let userId = request.params.userId;
      let questionsModel = new QUESTIONSMODEL();
      let role = await questionsModel.getRole(userId);
      if(role) {
        if(role[0].role_id == 1) {
           let questions = await questionsModel.getAllQuestions(userId);
           if(questions) {
            let allQuestions = [];
            for(let question = 0;question<questions.length;question++) {
                let questionFormat = {
                    'question_id' : '',
                    'question' : '',
                    'options' : []
                }
                questionFormat.question_id = questions[question].question_id;
                questionFormat.question = questions[question].question;
                questionFormat.options.push(questions[question].option1);
                questionFormat.options.push(questions[question].option2);
                questionFormat.options.push(questions[question].option3);
                questionFormat.options.push(questions[question].option4);
                allQuestions.push(questionFormat);
                questionFormat = {
                 'question_id' : '',
                 'question' : '',
                 'options' : []
             }
 
            }
            response.send(ResponseHelper.buildSuccessResponse(allQuestions, 'Questions  Fetched Successfully', STATUS.SUCCESS)); 
           }
           else {
            response.send(ResponseHelper.buildSuccessResponse({}, 'No Questions Found.', STATUS.FAILURE)); 
           }
           
         

        }
        else {
            response.send(ResponseHelper.buildSuccessResponse({}, 'User Doesnot have access .', STATUS.FAILURE)); 
        }
      }
      else {
        response.send(ResponseHelper.buildSuccessResponse({}, 'Something went wrong', STATUS.FAILURE));
      }
  }