import React from "react";
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';


    function ImageModal(props) {
        const { imgSrc,onRequestClose } = props;
    return (
        <Modal
        onRequestClose={onRequestClose}  effect={Effect.Fall} 
        style={{content: { 
            position: 'relative',
            background:'#FDF6E3',
        height: "50%",
        width: "40%",
        bottom: "0px"
    }
}}> <button onClick={ModalManager.close} style={{position:'absolute', right: '0px'}}>Close</button>
        <img src={imgSrc} alt={imgSrc} style={{display:'block',
            margin: 'auto',
            width: '80%', height: '90%',  marginTop: '15px'}} />
    </Modal>
    )
    }

    export default ImageModal;