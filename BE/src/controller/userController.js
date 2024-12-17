import userService from '../service/userService'

const handleCreateUser = (req, res) => {
    try {

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
        let response = await userService.getUserService(req.body.type, req.body.id);
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
        let response = await userService.deleteUserService(req.body.id);
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

const handleEditUser = async (req, res) => {
    try {
        let response = await userService.editUserService(req.body.userData);
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
    handleCreateUser, handleGetUser, handleDeleteUser, handleEditUser
}