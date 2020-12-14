import React from "react";
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import UpcProductDisplay from "./UpcProductDisplay";


    function MyModal(props) {
        const { upcObj,onRequestClose } = props;
    return (
        <Modal
        onRequestClose={onRequestClose}
        effect={Effect.Fall}  style={{content: { 
            position: 'relative',
            height: "50%",
        width: "50%",
        bottom: "0px"
    }
}}>  <button onClick={ModalManager.close} style={{position:'absolute', right: '0px'}}>Close</button>
        <UpcProductDisplay displayUpc={upcObj} />
    </Modal>
    )
    }

    export default MyModal;