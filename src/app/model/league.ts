
export type LeagueType = 'League'| 'Multiday';

export type LeagueLevel=  'National'| 'Regional' | 'Club' ;

export interface League {
   name: string;
   url: string;
   type: LeagueType;
   level: LeagueLevel;
   fixtureIds: string[];
   startDate: string | null;
   endDate: string | null;
}