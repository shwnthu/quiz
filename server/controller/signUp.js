"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
import { TokenModel } from '../model/tokenManager';
import { Utils } from '../utility/utils';
import {Messages} from '../utility/message'
import {UserModel} from '../model/signUp'
import { OtpModel } from '../model/otp';



const tokenModel = new TokenModel();
let db = DbConnMgr.getInstance();
let util = new Utils();
let userModel = new UserModel();
let authKey = process.env.SMS_API_KEY;
const TwoFactor = new (require('2factor'))(authKey);
let otpModel = new OtpModel();



const STATUS = {
    SUCCESS: 0,
    FAILURE: 1
  }


export class USER {
    constructor(userdata) {
        this.user={
           
            'mobile'     : userdata.mobile,
            'created_on' : util.getCurrentTimeStamp()
        }
        this.deviceInfo={
            'device_type':userdata.device_type,
            'device_name':userdata.device_name,
            'device_model':userdata.device_model,
            'os_version':userdata.os_version,
            'device_token':'',
            'ip_address':userdata.ip_address,
            'app_version':userdata.app_version,
            'created_on' : util.getCurrentTimeStamp()
        }
        this.otp = {
          'otp' : userdata.otp,
          'emailOrMobile' : userdata.emailOrMobile
        }
        this.created_on = util.getCurrentTimeStamp();
      this.token = uuidv1() + Math.floor(new Date() / 1000);
    }
  }


export const authenticateUser = (request, response) => {
    __authenticateUser(request, response).then(resgistrationRes => {
      return resgistrationRes;
    })
  };



  const __authenticateUser = async (request, response) => {
    let user = new USER(request.body);
    let isValidRegReq = await util.isValidRegRequest(user);
    if(isValidRegReq.status==0){
        let role_id=2
        let isActive=0;
    let conn = await db.getConnObject();
    try {
        let isUnique = await userModel.checkUniqueId( user.user.mobile);
        if (isUnique.length == STATUS.SUCCESS) {
          let otp = await __getOtp();
         const otpRes=await TwoFactor.sendOTP(user.user.mobile, {otp: otp, template: 'otp'}).then((res) => {
          return STATUS.SUCCESS;
          }, (err) => {
            return err
          })
         if(otpRes==STATUS.SUCCESS){
          const saveOtpRes = await otpModel.saveOtp(user.user.mobile,otp,user.created_on);
          await conn.beginTransaction();
          let userRes = await userModel.createUser(conn,
               user.user.mobile, role_id,isActive, user.user.created_on);
               if (userRes) {
                
                conn.commit();
                conn.release();
                await userModel.insertBalance(userRes.insertId);
                user.deviceInfo.device_token= user.token;
                await userModel.insertDeviceInfo(user.deviceInfo,userRes.insertId)
                  
                    await tokenModel.saveLoginToken(userRes.insertId, user.token);
                    response.send(ResponseHelper.buildSuccessResponse({},Messages.signUp.signUpSuccess , STATUS.SUCCESS));
               }
               else{
                conn.release();
                response.send(ResponseHelper.buildSuccessResponse({}, Messages.signUp.error, STATUS.FAILURE));
               }
         }
         else{
          response.send(ResponseHelper.buildSuccessResponse({},Messages.signUp.otpError , STATUS.SUCCESS));
         }
        }
        else{
          let otp = await __getOtp();
          let userId = isUnique[0].userId;
          const otpRes=await TwoFactor.sendOTP(user.user.mobile, {otp: otp, template: 'otp'}).then((res) => {
          
           return STATUS.SUCCESS;
           }, (err) => {
             return err
           })
           await otpModel.updateOtp(otp, user.created_on, user.user.mobile)
           if(otpRes==STATUS.SUCCESS){
              let saveToken = await tokenModel.saveLoginToken(userId, user.token);
              user.deviceInfo.device_token= user.token;
              await userModel.insertDeviceInfo(user.deviceInfo,userId);
              response.send(ResponseHelper.buildSuccessResponse({},'Please Verify OTP Sent to registered Mobile Number.', STATUS.SUCCESS));
           }
           else{
              response.send(ResponseHelper.buildSuccessResponse(otpRes,'Error sending OTP.', STATUS.FAILURE));  
           }
        }
    }
    catch (err) {
      conn.rollback();
      conn.release();
      console.log(err);
        response.send(ResponseHelper.buildFailureResponse(new Error('Internal Server Error')));
      }

}
else{
    response.send(ResponseHelper.buildSuccessResponse(isValidRegReq, Messages.signUp.validationError, STATUS.FAILURE));
}
}



export const verifyOtp = (request, response) => {
  __verifyOtp(request, response).then(otpRes => {
    return otpRes;
  })
};


const __verifyOtp = async (request,response)=>{
  let user = new USER(request.body);
  let otp = user.otp.otp;
  try {
    let isExpired = await otpModel.isExpired(user.otp.emailOrMobile);
    if (isExpired.length > 0) {

      let cuurentTime = Date.now(); //current time in miliseconds
      let otpCreatedTime = Date.parse(isExpired[0].created_on); //otp timestamp in millisecond
      let diffMili = cuurentTime - otpCreatedTime;
      let diffSec = diffMili / 1000;
      let diffmin = Math.floor(diffSec / 60); // Converting difference milisecond in minute

      if (isExpired[0].isVerified) {
        if(diffmin > 30){
          let expOtp = await otpModel.doExpireOtp(user.otp.emailOrMobile);
          return response.send(ResponseHelper.buildSuccessResponse({}, 'Your OTP expired,Please Request New OTP', STATUS.FAILURE));
        }
        else{
          let ResObj = await userModel.getUserDetails(user.otp.emailOrMobile);
          return response.send(ResponseHelper.buildSuccessResponse(ResObj, 'OTP Already Verified ', STATUS.FAILURE));
        }
        
      } else if (diffmin > 5) {
        let expOtp = await otpModel.doExpireOtp(user.otp.emailOrMobile);
        return response.send(ResponseHelper.buildSuccessResponse({}, 'Your OTP expired,Please Request New OTP', STATUS.FAILURE));
      } else {
        if (otp == isExpired[0].otp) {
           await otpModel.verifyOtp(util.getCurrentTimeStamp(), user.otp.emailOrMobile);
           await userModel.activeAccount(user.otp.emailOrMobile);
          let ResObj = await userModel.getUserDetails(user.otp.emailOrMobile);

          return response.send(ResponseHelper.buildSuccessResponse(ResObj, 'OTP Successfully Verified', STATUS.SUCCESS));
        } else {
          return response.send(ResponseHelper.buildSuccessResponse({}, 'Please Enter Correct OTP', STATUS.FAILURE));
        }
      }
    } else {
      return response.send(ResponseHelper.buildSuccessResponse({}, 'Please Enter Correct Email or Mobile', STATUS.FAILURE));
    }
  }
  catch (err) {
    console.log(err);
    return response.send(new Error('OTP verification Fail'));
  }
}

 const  __getOtp = () => {
  let digit = '0123456789';
  let otp = '';

  for (let i = 0; i < 6; i++) {
    otp += digit[Math.floor(Math.random() * 10)];
  }
  return otp;
}





