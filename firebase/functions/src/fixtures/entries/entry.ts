import { RaceSignup } from "./racesignup";
import { EntryStatus, Fixture } from "model/fixture";
import { SIEntries } from "./si_entries";
import { Fabian } from "./fabian";
import { isSameDay } from "date-fns";

export class EntryData {
    constructor(
        public date: string,
        public title: string,
        public club: string | null,
        public entruUrl: string,
        public status: EntryStatus,
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
            const found = events.filter(event =>
                isSameDay( fix.date, event.date) &&
                fix.club.toUpperCase() === event.club?.toUpperCase()
            );

            if (found.length === 1) {
                fix.entryURL = found[0].entruUrl;
                fix.entryStatus = found[0].status;
               // console.log('Found match for: ' + fix.date + '  ' + fix.club);
            } else if (found.length > 1) {
                const urls = found.map(entry => entry.entruUrl).join(',   ');
                // console.log('  More than one matching event found. ' + fix.date + '  ' + fix.club + 'URLs:  ' + urls);
            } else {
                //  console.log('  No match found ' + fix.date + '  ' + fix.club);
            }
        }
    }
}
