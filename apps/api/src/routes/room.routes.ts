import * as RoomController from '@controllers/room.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', RoomController.getRooms);
router.post('/', RoomController.createRoom);
router.delete('/', RoomController.deleteRoom);
router.get('/:id', RoomController.getRoomById);

export default router;
