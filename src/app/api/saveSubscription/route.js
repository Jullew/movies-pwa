import { NextApiRequest, NextApiResponse } from "next";

const subscriptionsDB = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { subscription } = req.body;
    subscriptionsDB.push(subscription);
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: "Method Not Allowed" });
}
