import {isTokenValid} from './interceptor';
import { addQuestions } from '../controller/questions'



router.post('/service/user/addQuestions',isTokenValid,addQuestions)

// router.post('/service/user/updateProfilePic',isTokenValid,updateProfilePic)

module.exports = router;