import express from 'express';
const router = express.Router();

import { getData, updateData, updateParams } from '../controllers/Data-controller.js';

router.get('/', getData);
router.post('/saveData/:id', updateData);
router.post('/saveParams', updateParams);


export default router;