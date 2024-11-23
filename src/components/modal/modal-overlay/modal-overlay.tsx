import styles from './modal-overlay.module.scss'

interface IModalOverlayProps {
  onClose: () => void
}

export const ModalOverlay = ({ onClose }: IModalOverlayProps) => (
  <div className={styles.overlay} onClick={onClose}></div>
)
