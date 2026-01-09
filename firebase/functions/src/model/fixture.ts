import { ISODateString } from './date.js';
import { EventGrade, EventType, EventDiscipline } from './oevent.js';
import { LatLong } from './latlng.js';

export interface Point {
   east:number;
   north: number;
}

export interface RGData {
   baseURL: string;
   maps: { id: string; name: string, mapfile: string }[];
}

export type LocationSource = '' | 'gridref' | 'postcode' | 'google' | 'googleCache' | 'club';

export type EntryStatus = 'Future' | 'Open' | 'Closed' | 'EOD' | 'Full' | 'NotEvent';

export interface Fixture {
     id: string;
     date: ISODateString;
     name: string;
     club: string;
     clubURL?: string;
     area?: string;
     latLong?: LatLong;
     gridRef?: Point;
     locSource: LocationSource;
     postcode?: string;
     grade?: EventGrade;
     type?: EventType;
     discipline?: EventDiscipline;
     webpage?: string;
     nearestTown?: string;
     association?: string;
     rg? : RGData;
     what3words?: string;
     entryURL?: string;
     entryStatus?: EntryStatus;
     otoolsId?: string;
}

export interface AdditionalFixture extends Fixture {
   userId; string;
   gridRefString: string;
}

