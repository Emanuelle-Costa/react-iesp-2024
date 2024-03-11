import classes from "./Modal.module.scss";
import {createPortal} from "react-dom";
import {useSearchParams} from "react-router-dom";

interface ModalProps {
  isPortal?: boolean
}

function ModalComponent() {
  const [, setSearchParams] = useSearchParams()

  const onClick = () => {
    setSearchParams({})
  }

  return <div className={classes.modal}>
    <h1>Modal</h1>
    <div className={classes.modal__content}>
      lorem ipsum
    </div>

    <button onClick={onClick}>
      Fechar
    </button>
  </div>

}

function Modal({isPortal}:ModalProps) {
  if(!isPortal) {
    return <ModalComponent/>
  }
  return createPortal(<ModalComponent/>, document.body)
}

export default Modal