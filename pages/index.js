import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Parser = require('rss-parser');
const parser = new Parser();

// 'http://rss.cnn.com/rss/cnn_topstories.rss'
// 'https://rss.nytimes.com/services/xml/rss/nyt/Jobs.xml'

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const { items } = await parser.parseURL('http://rss.cnn.com/rss/cnn_topstories.rss');
        setData(items.slice(0, 10))
      } catch (e) {
        setError("Error! Fetching feeds..")
      }
    })();
    setLoading(false)
  }, [])

  if (loading) return <div>Fetching Feeds...</div>

  if (error) return <div>{error}</div>

  console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Unifeeds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Unifeeds.com!
        </h1>

        <p className={styles.description}>
          Get all your feeds <code className={styles.code}>unified</code> at one place.{' '}
        </p>

        <div className={styles.grid}>
          {data.map(article => {
            return (
              <a target="_blank" href={article.link} className={styles.card}>
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
