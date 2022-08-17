import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { AuthDAO } from '../database/auth.dao';

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
      new Strategy(options, (payload: any, done: any) => {

        const sql_statement = "select u.username, u.id, u.email, ur.role, password from users u left join user_roles ur on u.id = ur.user_id where u.email = $1;";
        
        userDB.executeQuery(sql_statement,[payload.uil],(userData: any)=>{
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
        });
      })
    );
};
