import './transition.scss'
import styles from './Modal.module.scss'
import { default as ReactModal } from 'react-modal'
import {ReactComponent as CloseIcon} from '../../../assets/icons/ic_close.svg'

type ModalProps = {
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  ReactModal.setAppElement('#root')
  return (
    <ReactModal
      isOpen={isOpen}
      className={styles.modal}
      onRequestClose={onClose}
      preventScroll={true}
      closeTimeoutMS={400}
      shouldCloseOnOverlayClick={true}
      overlayClassName={styles.overlay}
    >
      <div className={styles.buttons}>
        <button onClick={onClose}>
          <CloseIcon className={styles.icon}></CloseIcon>
          <span>Закрити</span>
        </button>
      </div>
      {children}
    </ReactModal>
  )
}

export default Modal
