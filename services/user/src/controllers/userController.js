import prisma from "../db/prisma.js";

export const getProfile = async (req, res) => {
  const profile = await prisma.userProfile.findUnique({
    where: { id: req.user.id },
  });

  res.json(profile);
};

export const updateProfile = async (req, res) => {
  const { name, bio, avatarUrl } = req.body;

  const profile = await prisma.userProfile.upsert({
    where: { id: req.user.id },
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
