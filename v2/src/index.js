import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from './modules/App'
import Dashboard from './modules/Dashboard'
import Processes from './modules/Processes'
import Binaries from './modules/Binaries'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Dashboard}/>
    	<Route path="/processes" component={Processes} />
    	<Route path="/binaries" component={Binaries} />
    </Route>
  </Router>
), document.getElementById('app'))