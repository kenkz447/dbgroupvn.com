import { ConfigurationService } from './core/app'

// Import modules:
import { Module as Main } from '../website'
import { Module as Account } from './modules/Account'
import { Module as  FileAndMedia} from './modules/FileAndMedia'
import { Module as  Admin} from '../Admin'

function startup() {
    const configuration = new ConfigurationService()
    
    configuration.useModule(Main)
    configuration.useModule(Account)
    configuration.useModule(FileAndMedia)
    
    configuration.useModule(Admin)

    // Start app when your configuration done
    configuration.appInit()
}

export default startup