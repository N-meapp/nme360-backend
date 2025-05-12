import express from 'express';
import {
  handleLoginController,
  postBlogController,
  getBlogController,
  postCareerController,
  getCareerController,
  editBlogController,
  deleteBlogController,
  editCareerController,
  deleteCareerController,
  sendMail,
  getEnquiryController,
  postEnquiryController
} from '../controllers/adminController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
import dotenv from 'dotenv';
dotenv.config();



router.post('/login', handleLoginController);


router.post('/blog', postBlogController);


router.patch('/blog', editBlogController);

router.get('/blog', getBlogController);

router.delete('/blog', deleteBlogController);



router.post('/career', postCareerController);


router.patch('/career', editCareerController);

router.get('/career', getCareerController);

router.delete('/career', deleteCareerController);

router.get('/enquiry', getEnquiryController)

router.post('/enquiry', postEnquiryController)

router.post('/send-mail',upload.single('resume'),sendMail);



export default router;






