export const filterSensitiveUserData = (user) => {
  const { password, ...rest } = user
  return rest
}