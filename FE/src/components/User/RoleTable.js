import React, { useEffect, useState } from 'react';
import { getRoleService } from '../../service/userService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

function RoleTable(props) {

    const [listRole, setListRole] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getRoleData(currentPage, limit);
    }, [currentPage])

    const getRoleData = async (currentPage, limit) => {
        let res = await getRoleService(currentPage, limit);
        if (res && res.data && res.data.EC === 0) {
            let totalPages = res.data.DT.totalPages;
            let roleData = res.data.DT.roleData;
            setTotalPages(totalPages);
            setListRole(roleData);
        }
    }

    const toggleModalUpdate = () => {

    }

    const toggleModalDelete = () => { }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    };

    return (
        <div>
            <div class="table-responsive mt-3">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ID</th>
                            <th>URL</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listRole && listRole.length > 0 && listRole.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.url}</td>
                                            <td>{item.description}</td>
                                            <td className='button-group'>
                                                <button onClick={() => toggleModalUpdate(item)} className='btn btn-light'><FontAwesomeIcon icon={faTrash} /></button>
                                                <button onClick={() => toggleModalDelete('EDIT', item)} className='btn btn-primary  '><FontAwesomeIcon icon={faPen} /></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>

                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={4}
                    pageCount={totalPages}
                    previousLabel="<"
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

        </div>
    );
}

export default RoleTable;