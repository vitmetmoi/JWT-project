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



module.exports = {
    handleCreateUser, handleGetUser, handleDeleteUser, handleEditUser, handleGetPaginate, handleGetAccount
}