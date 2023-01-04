const Jobs = require('../models/Job')
const {StatusCodes}= require('http-status-codes')
const {NotFoundError,
    BadRequestError}= require('../errors')

const getAllJobs = async (req,res)=>{
   const jobs= await Jobs.find({createdBy:req.user.userId}).sort('createdAt')
   res.status(StatusCodes.OK).json({jobs,count:jobs.length})

}
const getJobs = async (req,res)=>{
    res.send('get jobs')
}
const createJobs = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
   
}
const updateJobs = async (req,res)=>{
    res.send('update jobs')
}
const deleteJobs = async (req,res)=>{
    res.send('delete jobs')
}



module.exports = {
    getAllJobs,
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs
}