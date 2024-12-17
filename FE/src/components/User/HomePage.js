import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './HomePage.scss';
import { getUserService } from '../../service/userService';

function HomePage(props) {
    const [userData, setUserData] = useState('');

    useEffect(() => {
        getAllUser();
        console.log('test data', userData);
    }, [])

    const getAllUser = async (type, id) => {
        let responsive = await getUserService('ALL', -1);

        if (responsive && responsive.data.EC === 0) {
            setUserData(responsive.data.DT);
        }
    }


    return (
        <div className='homepage-container container'>
            <div className='homepage-content mt-5 '>
                <div className='homepage-title'>Table User</div>
                <div class="table-responsive mt-3">
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData && userData.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.gender ? item.gender : 'null'}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.Group.name ? item.Group.name : 'null'}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default HomePage;