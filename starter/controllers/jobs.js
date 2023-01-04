const Jobs = require('../models/Job')
const {StatusCodes}= require('http-status-codes')
const {NotFoundError,
    BadRequestError}= require('../errors')
const Job = require('../models/Job')

const getAllJobs = async (req,res)=>{
   const jobs= await Jobs.find({createdBy:req.user.userId}).sort('createdAt')
   res.status(StatusCodes.OK).json({jobs,count:jobs.length})

}
const getJobs = async (req,res)=>{
   const {user:{userId},params:{id:jobId}}=req

   const job = await Job.findOne({
    _id:jobId,createdBy:userId
   })
   if(!job){
    throw new NotFoundError(`no job with id ${jobId}`)
   }

   res.status(StatusCodes.OK).json({job})
// res.send('update jobs')
}
const createJobs = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
   
}
const updateJobs = async (req,res)=>{
    const {body:{company,position},user:{userId},params:{id:jobId}}=req

    if(company===''||position===""){
        throw new BadRequestError('please provide name &position of the company')
    }

    const job = await Job.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})

    if(!job){
        throw new NotFoundError(`no job with id ${jobId}`)
       }

res.status(StatusCodes.OK).json({job})

}
const deleteJobs = async (req,res)=>{
    const {user:{userId},params:{id:jobId}}=req

    const job =await Job.findOneAndDelete({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`no job with id ${jobId}`)
       }

res.status(StatusCodes.OK).send()
}



module.exports = {
    getAllJobs,
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs
}