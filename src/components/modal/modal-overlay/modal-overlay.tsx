import styles from './modal-overlay.module.scss'

interface IModalOverlayProps {
  onClose: () => void
}

export const ModalOverlay = ({ onClose }: IModalOverlayProps) => (
  <div
    className={styles.overlay}
    onClick={onClose}
    data-testid="cy-modal-close-overlay"
  ></div>
)
