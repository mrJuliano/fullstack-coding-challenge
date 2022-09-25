// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../database";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { contact, integrationData } = req.body;

  // MAKE CALL TO 3RD PARTY APIS HERE

  // IF 3RD PART API ALLOWS IT ADD IT TO THE CONTACT INFO IN DB

  res.status(200).json({ name: "" });
}
