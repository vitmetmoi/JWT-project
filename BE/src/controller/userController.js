import userService from '../service/userService'

const handleCreateUser = async (req, res) => {
    try {

        let response = await userService.createUserService(req.body);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
        else {
            return res.status(200).json({
                DT: '',
                EC: -1,
                EM: 'err from sever...'
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handleGetUser = async (req, res) => {
    try {

        let response = await userService.getUserService(req.query.type, req.query.id);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handleDeleteUser = async (req, res) => {
    try {
        let response = await userService.deleteUserService(req.query.id);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
        else {
            return res.status(200).json({
                DT: '',
                EC: -1,
                EM: 'err from sever...'
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })
    }
}

const handleEditUser = async (req, res) => {
    try {
        let userData = req.body;
        console.log(userData)
        let response = await userService.editUserService(userData);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handleGetPaginate = async (req, res) => {
    try {
        console.log(req.query.limit);
        let response = await userService.getPaginateService(req.query.currentPage, req.query.limit);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handleGetAccount = async (req, res) => {
    try {
        let user = req.user;
        console.log('userData', user);
        let response = await userService.getAccount(user);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}


const handleLogout = async (req, res) => {

    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            DT: '',
            EC: 0,
            EM: 'logout complete!'
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handleAddRole = async (req, res) => {

    try {
        let role = req.body;
        let response = await userService.addRoleService(role);
        return res.status(200).json({
            DT: response.DT,
            EC: response.EC,
            EM: response.EM
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handleGetRole = async (req, res) => {

    try {
        let currentPage = req.query.currentPage;
        let limit = req.query.limit;
        console.log(currentPage);
        let response = await userService.getRoleService(currentPage, limit);
        return res.status(200).json({
            DT: response.DT,
            EC: response.EC,
            EM: response.EM
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handleUpdateRole = async (req, res) => {

    try {
        let roleData = req.body;
        let response = await userService.updateRoleService(roleData);
        return res.status(200).json({
            DT: response.DT,
            EC: response.EC,
            EM: response.EM
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handleDeleteRole = async (req, res) => {

    try {
        let roleId = req.query.roleId;

        let response = await userService.deleteRoleService(roleId);
        return res.status(200).json({
            DT: response.DT,
            EC: response.EC,
            EM: response.EM
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}

const handledGetGroupWithRole = async (req, res) => {
    try {
        let groupId = req.query.groupId;
        let response = await userService.getGroupWithRoleService(groupId);
        return res.status(200).json({
            DT: response.DT,
            EC: response.EC,
            EM: response.EM
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}



const handleSetGroup = async (req, res) => {

    try {
        let groupData = req.body;
        let response = await userService.setGroupService(groupData);
        return res.status(200).json({
            DT: response.DT,
            EC: response.EC,
            EM: response.EM
        })
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: 'err from sever...'
        })

    }
}




module.exports = {
    handleCreateUser, handleGetUser, handleDeleteUser,
    handleEditUser, handleGetPaginate, handleGetAccount, handleLogout,
    handleAddRole, handleGetRole, handleDeleteRole, handleUpdateRole, handleSetGroup, handledGetGroupWithRole
}