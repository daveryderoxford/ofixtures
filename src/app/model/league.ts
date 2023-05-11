
export const leagueTypes = ['League', 'Multiday'] as const;
export type LeagueType = typeof leagueTypes[number];

export const leagueLevels = ['National', 'Regional' , 'Club' ] as const;
export type LeagueLevel = typeof leagueLevels[number];

export interface League {
   id: string;
   userId; string;
   name: string;
   url: string;
   type: LeagueType;
   level: LeagueLevel;
   fixtureIds: string[];
   startDate: string | null;
   endDate: string | null;
}