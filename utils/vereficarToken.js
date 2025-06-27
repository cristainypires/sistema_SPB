 const jwt = require('jsonwebtoken');
 


 function vereficarToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    

    if (!authorizationHeader) {
        req.user = null;
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        req.user = null;
        return res.status(401).json({ error: 'Token esta mal formado' });
    }

    const token = parts[1];
    if (!token) {
        req.user = null;
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            req.user = null;
            return res.status(401).json({ error: 'Token inválido ou expirado' });
        }else{
            req.user = decoded;
            next();//token valido, prosseguir 
        }
    });




 }
 module.exports = vereficarToken;