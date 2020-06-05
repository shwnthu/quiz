import {isTokenValid} from './interceptor';
import { createRoom , getRooms , joinRoom } from '../controller/rooms'
 


router.post('/service/user/createRoom',isTokenValid,createRoom)
router.get('/service/user/getRooms',isTokenValid,getRooms)
router.get('/service/user/joinRoom/:room_id',isTokenValid,joinRoom)


module.exports = router;