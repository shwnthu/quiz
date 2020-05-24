export const sqlObj = {
    signUp:{
        checkUniqueId      : `select email, mobile from user where email = '{0}' OR mobile = '{1}'`,
        createUser    :  `insert into user (fname,lname, mobile,email, role_id, isActive, created_on) values ('{0}','{1}' ,'{2}', '{3}', '{4}', '{5}','{6}')`,
        storeDeviceInfo: `insert into device_info (userId,device_type, device_name, model,os_version,device_token,ip,app_version,created_on) values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}')`,
        getUserDetails      : `select userId,fname,lname,mobile,email,isActive,role_id from user where mobile = '{0}'`,
        getDeviceDetails      : `select device_type,device_name,model,os_version,device_token,ip,app_version from device_info where userId = '{0}' ORDER BY id DESC;`,
        activeAccount: `update user set isActive = '{0}' where mobile = '{1}'`,


    },
    login :{
      isUserExists      : `select email, mobile,userId from user where mobile = '{0}'`,
    },
    tokenManger: {
        saveLoginToken: `insert into token(userId, token, created_on) VALUES('{0}','{1}','{2}')`,
        saveToken: `insert into token(userId, token, created_on) VALUES('{0}','{1}','{2}')`,
        getTokenDetails: `select created_on, token, userId from token where token = '{0}' ORDER BY created_on desc`,
        saveLog: `insert into audit_log (token, request ,ip,request_path , requested_method,created_on) VALUES('{0}','{1}','{2}','{3}','{4}','{5}')`,
    
      },
      otp: {
        saveOtp: `insert into OTPValidator (emailOrMobile, otp, created_on) values ('{0}','{1}','{2}')`,
        updateOtp: `update OTPValidator set otp = '{0}', isVerified = 0 , created_on = '{1}' where emailOrMobile = '{2}'`,
        isExist: `select id from OTPValidator where emailOrMobile = '{0}'`,
        isExpire: `select otp, isVerified, created_on from OTPValidator where emailOrMobile = '{0}'`,
        verifyOtp: `update OTPValidator set isVerified = 1, isExpired = 0, updated_on = '{0}' where emailOrMobile = '{1}'`,
        doExpireOtp: `update OTPValidator set isExpired = 1 ,updated_on = '{1}' where emailOrMobile = '{0}'`
      }
}