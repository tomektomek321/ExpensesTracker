export function RecoilSignIn(setAuthRecoil: any, username: string, token: string) {
  setAuthRecoil((prev: any) => {
    return {
      ...prev,
      username: username,
      token: token,
      logged: true,
      displayName: username,
    }
  });
}

export function RecoilSignOut(setAuthRecoil: any) {
  setAuthRecoil((prev: any) => {
    return {
      ...prev,
      username: null,
      token: null,
      logged: false,
      displayName: null,
    }
  });
}
