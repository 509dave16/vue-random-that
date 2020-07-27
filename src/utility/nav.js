export function getNav() {
  return document.querySelector('body ion-tab:not(.tab-hidden) > ion-nav')
}

export function push(component, componentProps) {
  const nav = getNav()
  nav.push(component, componentProps)
}
