

import express from 'express'
import * as dotenv from 'dotenv'
import {OpenAI } from 'openai'

dotenv.config();

const router = express.Router();

// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
    });

router.route('/').get((req,res) => {
    res.status(200).json({
        message: "HEllo from Dall.E"
    })
})


router.route('/').post(async (req,res) => {
    try{
        const { prompt } = req.body;

        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
          })
          const img = response.data[0].b64_json
        res.status(200).json({
            photo: img
        })
    }catch(e) {
        console.log(e)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

export default router