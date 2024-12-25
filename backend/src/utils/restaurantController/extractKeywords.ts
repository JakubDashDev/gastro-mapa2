import { Request } from "express";

export const extractKeywords = (req: Request) => {
  const keywordQuery = req.query.keyword as string;

  return (
    keywordQuery
      ?.split(/\s+/)
      .map((kw) => `"${kw}"`)
      .join(" ") ?? ""
  );
};
