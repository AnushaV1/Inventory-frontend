import React from "react";
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import UpcProductDisplay from "./UpcProductDisplay";


    function MyModal(props) {
        const { upcObj,onRequestClose } = props;
    return (
        <Modal
        onRequestClose={onRequestClose}
        effect={Effect.Fall}>
        <UpcProductDisplay displayUpc={upcObj} />
        <button onClick={ModalManager.close}>Close</button>
    </Modal>
    )
    }

    export default MyModal;