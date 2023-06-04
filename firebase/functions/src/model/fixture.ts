import { ISODateString } from './date';
import { EventGrade, EventType, EventDiscipline } from './oevent';
import { LatLong } from './latlng';

export interface Point {
   east:number;
   north: number;
}

export interface RGData {
   baseURL: string;
   maps: { id: string; name: string, mapfile: string }[];
}

export type LocationSource =  '' | 'gridref' | 'postcode' | 'google' | 'club';

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
}

export interface AdditionalFixture extends Fixture {
   userId; string;
   gridRefString: string;
}

