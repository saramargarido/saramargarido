import { ReactNode } from 'react'

import styles from './styles.module.scss'

interface ModalProps {
  children: ReactNode
}
export const ModalCard = ({ children }: ModalProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
