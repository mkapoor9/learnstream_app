import prisma from "../db/prisma.js";

export const getProfile = async (req, res) => {
  console.log(req.user.id);
  const profile = await prisma.userProfile.findUnique({
    where: { id: req.user.id },
    select:{
      id:true,
      email:true,
      name:true,
      role:true,
      bio:true,
      avatarUrl:true,
    }
  });

  res.json(profile);
};

export const updateProfile = async (req, res) => {
  const { name, bio,email, avatarUrl } = req.body;

  const profile = await prisma.userProfile.upsert({
    where: { email },
    update: { name, bio, avatarUrl },
    create: {
      id: req.user.id,
      email: req.user.email,
      name,
      bio,
      avatarUrl,
    },
  });

  res.json(profile);
};

export const promoteUser = async(req,res)=>{
  const {userId,role} = req.body;

  await prisma.userProfile.update({
    where:{id:userId},
    data:{role}
  })

  res.json({success:true})
}
