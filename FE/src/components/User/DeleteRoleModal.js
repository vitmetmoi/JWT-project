import React from 'react';
import './DeleteRoleModal.scss';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteRoleService } from '../../service/userService';
import { ToastContainer, toast } from 'react-toastify';


function DeleteRoleModal(props) {


    const handleOnClickDeleteRole = async (roleId) => {
        let res = await deleteRoleService(roleId);
        if (res && res.data && res.data.EC === 0) {
            toast.warn('Delete role completed!');
            props.toggleModalDelete();
            props.getRoleData();
        }
    }

    return (
        <Modal open={props.isOpenModalDelete} onClose={props.toggleModalDelete} center>
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
                            <p className='mt-3'>Do you really want to delete role with url: {props.roleData && props.roleData.url} ?</p>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => props.toggleModalDelete()}>Cancel</button>
                            <button type="button" class="btn btn-danger" onClick={() => handleOnClickDeleteRole(props.roleData && props.roleData.id)}>Delete</button>
                        </div>
                    </div>
                </div>


            </div>
        </Modal >

    );
}

export default DeleteRoleModal;