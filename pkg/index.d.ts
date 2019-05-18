interface ILoggerOptions {
    connectionString: string;
    collectionName: string;
}
export default class FlexLogger {
    databaseManagmentSystems: Array<String>;
    isConnected: Boolean;
    db: any;
    constructor(Options: ILoggerOptions);
    private connect;
    private log;
    fatal(): void;
    error(): void;
    warn(): void;
    info(): void;
    debug(): void;
}
export {};
