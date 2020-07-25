export function handleNavigationDuplicated(error) {
  if (error.name !== 'NavigationDuplicated') {
     throw error
  }
}
