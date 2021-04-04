export async function RSSParser(rss_feed) {
  const Parser = require('rss-parser');
  const RSSParser = new Parser();

  const { items } = await RSSParser.parseURL(rss_feed);

  data = items.map(item => {
    return {
      title: item.title,
      link: item.link,
      published_at: item.pubDate,
      uid: item.guid,
      author: item.creator,
      categories: item.categories,
      img_url: HTMLParser(item.content)
    }
  })
}

export function HTMLParser(htmlString) {
  const parser = new DOMParser()
  const parsedDocument = parser.parseFromString(htmlString, "text/html")
  return parsedDocument.querySelector("img") ? parsedDocument.querySelector("img").getAttribute('src') : null
}