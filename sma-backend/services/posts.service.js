import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPosts = async (req) => {
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