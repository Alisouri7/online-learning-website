module.exports = async (req, res, next) => {
    const isAdmin = req.user.role === 'ADMIN';
    
}