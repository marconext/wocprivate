import { SearchTag } from './search-tag.model';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchTagBoxService {
    private searchTags: SearchTag[] = [];

    public addTag(newSearchTag: SearchTag): SearchTag[] {
        // only one tag per tagClassification must exist.
        const tagIndex = this.searchTags.findIndex(t => t.type === newSearchTag.type);
        if (tagIndex >= 0) {
            this.searchTags[tagIndex] = newSearchTag;
        } else {
            this.searchTags.push(newSearchTag);
        }

        return this.searchTags;
    }
}
