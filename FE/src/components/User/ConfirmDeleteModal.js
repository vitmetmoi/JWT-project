import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './HomePage.scss'
function ConfirmDeleteModal(props) {



    return (

        <>
            <Modal open={props.isOpenModal} onClose={props.changeOpenModal} center>

                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm delete</h5>

                    </div>
                    <div class="modal-body">
                        <p>Are you sure want to delete {props.userData.userName} : {props.userData.email ? props.userData.email : ''} ?.</p>
                    </div>
                    <div class="modal-footer">
                        <button onClick={props.changeOpenModal} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fuck</button>
                        <button onClick={props.deleteUser} type="button" class="btn btn-primary">Yes</button>
                    </div>
                </div>

            </Modal>
        </>

    );
}

export default ConfirmDeleteModal;