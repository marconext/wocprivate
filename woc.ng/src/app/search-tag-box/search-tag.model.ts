export class SearchTag {
    constructor(
        public type: 'Region' | 'Offering' | 'Skill' | 'Customer',
        public display: string,
        public keyNamePath: string) {
    }
}
