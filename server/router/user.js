import {isTokenValid} from './interceptor';
import { authenticateUser , verifyOtp } from '../controller/signUp'
import {  resendOtp , updateProfile } from '../controller/login'


router.post('/service/user/authenticateUser',authenticateUser)
router.post('/service/user/verifyOtp',verifyOtp)
router.post('/service/user/resendOtp',resendOtp)
router.post('/service/user/updateProfile',isTokenValid,updateProfile)

// router.post('/service/user/updateProfilePic',isTokenValid,updateProfilePic)

module.exports = router;