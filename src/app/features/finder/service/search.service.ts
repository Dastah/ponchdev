import { COMPONENT_MAP } from '@/src/app/shared/finderMapper';
import { Injectable } from '@angular/core';
import { Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  cleanInput(input: string): string {
    return input.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
  }

  search(query: string): Type<any> | null {
    const cleanedQuery = this.cleanInput(query);
    const words = cleanedQuery.split(/\s+/);

    let bestMatchComponent: Type<any> | null = null;
    let maxMatches = 0;

    COMPONENT_MAP.forEach((item) => {
      let matchCount = 0;

      words.forEach((word) => {
        if (item.keyword.toLowerCase().includes(word)) {
          matchCount++;
        }
      });

      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatchComponent = item.component;
      }
    });

    return bestMatchComponent;
  }
}
