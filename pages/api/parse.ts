import type { NextApiRequest, NextApiResponse } from "next";
import { parseFeaturedSection } from "../../lib/parseReadme";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const text = typeof req.body === "string" ? req.body : "";
  const projects = parseFeaturedSection(text);
  res.status(200).json(projects);
}
