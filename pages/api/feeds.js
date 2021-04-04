// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { RSSParser } from "../../utils/helper";

export default async (req, res) => {
  try {
    const data = await RSSParser('https://medium.com/feed/topic/javascript')

    res.statusCode = 200
    res.json(data)

  } catch (e) {
    console.log(e);
    res.statusCode = 400
    res.json([])
  }
}
