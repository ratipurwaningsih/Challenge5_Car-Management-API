module.exports = (role) => {
    return async function (req, res, next) {
        if(req.user.role !== role) {
            res.status(403).json({
                status:"failed",
                message: `kamu gak berhak akses ini karena kamu bukan ${role}`
            })
        } else {
            next()
        }
    }
}