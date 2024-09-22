"use client";
// import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import cartReducer from "./cartReducer";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, cartReducer);

//  const store = configureStore({
//   reducer: {
//     cart: persistedReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export let persistor = persistStore(store);

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers/cartSlice';
import { wishlistReducer } from './reducers/wishListSlice';
import { shoppingCardReducer } from './reducers/shoppingCardSlice';
import { sidebarReducer } from './reducers/sidebarSlice';
import { isOpenReducer } from './reducers/isOpenSlice';
import { thunk } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import  { productReducer } from './reducers/productSlice';
import { paginationReducer } from './reducers/paginationSlice';
import { queryReducer } from './reducers/querySlice';
// import { isOpenReducer } from './reducers/isOpenSlice';
// import { searchReducer } from './reducers/searchSlice';
// import { shoppingCardReducer } from './reducers/shoppingCardSlice';
// import { sidebarReducer } from './reducers/sidebarSlice';
// import { authReducer } from './reducers/userSlice';

// export const store = configureStore({
// 	reducer: {
// 		shoppingCard: shoppingCardReducer,
// 		sidebar: sidebarReducer,
// 		cart: cartReducer,
// 		wishlist: wishlistReducer,
// 		// search: searchReducer,
// 		isOpen: isOpenReducer,
// 		// user: authReducer, // Add the authReducer
// 	},
// 	devTools: true,
// });


// import thunk from 'redux-thunk';

// const rootReducer = {
//   cart: cartReducer,
//   wishlist: wishlistReducer,
//   shoppingCard: shoppingCardReducer,
//   sidebar: sidebarReducer,
//   isOpen: isOpenReducer,
//   // user: authReducer, // Uncomment to add auth functionality
//   // search: searchReducer, // Add searchReducer when needed
// };

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(thunk), // Add custom middleware if needed
//  // devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development mode
// });

const rootReducer = combineReducers({
	cart: cartReducer,
	wishlist: wishlistReducer,
	shoppingCard: shoppingCardReducer,
	sidebar: sidebarReducer,
	isOpen: isOpenReducer,
	products: productReducer,
	pagination:paginationReducer,
	queryParam:queryReducer,
	// user: authReducer,
	// search: searchReducer,
  });
  
  // Configuration for redux-persist to use sessionStorage
  const persistConfig = {
	key: 'root',
	storage: storageSession, // Session-based storage
	data: ['cart', 'wishlist','sidebar','user','isOpen','shoppingCard','products','pagination','queryParam'], // Only persist these reducers
  };
  
  // Persist reducer with the session storage
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  // Store configuration
  export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
	  getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
	devTools: process.env.NODE_ENV !== 'production',
  });
  
  // Persistor configuration for syncing with sessionStorage
  export const persistor = persistStore(store);
  
  export default store;