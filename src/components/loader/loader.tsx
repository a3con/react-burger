import styles from './loader.module.scss'

export const Loader = ({ text }: { text: string }) => {
  return <p className={styles.loader}>{text}</p>
}
