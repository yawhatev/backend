import { Router } from "express";
import {createPosts,listPosts} from "../services/posts.service.js";

const router = Router();

//create a post
router.post("/", async (req, res) => {
  try {
    console.log("server at Createpost route");
    const result = await createPosts(req)
    res.send(result)
  } catch (error) {
    console.log("Error at post creation: ", error);
    res.status(400).json({
      message: "Error Occured",
      error: error
    });
  }
})

router.get("/",async(req,res)=>{
    try{
        const result = await listPosts(req);
        console.log("Here at post : ", result)
        res.send(result);
    } catch(error){
        console.log("error at login:",error)
        res.status(400).json({
            message:"error occured", 
            error:error
        });
    }
})

export default router;