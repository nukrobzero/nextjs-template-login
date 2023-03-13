import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const responseUser = await prismadb.user.findUnique({
        where: {
          email,
        },
      });

      if (responseUser) {
        return res.status(422).json({ error: "Email Taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prismadb.user.create({
        data: {
          email,
          hashedPassword,
          image: "",
          emailVerified: new Date(),
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).end();
    }
  }
}
