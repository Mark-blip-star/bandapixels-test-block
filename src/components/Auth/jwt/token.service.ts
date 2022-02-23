import jwt from "jsonwebtoken"

class tokenService{
    async generateTokens(payload){
        const AccToken = jwt.sign({payload},process.env.JWT_ACCES_SECRET,{expiresIn:'10m'})
        const RefToken = jwt.sign({payload},process.env.JWT_REFRESH_SECRET,{expiresIn:'25d'})

        return {
            AccToken,
            RefToken
        }
    }

    async saveToken(userId,refreshToken){

    }

}


export default new tokenService()