export class SearchTag {
    constructor(
        public type: 'Region' | 'Offering' | 'Skill' | 'Customer' | 'Industry',
        public display: string,
        public keyNamePath: string) {
    }
}
