export class ProjectFilterModel {
    RegionKeyNames: string[];
    OfferingKeyNames: string[];
    SkillNames: string[];
    CustomerNames: string[];
    IndustryNames: string[];

    constructor() {
        this.RegionKeyNames = [];
        this.OfferingKeyNames = [];
        this.SkillNames = [];
        this.CustomerNames = [];
        this.IndustryNames = [];
    }
}
