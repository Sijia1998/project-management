import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; //  存储机制，可换成其他机制，当前使用localStorage机制
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root', // 必须有的
  storage: storage, // 缓存机制
  stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
}

const reducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store);  // 包装store 这个也export