// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../database";

type Data = {
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId, integrationId, integrationData } = req.body;
  Database.setUserIntegrations(userId, integrationId, integrationData);

  res.status(200).json({ success: true });
}
