import tokenService from "../Services/token-service.js";
import ApiError from "../exception/api-error.js";

const checkRole = (roles) =>{
    
    return function(req, res, next){
        try{
            console.log(req)
            const accessToken = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
            
            if(!accessToken){
               throw ApiError.UnauthorizatedError()
            }
            const {roles: userRoles} = tokenService.validateAccessToken(accessToken);
            console.log(userRoles)
           let hasRole = false
              userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true
                }   
            })
            if(!hasRole){
                
                throw ApiError.BadRequest("You don't have access")
            }

            next()
        
    }
    catch(e){
        console.log(e)
        res.status(401).json({message: "Ошибка в проверке роли"})
    }
    
}
}

export default checkRole