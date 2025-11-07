import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"



export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
   strategy: 'jwt'
    },
   
    providers: [Google , GitHub],
    callbacks: {
       async jwt( {token , user}) {
          if (user) {
            token.id = user.id
            token.email = user.name;
          }
          return token
        },
        async  session ({session , token}) {
          if (session.user) {
            session.user.id = token.id as string
            session.user.name =  token.name
          }
          return session
        },

    }
})