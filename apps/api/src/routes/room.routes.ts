import { Router } from 'express';
import * as RoomController from '@controllers/room.controller.js';

const router = Router();

router.get('/', RoomController.getRooms);
router.post('/', RoomController.createRoom);
router.get('/:id', RoomController.getRoomById);

export default router;
