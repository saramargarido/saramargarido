import { Close } from '@/assets/icons'

import styles from './styles.module.scss'

interface ModalCloseProps {
  setOpen: (valeu: boolean) => void
}
export const ModalClose = ({ setOpen }: ModalCloseProps) => {
  return (
    <button
      className={styles.close}
      onClick={() => {
        setOpen(false)
      }}
    >
      <Close size="16px" color="#4e4e4e" />
    </button>
  )
}
