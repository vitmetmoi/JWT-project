import React from 'react';
import 'react-responsive-modal/styles.css';
import './HomePage.scss'
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteRoleService } from '../../service/userService';
import { ToastContainer, toast } from 'react-toastify';
function ConfirmDeleteModal(props) {



    return (

        <>
            <Modal open={props.isOpenModal} onClose={props.changeOpenModal} center>
                <div>


                    <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header flex-column">
                                <div class="icon-box">
                                    <i class="material-icons"><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></i>
                                </div>
                                <h4 class="modal-title w-100">Are you sure?</h4>

                            </div>
                            <div class="modal-body">
                                <p className='mt-3'>Do you really want to delete user with email: {props.userData && props.userData.email} ?</p>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => props.changeOpenModal()}>Cancel</button>
                                <button type="button" class="btn btn-danger" onClick={() => props.deleteUser()}>Delete</button>
                            </div>
                        </div>
                    </div>


                </div>
            </Modal >
        </>

    );
}

export default ConfirmDeleteModal;