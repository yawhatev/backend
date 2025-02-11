import { Router } from "express";
import {createPosts,listPosts, updatePosts,deletedPosts} from "../services/posts.service.js";

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

router.patch("/:postId", async (req, res) => {
  try {
    console.log("server at updateost route");
    const result = await updatePosts(req)
    res.send(result)
  } catch (error) {
    console.log("Error at udate: ", error);
    res.status(400).json({
      message: "Error Occured",
      error: error
    });
  }
})

router.delete("/:postId", async (req, res) => {
  try {
      const result = await deletePosts(req);
      res.send(result);
  } catch (error) {
      console.log("Error at deleting post: ", error);
      res.status(400).send({
          message: "Error Occurred",
          error: error
      });
  }
});

export default router;