import { Header } from "./components/Header"
import { Post } from "./components/Post"
import { Sidebar } from "./components/Sidebar"

import styles from "./app.module.css"

const posts = [
  {
    id: 1,
    author: {
      avatar_url: "https://github.com/agleymelo.png",
      name: "Agleylson Melo",
      role: "CEO @AgleyCompany",
    },
    content: [
      {
        type: "paragraph",
        content: "Fala galeraa 👋",
      },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: "link",
        content: "jane.design/doctorcare",
      },
    ],
    published_at: new Date("2022-09-03 20:30:00"),
  },
  {
    id: 2,
    author: {
      avatar_url: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @AgleyCompany",
    },
    content: [
      {
        type: "paragraph",
        content: "Fala galeraa 👋",
      },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: "link",
        content: "jane.design/doctorcare",
      },
    ],
    published_at: new Date("2022-09-07 20:30:00"),
  },
]

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                published_at={post.published_at}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
