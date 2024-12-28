import React, { useEffect, useContext, useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './HomePage.scss';
import { getUserService, getPaginateService, deleteUserService } from '../../service/userService'
import ReactPaginate from 'react-paginate';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import UserModal from './UserModal';
import { UserContext } from '../../store/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'


function HomePage(props) {

    const { user, login, logout } = useContext(UserContext);

    let itemsPerPage = 3;
    const items = [...Array(33).keys()];

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [listUsers, setListUsers] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalUser, setIsOpenModalUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [modalAction, setModalAction] = useState('');

    useEffect(() => {
        getPaginateData(currentPage, currentLimit);
    }, [currentPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    };

    const changeOpenModal = (item) => {
        setSelectedUser(item);
        setIsOpenModal(!isOpenModal);
    }

    const changeOpenModalUser = (action, data) => {
        setModalAction(action);
        if (action === 'EDIT') {
            setSelectedUser(data);
            console.log('check data prev', data);
        }
        setIsOpenModalUser(!isOpenModalUser)
    }

    const deleteUserFromParent = async () => {
        let response = await deleteUserService(selectedUser.id);
        if (response && response.data.EC === 0) {
            await getPaginateData(currentPage, currentLimit);
            setIsOpenModal(!isOpenModal)
            console.log("asd")
        }
    }

    const getPaginateData = async (pageCount, limit) => {
        let res = await getPaginateService(pageCount, limit);
        if (res && res.data && res.data.DT.totalPages) {
            setTotalPages(res.data.DT.totalPages);
            setListUsers(res.data.DT.users)
        }

    }

    const getPaginateDataFromParent = async () => {
        let res = await getPaginateService(currentPage, currentLimit);
        if (res && res.data && res.data.DT.totalPages) {
            setTotalPages(res.data.DT.totalPages);
            setListUsers(res.data.DT.users)
        }

    }




    return (
        <div className='homepage-container container'>
            <div className='homepage-content mt-5 '>

                <div className='homepage-title'>
                    <FontAwesomeIcon className='table-icon' icon={faUsers}></FontAwesomeIcon>
                    Table User
                </div>
                <div className="button-group mt-3">
                    <button
                        onClick={() => getPaginateDataFromParent()}
                        className='btn btn-light'>Refresh</button>
                    <button
                        onClick={() => changeOpenModalUser()}
                        className='btn btn-primary'>Create</button>
                </div>

                <div class="table-responsive mt-1">
                    <table class="table table-striped 
                    table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>email</th>
                                <th>userName</th>
                                <th>Gender</th>
                                <th>phoneNumber</th>
                                <th>Group</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                totalPages > 0 && listUsers && listUsers.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1 + (currentPage - 1) * currentLimit}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.gender ? item.gender : 'null'}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.Group ? item.Group.name : 'null'}</td>
                                                <td className='button-group'>
                                                    <button onClick={() => changeOpenModal(item)} className='btn btn-light'><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button onClick={() => changeOpenModalUser('EDIT', item)} className='btn btn-primary  '><FontAwesomeIcon icon={faPen} /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
                <ConfirmDeleteModal
                    userData={selectedUser}
                    changeOpenModal={changeOpenModal}
                    isOpenModal={isOpenModal}
                    deleteUser={deleteUserFromParent}
                ></ConfirmDeleteModal>
                <UserModal
                    userData={selectedUser}
                    action={modalAction}
                    changeOpenModalUser={changeOpenModalUser}
                    isOpenModalUser={isOpenModalUser}
                    getPaginateDataFromParent={getPaginateDataFromParent}
                ></UserModal>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={4}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />

            </div>
        </div >
    );
}

export default HomePage;