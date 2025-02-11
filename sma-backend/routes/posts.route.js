import { Router } from "express";
import {createPosts,listPosts, getLikesCount} from "../services/posts.service.js";

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

router.get('/:id/like', async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const count = await getLikesCount(postId);
    res.json({ postId, likes: count });
  } catch (error) {
    res.status(400).json({ error: "Error fetching likes count" });
  }
});


export default router;