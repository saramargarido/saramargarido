'use client'

import { ReactNode, useEffect } from 'react'

import styles from './styles.module.scss'

interface ModalProps {
  children: ReactNode
  open: boolean
}
export const ModalRoot = ({ children, open }: ModalProps) => {
  useEffect(() => {
    open && document.body.classList.add('modalOpen')
    !open && document.body.classList.remove('modalOpen')
  }, [open])

  const display = {
    true: 'flex',
    false: 'none',
  }
  return (
    <section
      className={styles.container}
      style={{
        display: display[open.toString() as keyof typeof display],
      }}
    >
      {children}
    </section>
  )
}
