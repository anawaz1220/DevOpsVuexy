export default defineNuxtRouteMiddleware(async (to, from) => {
  // stored token in cookies
  const token = useCookie('token');
  // Skip middleware logic for signup page
  if (to.name === 'signup') {
    return; 
  }
  // If token not exist, route will push to login
  if (!token?.value && to.name !=='index') {
    return navigateTo('/');
  }
});
