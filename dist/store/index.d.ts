export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    option: import("./optionSlice").OptionState;
}, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<any>>;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppDispatch = typeof store.dispatch;
