import { ReactNode } from 'react'

import styles from './styles.module.scss'

interface ModalHeaderProps {
  title?: string
  children?: ReactNode
}
export const ModalHeader = ({ children, title }: ModalHeaderProps) => {
  return (
    <header className={styles.header}>
      {title && <p className={styles.title}>{title}</p>}
      {children}
    </header>
  )
}
