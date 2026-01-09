import { isAfter, isBefore, isSameDay, startOfDay } from "date-fns";
import { EntryStatus, Fixture } from "model/fixture.js";
import { Fabian } from "./fabian.js";
import { RaceSignup } from "./racesignup.js";
import { SIEntries } from "./si_entries.js";

type EntrySource = 'Racesignup' | 'SIEntries' | 'Fabian';

export class EntryData {
    constructor(
        public date: string,
        public title: string,
        public club: string | null,
        public entruUrl: string,
        public status: EntryStatus,
        public source: EntrySource,
        public enddate?: string,
    ) { };
}

export class Entries {

    async addEntries(fixtures: Fixture[]) {

        let events: EntryData[] = [];

        const rs = new RaceSignup();
        events = events.concat(await rs.getEvents());

        const fabian = new Fabian();
        events = events.concat(await fabian.getEvents());

        const si = new SIEntries();
        events = events.concat(await si.getEvents());

        for (const fix of fixtures) {
            const found = events.filter(event => this.findEntry(fix, event));

            if (found.length === 1) {
                fix.entryURL = found[0].entruUrl;
                fix.entryStatus = found[0].status;
              //   console.log('    Found match for: ' + fix.date + '  ' + fix.club);
            } else if (found.length > 1) {
                const urls = found.map(entry => entry.entruUrl).join(',   ');
                 console.log('    More than one matching event found. ' + fix.date + '  ' + fix.club + '\n    URLs:  ' + urls);
            } else {
            //      console.log('  No match found ' + fix.date + '  ' + fix.club);
            }
        }
    }

    findEntry(fix: Fixture, entry: EntryData): boolean {

        if (!entry.enddate) {
            return isSameDay(fix.date, entry.date) &&
                fix.club.toUpperCase() === entry.club?.toUpperCase()
        } else {
            const start = startOfDay(entry.date);
            const end = startOfDay(entry.enddate);
            const fixDate = startOfDay(fix.date);

            return (isSameDay(fixDate, start) || isAfter(fixDate, start)) &&
                (isSameDay(fixDate, end) || isBefore(fixDate, end)) &&
                fix.club.toUpperCase() === entry.club?.toUpperCase();
        }
    }
}
