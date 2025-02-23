import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import naver from "next-auth/providers/naver";

const SERVER = process.env.PICK_YOUR_POTION_API_SERVER;
const CLIENT_ID = process.env.PICK_YOUR_POTION_CLIENT_ID;
// OAuth2.0
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      // email/password 로그인
      async authorize(credentials) {
        //사용자가 입력한 정보를 이용해서 로그인 처리
        const res = await fetch(`${SERVER}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "client-id": `${CLIENT_ID}`,
          },
          body: JSON.stringify(credentials),
        });
        const resJson = await res.json();
        if (resJson.ok) {
          const user = resJson.item;
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            type: user.type,
            image: user.profileImage && SERVER + user.profileImage,
            accessToken: user.token.accessToken,
            refreshToken: user.token.refreshToken,
          };
        } else {
          return null;
        }
      },
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    naver({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // default "jwt"
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/login", // default "/auth/signin"
  },
  callbacks: {
    // 로그인 처리를 계속 할지 여부를 결정
    // true를 리턴하면 로그인 처리를 계속하고, false를 리턴하거나 Error를 throw하면 로그인 흐름을 중단
    // user: authorize()가 리턴한 값

    signIn({ user }) {
      //구글,깃헙 등 간편로그인 한 user에 들어있는 사용자 정보를 이용해서 최초에 한 번은 회원 DB에 저장(회원가입)
      // 가입한 회원일 경우 자동으로 로그인 처리

      return true;
    },
    // 로그인 성공한 회원 접오로 token 객체를 설정
    // 최초 로그인시 user 객체 전달,
    jwt({ token, user }) {
      // 토큰 만료 체크, refreshToken으로 accessToken 갱신
      // refreshToken도 만료되었을 경우 로그아웃 처리
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    //  클라이언트에서 세션 정보 요청시 호출
    // token 객체 정보로 session 객체 설정
    session({ session, token }) {
      // session.user.type = user.type;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});
