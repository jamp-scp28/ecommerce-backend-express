import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { AuthDAO } from '../../../database/auth.dao';

const userDB = new AuthDAO();

interface Options {
    jwtFromRequest: JwtFromRequestFunction,
    secretOrKey: string
}

export const applyPassportStrategy = (passport: any) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY! 
    };

    console.log(options)

    passport.use(
      new Strategy(options, async (payload: any, done: any) => {
        const userData = await userDB.getUser(payload.uil); 
        console.log('data from strategy', userData)
        if(userData && userData.length > 0){
            return done(null, {
                email: userData[0].email,
                id: userData[0].id,
                role: userData[0].role
            })
        }else{
            return done('Unabled not access resource.', false);
        } 
      })
    );
};