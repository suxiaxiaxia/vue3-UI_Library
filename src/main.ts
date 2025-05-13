import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// import './assets/main.css'
import './style/reset.css'
import './style/vars.css'
import './components/Button/style.css'
import './components/Collapse/style.css'
import './components/Icon/style.css'

import { createApp } from 'vue'
import App from './App.vue'

library.add(fas)

createApp(App)
  .mount('#app')
