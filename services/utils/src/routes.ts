import express from 'express'
import cloudinary from 'cloudinary'

const router=express.Router();

router.post('/upload',async(req,res)=>{
    try {
           const {buffer,public_id}=req.body;
            if(public_id){
                await cloudinary.v2.uploader.destroy(public_id);
            }
            const cloud=await cloudinary.v2.uploader.upload(buffer);

            res.json({
                url:cloud.secure_url,
                public_id:cloud.public_id
            })
    } catch (error:any) {
        res.json({
            message:error.message
        })
    }
})

import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { atsResumeAnalyzer, careerGuidancePrompt } from './GeminiPrompts.js';

dotenv.config();

const ai=new GoogleGenAI({apiKey:process.env.API_KEY_GEMINI});

router.post("/career",async(req,res)=>{
    try {
        const {skills}=req.body;

        if(!skills){
            return res.status(400).json({
                message:"Skills Required"
            })
        }
        const prompt=careerGuidancePrompt(skills);
        const response=await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:prompt
        });

        let jsonResponse;

        try {
            const rawText=response.text?.replace(/```json/g,"").replace(/```/g,"").trim();

            if(!rawText){
                throw new Error("Ai did not return a valid text response");
            }
            jsonResponse=JSON.parse(rawText)
        } catch (error) {
            return res.status(500).json({
                message:"Ai returned response that was not valid JSON",
                rawResponse:response.text
            })
        }
        res.json(jsonResponse);
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })
    }
});

router.post("/resume-analyser",async(req,res)=>{
try {
    const {pdfBase64}=req.body;
    if(!pdfBase64){
        return res.status(400).json({message:"PDF data is required"})
    }
    const prompt=atsResumeAnalyzer();
    const response=await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents:[
                {
                    role:"user",
                    parts:[
                        {
                            text:prompt,
                        },
                        {
                            inlineData:{
                                mimeType:"application/pdf",
                                data:pdfBase64.replace(/^data:application\/pdf; base64,/,"")
                            }
                        }
                    ]
                }
            ]
    });
    let jsonResponse;
        try {
            const rawText=response.text?.replace(/```json/g,"").replace(/```/g,"").trim();

            if(!rawText){
                throw new Error("Ai did not return a valid text response");
            }
            jsonResponse=JSON.parse(rawText)
        } catch (error) {
            return res.status(500).json({
                message:"Ai returned response that was not valid JSON",
                rawResponse:response.text
            })
        }
        res.json(jsonResponse);

} catch (error:any) {
    res.status(500).json({
            message:error.message
        })
}
});
export default router;