import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { Comment } from "./Comment"
import { Avatar } from "./Avatar"

import styles from "./Post.module.css"

type Author = {
  name: string
  avatar_url: string
  role: string
}

type Content = {
  type: "paragraph" | "link"
  content: string
}

type PostProps = {
  author: Author
  content: Content[]
  published_at: Date
}

export function Post({ author, content, published_at }: PostProps) {
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

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText("")
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo e obrigatório!")
  }

  function deleteComment(commentToDelete: string) {
    // imutabilidade -> as variáveis nao sofrem mutação, nos criamos um novo valor (um novo espaço na memoria)

    const commentWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete
    })

    setComments(commentWithoutDeleteOne)
  }

  const isNewCommentInputEmpty = newCommentText.length === 0

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
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentInputEmpty}>
            Publicar
          </button>
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
