import { PrismaClient } from "@prisma/client";
import EventEmitter from "events"//event listener

const prisma = new PrismaClient();

const eventEmitter=new EventEmitter()

eventEmitter.on("greet",(message)=>{
    console.log("hello!goodmorning");
    console.log("message:",message)
})

const createPosts = async (req) => {
eventEmitter.emit("greet","create post is called");
  const content = req.body.content
  const result = await prisma.posts.create({
      data: {
          content,
          userId: req.body.user.id
      },
      include: {
          User: true
      }
  })
  return result;
}

const listPosts = async (req) => {
    eventEmitter.emit("greet","list post is called");
  const searchParams= req.query.search
  const result = await prisma.posts.findMany({
    where: {
        OR: [
            {
                content: {
                    contains: searchParams,
                    mode: 'insensitive'
                }
            },
            {
                User: {
                    fullName: {
                        contains: searchParams,
                        mode: 'insensitive'
                    }
                }
            }
        ]
    },
    include: {
        User: true
    }
})
  return result;
};

const updatePosts = async (req) => {
    eventEmitter.emit("greet","update post is called");
  const content = req.body.content;
  const postId = req.params.id; // Fix: Extract `id` correctly

  const checkPostExist = await prisma.posts.findFirst({
      where: { id: +postId }
  });

  if (!checkPostExist) {
      return { message: "Post does not exist" };
  }

  const result = await prisma.posts.update({
      where: { id: +postId },
      data: { content },
      include: { User: true }
  });

  return { result };
};
const deletePosts = async (req) => {
    eventEmitter.emit("greet","delete post is called");
  const postId = req.params.id;
      
          const checkPostExist = await prisma.posts.findFirst({
              where: { id: +postId }
          });
      
          if (!checkPostExist) {
              return { message: "Post does not exist" };
          }
      
          await prisma.posts.delete({
              where: { id: +postId }
          });
      
          return { message: "Post deleted successfully" };
      }; 


export {createPosts, listPosts, updatePosts, deletePosts };