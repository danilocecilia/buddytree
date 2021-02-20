import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CharacterCard from '../src/components/CharacterCard'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <CharacterCard characters={props.data} currPage={props.currPage} />
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1
  let data = null

  try {
    const res = await fetch(`http://localhost:3000/api/characters?page=${page}`)

    if (res.status !== 200) {
      throw new Error('Failed to fetch')
    }

    data = await res.json()
  } catch (error) {
    data = { error: { message: error.message } }
  }

  return { props: { data: data.data, currPage: data.currPage } }
}
