

const handleHelloWorld = (req, res) => {
    let name = "Duy";
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

module.exports = {
    handleHelloWorld, handleUserPage
}