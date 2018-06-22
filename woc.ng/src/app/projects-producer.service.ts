import { Injectable } from '@angular/core';
import { ProjectsService } from './projects/projects.service';
import { CustomerService } from './customers/customer.service';
import { IndustryService } from './industries/industry.service';
import { RegionService } from './regions/region.service';
import { OfferingService } from './offerings/offering.service';
import { SkillsService } from './skills/skills.service';

import { Customer } from './customers/customer.model';
import { Industry } from './industries/industry.model';
import { Region } from './regions/region.model';
import { Offering } from './offerings/offering.model';
import { Skill } from './skills/Skill.model';
import { Project } from './projects/project.model';
import { startWith } from 'rxjs/operators';

@Injectable()
export class ProjectsProducerService {

  private customers: Customer[] = [];
  private industries: Industry[] = [];
  private regions: Region[] = [];
  private offerings: Offering[] = [];
  private skills: Skill[] = [];

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomerService,
    private industryService: IndustryService,
    private regionService: RegionService,
    private offeringService: OfferingService,
    private skillsService: SkillsService,
  ) {

    this.customerService.getAllAsync().subscribe(cc => this.customers = cc);
    this.industryService.getAllAsync().subscribe(ii => this.industries = ii);
    this.regionService.getAllAsync().subscribe(rr => this.regions = rr);
    this.offeringService.getAllAsync().subscribe(oo => this.offerings = oo);
    this.skillsService.getAllAsync().subscribe(ss => this.skills = ss);

  }

  createRandomProjects(numberOfProjects: number) {

    for ( let i = 0; i < numberOfProjects; i++) {
      const proj = new Project();
      proj.name = 'Project ' + i.toString();
      proj.customer = this.randomElement(this.customers);
      proj.industry = this.randomElement(this.industries);

      const rndReg = this.randomNumber(3);
      for ( let ri = 0; ri < rndReg; ri++) {
        const reg = <Region>this.randomElement(this.regions);
        if (
          !proj.regions.find(r => r.id === reg.id)
          &&
          !proj.regions.find(r => reg.keyNamePath.startsWith(r.keyNamePath))
          &&
          !proj.regions.find(r => r.keyNamePath.startsWith(reg.keyNamePath))
        ) {
          proj.regions.push(reg);
        }
      }
      const rndoff = this.randomNumber(3);
      for ( let ro = 0; ro < rndoff; ro++) {
        const off = this.randomElement(this.offerings);
        if (!proj.offerings.find(s => s.id === off.id)) {
          proj.offerings.push(off);
        }
      }

      const rndSkll = this.randomNumber(3);
      for ( let is = 0; is < rndSkll; is++) {
        const skll = this.randomElement(this.skills);
        if (!proj.skills.find(s => s.id === skll.id)) {
          proj.skills.push(skll);
        }
      }

      proj.dxcServices = this.randomText();
      proj.facts = this.randomText();
      proj.dxcSolution = this.randomText();
      proj.betriebsleistung = this.randomText();

      this.projectsService.SaveProject(proj).subscribe();

    }
  }

  private randomElement(elements: any[]) {
    const nr = this.randomNumber(elements.length);
    return elements[nr];
  }

  private randomNumber(maxnumber: number) {
    return Math.floor((Math.random() * maxnumber));
  }

  private randomText() {
    // tslint:disable-next-line:max-line-length
    const longText = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fortasse id optimum, sed ubi illud: Plus semper voluptatis? Quae similitudo in genere etiam humano apparet. In eo enim positum est id, quod dicimus esse expetendum. Duo Reges: constructio interrete. <i>Honesta oratio, Socratica, Platonis etiam.</i> At quicum ioca seria, ut dicitur, quicum arcana, quicum occulta omnia? Quasi vero, inquit, perpetua oratio rhetorum solum, non etiam philosophorum sit. Est tamen ea secundum naturam multoque nos ad se expetendam magis hortatur quam superiora omnia. <b>Ostendit pedes et pectus.</b> </p>  <p>Ita enim vivunt quidam, ut eorum vita refellatur oratio. Utrum igitur tibi litteram videor an totas paginas commovere? An hoc usque quaque, aliter in vita? Cum salvum esse flentes sui respondissent, rogavit essentne fusi hostes. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Si longus, levis. </p>       <p>Aliter homines, aliter philosophos loqui putas oportere? <b>Quorum altera prosunt, nocent altera.</b> Videsne quam sit magna dissensio? Quo modo autem optimum, si bonum praeterea nullum est? <b>Estne, quaeso, inquam, sitienti in bibendo voluptas?</b> Quis tibi ergo istud dabit praeter Pyrrhonem, Aristonem eorumve similes, quos tu non probas? Hic Speusippus, hic Xenocrates, hic eius auditor Polemo, cuius illa ipsa sessio fuit, quam videmus. Hunc ipsum Zenonis aiunt esse finem declarantem illud, quod a te dictum est, convenienter naturae vivere. </p>';
    const textLengthg = this.randomNumber(longText.length);
    const startPos = this.randomNumber(longText.length - textLengthg);
    const ret = longText.substr(startPos, textLengthg);
    return ret;
  }

}
