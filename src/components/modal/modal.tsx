import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.scss'
import { ModalOverlay } from './modal-overlay/modal-overlay'

interface IModalProps {
  children: React.ReactNode
  onClose: () => void
  title?: string
}

const KEY_NAME_ESC = 'Escape'
const KEY_EVENT_TYPE = 'keyup'

function useEscapeKey(handleClose: () => void) {
  const handleEscKey = useCallback(
    ({ key }: { key: string }) => {
      if (key === KEY_NAME_ESC) {
        handleClose()
      }
    },
    [handleClose],
  )

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false)

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false)
    }
  }, [handleEscKey])
}

export const Modal = ({ children, onClose, title }: IModalProps) => {
  useEscapeKey(onClose)

  return createPortal(
    <div className={style.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={style.modal__body}>
        <header className={style.modal__header}>
          <h3 className={style.modal__title}>{title}</h3>
          <button className={style.modal__close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </header>
        <div className={style.modal__content}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
