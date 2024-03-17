import jwt from 'jsonwebtoken'
// hàm check token
export const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.NODE_SERCET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        console.log(user)
        req.idUser = user.data.id;
        next();
    });
};