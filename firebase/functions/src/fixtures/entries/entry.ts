import { RaceSignup } from "./racesignup";
import { Fixture } from "model/fixture";
import { SIEntries } from "./si_entries";
import { Fabian } from "./fabian";

export type EntryStatus = 'Future' | 'Open' | 'Closed' | 'EOD' | 'Full' | 'NotEvent';


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

        const events: EntryData[] = [];

        const rs = new RaceSignup();
        events.concat(await rs.getEvents());

        const fabian = new Fabian();
        events.concat(await fabian.getEvents());

        const si = new SIEntries();
        events.concat(await si.getEvents());

        for (const fix of fixtures) {
            const found = events.filter(event => fix.date === event.date && fix.club === event.club);

            if (found.length === 1) {
                fix.entryURL = found[0].entruUrl;
                console.log('Found match for: ' + fix.date + '  ' + fix.club);
            } else if (found.length > 1) {
                const urls = found.map(entry => entry.entruUrl).join(',   ');
                console.log('  More than one matching event found. ' + fix.date + '  ' + fix.club + 'URLs:  ' + urls);
            }
        }
    }
}
