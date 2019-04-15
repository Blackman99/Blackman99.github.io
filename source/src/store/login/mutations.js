/*
export function someMutation (state) {
}
*/
export function login(s, u){
  s.login = true
  s.user = u
}
export function logout(s){
  s.login = false
  s.user = {}
}
export function setLoginForm(s, status){
    s.loginForm = status
}
export function setRgisterForm(s, status){
    s.registerForm = status
}
export function newHeadImage(s, hi){
  s.user.headImage = hi
}
