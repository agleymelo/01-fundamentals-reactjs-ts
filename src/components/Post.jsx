import { format, formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { Comment } from "./Comment"
import { Avatar } from "./Avatar"

import styles from "./Post.module.css"

export function Post({ author, content, published_at }) {
  const published_date_formatted = format(
    published_at,
    "d 'de' LLLL 'as' HH:mm'h'",
    {
      locale: ptBR,
    }
  )

  const published_date_relative_to_now = formatDistanceToNow(published_at, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatar_url} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={published_date_formatted}
          dateTime={published_at.toISOString()}
        >
          {published_date_relative_to_now}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p>{line.content}</p>
          } else if (line.type === "link") {
            return (
              <p>
                <a href="">{line.content}</a>
              </p>
            )
          }
        })}

        <p>
          <a href="">#novoprojeto</a>
          <a href="">#nlw</a> <a href="">#rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder="Deixe um comentario" />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
      </div>
    </article>
  )
}
