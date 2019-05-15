interface IOptions {
    connectionString: string;
    collectionName: string;
}
declare class FlexLogger {
    databaseManagmentSystems: Array<String>;
    isConnected: Boolean;
    db: any;
    constructor(Options: IOptions);
    private connect;
    private log;
    fatal(): void;
    error(): void;
    warn(): void;
    info(): void;
    debug(): void;
}
export default FlexLogger;
