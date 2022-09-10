import { useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { Comment } from "./Comment"
import { Avatar } from "./Avatar"

import styles from "./Post.module.css"

export function Post({ author, content, published_at }) {
  const [comments, setComments] = useState(["Post muito bacana, hein!?"])
  const [newCommentText, setNewCommentText] = useState("")

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

  function handleCreateNewComment() {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText("")
  }

  function handleNewCommentChange() {
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete) {
    // imutabilidade -> as variáveis nao sofrem mutação, nos criamos um novo valor (um novo espaço na memoria)

    const commentWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete
    })

    setComments(commentWithoutDeleteOne)
  }

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
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
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

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
