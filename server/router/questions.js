import {isTokenValid} from './interceptor';
import { addQuestions , getAllQuestions } from '../controller/questions'



router.post('/service/user/addQuestions',isTokenValid,addQuestions)
router.get('/service/user/getAllQuestions',isTokenValid,getAllQuestions)

// router.post('/service/user/updateProfilePic',isTokenValid,updateProfilePic)

module.exports = router;