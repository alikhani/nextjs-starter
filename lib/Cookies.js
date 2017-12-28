import Cookies from 'js-cookie'

export function setCookie(name, value) {
  Cookies.set(name, value, { expires: 1 })
}

export function getCookie(name) {
  return Cookie.get(name)
}
