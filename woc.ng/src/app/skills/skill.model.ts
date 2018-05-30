import { KeyValue } from '../shared/models/key-value';

export class Skill {
    constructor(
        public id: AAGUID,
        public name: string,
        public keyNamePath: string
    ) {}
}
