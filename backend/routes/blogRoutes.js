import express from 'express';
import { addArticle } from '../controllers/blogController.js';
import { authenticateToken } from '../controllers/userController.js';

const router = express.Router();


router.post('/addArticle', authenticateToken, addArticle);



export default router;
