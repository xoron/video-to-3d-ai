
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import reducers from './reducers'

const combinedReducers = combineReducers({
    reducers
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, combinedReducers)

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const persistor = persistStore(store)

const ReduxProvider = ({ children }) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
);

export default ReduxProvider;