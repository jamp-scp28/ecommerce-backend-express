import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt'
import { AuthDAO } from '../../../database/auth.dao'

const userDB = new AuthDAO()

interface Options {
    jwtFromRequest: JwtFromRequestFunction,
    secretOrKey: string
}

export const applyPassportStrategy = (passport: any) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY! 
    }
    console.log('opts', options)
    passport.use(
      new Strategy(options, async (payload: any, done: any) => {
        const userData = await userDB.getUser(payload.uil)
        console.log('data from strategy', userData)
        if(userData){
            return done(null, {
                email: userData.email,
                id: userData.id,
                role: userData.role
            })
        }

        return done('Sorry, you are not authorize to access this resource.', false)
         
      })
    )

    passport.serializeUser(function(user: any, cb: Function) {
        console.log('user', user)
      process.nextTick(function() {
        cb(null, { email: user.email, id: user.id, role: user.role })
      })
    })
    
    passport.deserializeUser(function(user: any, cb: Function) {
      process.nextTick(function() {
        return cb(null, user)
      })
    })
}