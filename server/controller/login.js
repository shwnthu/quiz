"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
import { TokenModel } from '../model/tokenManager';
import { Utils } from '../utility/utils';
import {Messages} from '../utility/message'
import {UserModel} from '../model/login'
import { OtpModel } from '../model/otp';
import { UserModel as RegisterModel} from '../model/signUp';

const tokenModel = new TokenModel();
let db = DbConnMgr.getInstance();
let util = new Utils();
let loginModel = new UserModel();
let registerModel = new RegisterModel();
let authKey = 'aa1413af-9cb2-11ea-9fa5-0200cd936042'
const TwoFactor = new (require('2factor'))(authKey);
let otpModel = new OtpModel();
let token = uuidv1() + Math.floor(new Date() / 1000);
const STATUS = {
    SUCCESS: 0,
    FAILURE: 1
  }

  export class USERLOGIN {
    constructor(userdata) {
  this.mobile = userdata.mobile;
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
    this.created_on= util.getCurrentTimeStamp();
   
    }
  }


  export const loginUser = (request,response)=>{
    __userLogin(request, response).then(loginRes => {
        return loginRes;
      })
  }


  const __userLogin = async (request,response)=> {
    let loginData = new USERLOGIN(request.body);
    let isUserExists = await loginModel.isUserExists(loginData.mobile)
    console.log(isUserExists)
    if(isUserExists[0]){
        let otp = await __getOtp();
        let userId = isUserExists[0].userId;
        const otpRes=await TwoFactor.sendOTP(loginData.mobile, {otp: otp, template: 'otp'}).then((res) => {
        
         return STATUS.SUCCESS;
         }, (err) => {
           return err
         })
         await otpModel.updateOtp(otp, loginData.created_on, loginData.mobile)
         if(otpRes==STATUS.SUCCESS){
            let saveToken = await tokenModel.saveLoginToken(userId, token);
            loginData.deviceInfo.device_token=token;
            await registerModel.insertDeviceInfo(loginData.deviceInfo,userId);
            response.send(ResponseHelper.buildSuccessResponse({},'Please Verify OTP Sent to registered Mobile Number.', STATUS.SUCCESS));
         }
         else{
            response.send(ResponseHelper.buildSuccessResponse(otpRes,'Error sending OTP.', STATUS.FAILURE));  
         }
    }
    else{
        response.send(ResponseHelper.buildSuccessResponse({}, Messages.login.UserNotExists, STATUS.FAILURE));
    }
    
  }








  export const resendOtp = (request,response)=>{
    __resendOtp(request, response).then(loginRes => {
        return loginRes;
      })
  }


  const __resendOtp = async (request,response)=>{
      
      let loginData = new USERLOGIN(request.body);
    let isUserExists = await loginModel.isUserExists(loginData.mobile)
    console.log(isUserExists)
    if(isUserExists[0]){
        let otp = await __getOtp();
        let userId = isUserExists[0].userId;
        const otpRes=await TwoFactor.sendOTP(loginData.mobile, {otp: otp, template: 'otp'}).then((res) => {
        
         return STATUS.SUCCESS;
         }, (err) => {
           return err
         })
         await otpModel.updateOtp(otp, loginData.created_on, loginData.mobile)
         if(otpRes==STATUS.SUCCESS){
            let saveToken = await tokenModel.saveLoginToken(userId, token);
            loginData.deviceInfo.device_token=token;
            await registerModel.insertDeviceInfo(loginData.deviceInfo,userId);
            response.send(ResponseHelper.buildSuccessResponse({},'Please Verify OTP Sent to registered Mobile Number.', STATUS.SUCCESS));
         }
         else{
            response.send(ResponseHelper.buildSuccessResponse(otpRes,'Error sending OTP.', STATUS.FAILURE));  
         }
    }
    else{
        response.send(ResponseHelper.buildSuccessResponse({}, Messages.login.UserNotExists, STATUS.FAILURE));
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


  export const updateProfile = (request,response)=>{
    __updateProfile(request, response).then(loginRes => {
        return loginRes;
      })
  }

  const __updateProfilePic = async (request,response)=>{
    let userId = request.params.userId;
    if(request.files){
      let profile_pic = request.files.profile_pic;
      let file_name = profile_pic.name;
      if(profile_pic.mimetype == "image/jpeg" ||profile_pic.mimetype == "image/png"||profile_pic.mimetype == "image/gif"){

        file.mv('public/images/upload_images/'+file.name, function(err) {              
          if (err) {
            response.send(ResponseHelper.buildSuccessResponse({},'Error while uploading Image.', STATUS.FAILURE));
          }
          else {
            var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";
            var query = db.query(sql, function(err, result) {
               res.redirect('profile/'+result.insertId);
            });
          }
            return res.status(500).send(err);
        
       });

      }
      else {
        response.send(ResponseHelper.buildSuccessResponse({},'This format is not allowed,Please upload file with .png, .gif , .jpg', STATUS.FAILURE));
      }
    }
    else {
      response.send(ResponseHelper.buildSuccessResponse({},'No image uploaded', STATUS.FAILURE));
    }
  }