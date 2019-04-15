/*
export function someMutation (state) {
}
*/
export function toggleBlogModal (state, status) {
  state.blog = status
}
export function toggleModal (state, { name, status}) {
  state[name] = status
}
