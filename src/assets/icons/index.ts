const req = require.context('../icons', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
