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
    res.status(400).send({
      message: "Error Occured",
      error: error
    });
  }
})

router.get("/",async(res,req)=>{
    try{
        const result = await listPosts(req);
        res.send(result);
    } catch(error){
        console.log("error at login:",error)
        res.status(400).send({
            message:"error occured", 
            error:error
        });
    }
})

export default router;