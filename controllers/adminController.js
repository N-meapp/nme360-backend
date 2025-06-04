import { login, addBlogs, editBlog, listBlogs, listCareers, addCareers, deleteBlog, deleteCareer, editCareer, createEnquiry, listEnquiries } from "../handlers/adminHandler.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { response } from "express";
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
    const { fullName, email, number, description, position, status } = req.body;
    const resumeFile = req.file;

    if (status == 'enquiry') {
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
        <h2>Enquiry about ${position}</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Service:</strong> ${position}</p>
        <p><strong>Description:</strong> ${description}</p>
      </div>
    `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Email not sent. Please try again.' });
            }
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        });
    } else {

        if (!resumeFile) {
            return res.status(400).json({ error: 'Resume file is required.' });
        }


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
    }
};


export const postEnquiryController = async (req, res, next) => {


    console.log(req.body, 'dfdfd');

    const { name, email, number, subject, message } = req.body

    let isValidName = true
    let isValidEmail = true
    let isValidPhone = true

    if (!name) {
        isValidName = false
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        isValidName = false
    } else {
        isValidName = true
    }
    if (!email) {
        isValidEmail = false
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        isValidEmail = false
    } else {
        isValidEmail = true
    }
    if (!number) {
        isValidPhone = false
    } else if (!/^(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/.test(number)) {
        isValidPhone = false
    } else {
        isValidPhone = true
    }

    let response;
    if (isValidEmail && isValidEmail && isValidPhone) {
        response = await createEnquiry({ name, email, number, subject, message })
    } else {
        response = null
    }


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