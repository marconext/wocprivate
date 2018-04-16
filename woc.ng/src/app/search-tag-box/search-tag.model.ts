export class SearchTag {
    constructor(
        public type: 'Region' | 'Offering' | 'Skill',
        public display: string,
        public keyNamePath: string) {
    }
}
