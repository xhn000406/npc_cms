const importAll = r => r.keys().map(r)
importAll(require.context('./svg', false, /\.svg$/))
