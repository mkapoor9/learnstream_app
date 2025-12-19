import express from "express";
import {createProxyMiddleware} from 'http-proxy-middleware';
import { verifyJWT } from "../middleware/authMiddleware.js";


const router = express.Router();

router.use(verifyJWT);

const services = {
  user: "http://user:4002",
  course: "http://course:4003",
  content: "http://content:4004",
  activity: "http://activity:4005",
  notification: "http://notification:4006",
}

router.use('/:service/*rest',(req,res,next)=>{


    const {service} = req.params;

    const target = services[service];
    if(!target) return res.status(404).json({
        error:"Service Not found"   
    })

    return createProxyMiddleware({
        target,
        changeOrigin:true,
        pathRewrite:{
            [`^/${service}`]:"",
        },
    })(req,res,next)
})

export default router;