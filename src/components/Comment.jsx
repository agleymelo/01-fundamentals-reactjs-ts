import { ThumbsUp, Trash } from "phosphor-react"
import styles from "./Comment.module.css"

export function Comment() {
  return (
    <div className={styles.comment}>
      <img src="https://github.com/agleymelo.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Agleylson Melo</strong>

              <time title="11 de Maio as 08:13" dateTime="2022-05-11 08:13:30">
                Cerca de 1 hora atras
              </time>
            </div>

            <button title="Deletar comentario">
              <Trash size={24} />
            </button>
          </header>

          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>

        <footer>
          <button>
            <ThumbsUp size={20} /> Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
