export default async function ({ $auth, redirect }) {
  // the following look directly for the cookie created by nuxtjs/auth
  // instead of using $auth.loggedIn
  const user = $auth.loggedIn
  if (user) {
    // let the user see the page
  } else {
    // redirect to homepage
    redirect('/auth/login')
  }
}
