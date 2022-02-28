import * as jwt from "jsonwebtoken"
import {env} from "../../config/env/env.config"

class tokenService{
    async generateTokens(payload:{}){
        const AccToken = jwt.sign(payload,env.JWT_ACCES_SECRET,{expiresIn:'10m'})
        const RefToken = jwt.sign(payload,env.JWT_REFRESH_SECRET,{expiresIn:'25d'})

        return {
            AccToken,
            RefToken
        }
    }

}


export default new tokenService()