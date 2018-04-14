export class SearchTag {
    constructor(
        public type: 'Region' | 'Offering',
        public display: string,
        public keyNamePath: string) {
    }
}
