import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { HTMLParser } from '../utils/helper';

const Parser = require('rss-parser');
const RSSParser = new Parser();

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const { items } = await RSSParser.parseURL('https://medium.com/feed/topic/javascript');

        const data = items.map(item => {
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

        setData(data)
      } catch (e) {
        console.log(e);
        setError("Error! Fetching feeds..")
      }
    })();
    setLoading(false)
  }, [])

  if (loading) return <div>Fetching Feeds...</div>

  if (error) return <div>{error}</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Unifeeds</title>
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Unifeeds.com!
        </h1>

        <p className={styles.description}>
          Get all your feeds <code className={styles.code}>unified</code> at one place.{' '}
        </p>

        <div className={styles.grid}>
          {data.map((article) => {
            return (
              <a target="_blank" href={article.link} className={styles.card} key={article.link}>
                <img className={styles.image} src={article.img_url} alt="feed-image" />
                <h3>{article.title}</h3>
                <p>Find in-depth information about Next.js features and API.</p>
                <div style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}>&rarr;</div>
              </a>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


// var XMLParser = require('react-xml-parser');
// var xml = new XMLParser().parseFromString(data);  // Assume xmlText contains the example XML
// console.log(xml);
// console.log(xml.getElementsByTagName('item'));

{/* <div class="medium-feed-item">
  <p class="medium-feed-image">
    <a href="https://medium.com/mobis3c/exploiting-android-webview-vulnerabilities-e2bcff780892?source=rss-------8-----------------javascript">
    <img src="https://cdn-images-1.medium.com/max/1217/1*eQE5lyBsWVyCRy2uIg6AHA.png" width="1217"/>
    </a>
  </p>
  <p class="medium-feed-snippet">What is WebView?</p>
  <p class="medium-feed-link">
    <a href="https://medium.com/mobis3c/exploiting-android-webview-vulnerabilities-e2bcff780892?source=rss-------8-----------------javascript">
      Continue reading on Mobis3c »
    </a>
  </p>
</div> */}

// var convert = require('xml-js');

// const { data } = await axios.get('https://medium.com/feed/topic/javascript')
// domParser(data)
// var result1 = convert.xml2json(data, { compact: true, spaces: 4 });
// console.log(result1);

/** Works */
// var XMLParser = require('react-xml-parser');
// var xml = new XMLParser().parseFromString(data);  // Assume xmlText contains the example XML
// console.log(xml);
// console.log(xml.getElementsByTagName('item'));