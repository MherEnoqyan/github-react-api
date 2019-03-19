import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Users from './components/Users';
import Repositories from './components/Repositories';
import NotFound from './components/NotFound';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/users" exact component={Users}/>
                <Route path="/repositories" exact component={Repositories}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
