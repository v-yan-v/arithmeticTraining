
export const isAppVersionLess = (versionFromStore, versionFromDefaults) => {
  versionFromDefaults = versionFromDefaults.split('.').map(el => parseInt(el))
  versionFromStore = versionFromStore.split('.').map(el => parseInt(el))

  if (versionFromStore[0] < versionFromDefaults[0] ||
    versionFromStore[1] < versionFromDefaults[1] ||
    versionFromStore[2] < versionFromDefaults[2]) {
    return true
  }

  return false
}