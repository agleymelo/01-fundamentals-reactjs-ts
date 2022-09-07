import { Header } from "./components/Header"
import { Post } from "./Post"
import { Sidebar } from "./components/Sidebar"

import styles from "./app.module.css"

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          <Post
            author="John"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam nam architecto minus dolorem facilis ea magnam aliquid eaque. Reiciendis earum harum magnam? Dolor omnis velit cum voluptate ipsam voluptas."
          />
          <Post author="Agleylson" content="A new post like" />
        </main>
      </div>
    </>
  )
}
