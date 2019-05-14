interface Options {
    connectionString: string;
    collectionName: string;
}
declare class FlexLogger {
    isConnected: Boolean;
    constructor(opt: Options);
    private connect;
    private log;
    fatal(): void;
    error(): void;
    warn(): void;
    info(): void;
    debug(): void;
}
export default FlexLogger;
