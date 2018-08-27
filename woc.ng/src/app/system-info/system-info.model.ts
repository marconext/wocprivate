export class SystemInfo {
    constructor(
        public dbWorks: boolean,
        public dbCheckError: string,
        public ApiUrl: string,
        public Stage: string
    ) {}
}
