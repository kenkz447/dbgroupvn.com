window.baseUrl = 'https://localhost:44336/'

require('../style/app.scss')
// For hot reload
import 'react-hot-loader/patch'

// Import main
import initStartup from './shared/startup'


initStartup()

if (module.hot) {
    module.hot.accept(['./shared/startup'], () => {
        const nextStartup = require('./shared/startup')['default']
        nextStartup()
    })
}