import Career from '../models/careerModal.js';
import Blog from '../models/blogModal.js'
import Admin from '../models/adminModal.js'
import Enquiry from '../models/EnquiryModal.js'



export const listBlogs =async ()=>{

  const result =await Blog.find()
  if(result){
    return result
  }else{
      return false
  }
  
} 

export const editBlog =async (data,id)=>{

const result =await Blog.findOneAndReplace( { _id: id }, data)
console.log(result);

if(result){
  return true
}else{
    return false
}

} 


export const addBlogs = async(data)=>{
  const blog = new Blog(data);
 const result = await blog.save();

 if(result){
  return result
}else{
    return 'blog not saved'
}

}


export const deleteBlog = async(id)=>{
console.log('iddd',id);

return await Blog.deleteOne({_id:id}).then((result)=>{
if(result.deletedCount>0){
  return true
}else return false
})

}


export const listCareers =async ()=>{

  const result =await Career.find()
  if(result){
    return result
  }else{
      return false
  }
  
} 

export const editCareer =async (data,id)=>{

const result =await Career.findOneAndReplace( { _id: id }, data)
console.log(result);

if(result){
  return true
}else{
    return false
}

} 


export const addCareers = async(data)=>{
  console.log(data,'daaaaraaaaa');
  
  const newCareer = new Career(data);
 const result = await newCareer.save();

 if(result){
  return result
}else{
    return 'Career not saved'
}

}


export const deleteCareer = async(id)=>{
console.log('iddd',id);

return await Career.deleteOne({_id:id}).then((result)=>{
if(result.deletedCount>0){
  return true
}else return false
})

}

export const login =async ()=>{

const admin = await Admin.findOne()

return admin
  
} 


export const createEnquiry = async(data)=>{
  const blog = new Enquiry(data);
 const result = await blog.save();

 if(result){
  return result
}else{
    return 'Enquiry not saved'
}

}



export const listEnquiries =async ()=>{

  const result =await Enquiry.find()
  if(result){
    return result
  }else{
      return false
  }
  
} 