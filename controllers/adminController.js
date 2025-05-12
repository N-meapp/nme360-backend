import { login, addBlogs, editBlog, listBlogs, listCareers, addCareers, deleteBlog, deleteCareer, editCareer, createEnquiry, listEnquiries } from "../handlers/adminHandler.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



export const handleLoginController = async (req, res, next) => {
    try {

        const { username, password } = req.body
        console.log(username, password);


        const response = await login()

        if (response.username == username && response.password == password) {
            res.json({ message: 'Login successfully!', status: true });
        } else {
            res.json({ message: 'Invalid username or password', status: false });

        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const postBlogController = async (req, res, next) => {


    console.log(req.body, 'dfdfd');

    const { title, description, date, image } = req.body

    const response = await addBlogs({ title, description, date, image })


    if (response) {

        res.json({ res: response, status: true });
    } else {
        res.json({ res: response, status: false });

    }




}


export const editBlogController = async (req, res, next) => {


    console.log(req.body, 'patchhh');

    const { title, description, date, image, id } = req.body

    const response = await editBlog({ title, description, date, image }, id)


    if (response) {
        res.json({ status: true });
    } else {
        res.json({ status: false });

    }




}


export const getBlogController = async (req, res, next) => {
    try {

        const response = await listBlogs()
        res.json({ res: response, status: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteBlogController = async (req, res, next) => {

    console.log(req.query);


    const id = req.query.id

    const response = await deleteBlog(id)

    console.log(response, 'responsee');




    res.json({ status: response });



}


export const postCareerController = async (req, res, next) => {


    console.log(req.body, 'dfdfd');

    const { position, experience, skills } = req.body

    const response = await addCareers({ position, experience, skills })


    if (response) {

        res.json({ res: response, status: true });
    } else {
        res.json({ res: response, status: false });

    }




}



export const editCareerController = async (req, res, next) => {


    console.log(req.body, 'patchhh');

    const { position, experience, skills, id } = req.body

    const response = await editCareer({ position, experience, skills }, id)

    if (response) {
        res.json({ status: true });
    } else {
        res.json({ status: false });

    }




}

export const getCareerController = async (req, res, next) => {
    try {

        const response = await listCareers()
        res.json({ res: response, status: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const deleteCareerController = async (req, res, next) => {

    console.log(req.query);


    const id = req.query.id

    const response = await deleteCareer(id)

    console.log(response, 'responsee');




    res.json({ status: response });


}


export const sendMail = (req, res) => {
    const { fullName, email, number, description, position } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
        return res.status(400).json({ error: 'Resume file is required.' });
    }

    // const COMPANY_MAIL_ID = 'hrnmeapp24@gmail.com';
    // const COMPANY_MAIL_PASSWORD = 'nbia kktg datj vxfd';
    
    const COMPANY_MAIL_ID = process.env.VITE_MAIL_ID
    const COMPANY_MAIL_PASSWORD = process.env.VITE_APP_PASSWORD
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: COMPANY_MAIL_ID,
            pass: COMPANY_MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: COMPANY_MAIL_ID,
        subject: `Job Application from ${fullName}`,
        html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Description:</strong> ${description}</p>
      </div>
    `,
        attachments: [
            {
                filename: resumeFile.originalname,
                content: resumeFile.buffer,           // ✅ attach the buffer
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Email not sent. Please try again.' });
        }
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
};


export const postEnquiryController = async (req, res, next) => {


    console.log(req.body, 'dfdfd');

    const { name,email,number,subject,message } = req.body

    const response = await createEnquiry({ name,email,number,subject,message })


    if (response) {

        res.json({ res: response, status: true });
    } else {
        res.json({ res: response, status: false });

    }




}


export const getEnquiryController = async (req, res, next) => {
    try {

        const response = await listEnquiries()
        res.json({ res: response, status: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}