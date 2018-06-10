import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import clickReducer from "./reducers/clickReducer";
import modalsReducer from "./reducers/modalsReducer";
import buttonsReducer from "./reducers/buttonsReducer";
import fieldsReducer from "./reducers/fieldsReducer";
import levelsReducer from "./reducers/levelsReducer";
import livesReducer from "./reducers/livesReducer";
import timeReducer from "./reducers/timeReducer";
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(combineReducers({
    click: clickReducer,
    modals: modalsReducer,
    buttons: buttonsReducer,
    fields: fieldsReducer,
    level: levelsReducer,
    lives: livesReducer,
    time: timeReducer
}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
