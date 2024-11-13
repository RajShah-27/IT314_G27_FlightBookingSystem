
import jwt from 'jsonwebtoken';
import JWT_SECRET from "aeqwerq12412";
import ensureAuthenticated from (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {
        const decoded = jwt.verify(auth, JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

export default ensureAuthenticated;