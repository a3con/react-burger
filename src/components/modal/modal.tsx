import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.scss'
import { ModalOverlay } from './modal-overlay/modal-overlay'
import { useEscapeKey } from '../../hooks/useEscapeKey'

interface IModalProps {
  children: React.ReactNode
  onClose: () => void
  title?: string
}

export const Modal = ({ children, onClose, title }: IModalProps) => {
  const modals = document.getElementById('modals') as HTMLElement

  useEscapeKey(onClose)

  return createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal__body}>
        <div className={styles.modal__header}>
          <h3 className={styles.modal__title}>{title}</h3>
          <button className={styles.modal__close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>,
    modals,
  )
}
