import { v2 as cloudinary } from 'cloudinary';


// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
//   api_key: process.env.CLOUDINARY_API_KEY,        
//   api_secret: process.env.CLOUDINARY_API_SECRET,  
// });

// const options = {
//   cloudinary: cloudinary,
//   params: {
//     folder: 'photos',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
//     public_id: (req, file) => {
//       const originalname = file.originalname.split('.');
//       return `image-${Date.now()}-${originalname[0]}`;
//     }
//   }
// };

// const store = new CloudinaryStorage(options);
// const uploadsMulter = multer({ storage: store }).array("image", 10);

// export default uploadsMulter;



const uploadsMulter =async ()=>{

    // Configuration
    cloudinary.config({ 
        cloud_name: 'djedeaw0l', 
        api_key: '332145637315313', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
}

export default uploadsMulter;