const express= require('express')
const route= express.Router()

const {getAllJobs,
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs} = require('../controllers/jobs')


    route.route('/').post(createJobs).get(getAllJobs)
    route.route('/:id').get(getJobs).delete(deleteJobs).patch(updateJobs)

    module.exports= route