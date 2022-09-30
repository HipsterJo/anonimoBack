import ApiError from "../exception/api-error.js";
import tokenService from "../Services/token-service.js";

const authMiddleware = (req, res, next) => {
    try{
        const authoriationHeader = req.headers.authorization;
        
        if(!authoriationHeader){
            return next(ApiError.UnauthorizedError())
        }
        
        const accessToken = authoriationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError())
        }
        
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData){
            return next(ApiError.UnauthorizedError())
        } 
        req.user = userData;
        
        
        next(); 
    }catch (e) {
        next(ApiError.UnauthorizedError())
    }
}

export default authMiddleware;