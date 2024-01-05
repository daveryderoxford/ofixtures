import * as cheerio from "cheerio";
import { raceSignupClubs } from "./racesignup_clubs";
import * as request from "request-promise";
import { EntryData, EntryStatus } from "./entry";

export class RaceSignup {

    $: cheerio.Root;

    public async getEvents(): Promise<EntryData[]> {

        const url = 'https://racesignup.co.uk/';

        let events: EntryData[] = [];

        console.log('Procesing Racesignup Entries');

        try {
            const str = await request(url, { method: "get" });

            events = this.parse(str);
            events = events.filter(c => c.club);

        } catch (e) {
            console.error("RaceSignup: Error encountered reading events\n");
            console.error(e.toString().slice(0, 200));
            events = [];
        }

        return events;
    }

    /** Parse Racesignup web page to idenfiy events to enter */
    public parse(text: string): EntryData[] {
        const data: EntryData[] = [];

        this.$ = cheerio.load(text);

        // The table contains two rows per event.  
        const tableRows = this.$("div.my-3").toArray();

        for (const row of tableRows) {
            const fixture = this.parseRow(row);
            data.push(fixture);
        }

        return data;

    }
    /**  Parse racesign table row of the form 
    <div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
        <div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center"
          style="background-color: #E62222;">
          <p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal"
              data-target="#panel3919" href="/site/event.php?eventid=3919" title="Entries close 26th Dec">North Ashdown
              Christmas Score</a></p>
        </div>
        <div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
          <p class="my-auto">Wed 27 Dec</p>
        </div>
        <div class="col-4 d-flex flex-column mb-1 px-0">
          <img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/southdowns.png"
            alt="Entries close 26th Dec" />
        </div>
        <div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
          <p class="my-auto">OPEN</p>
        </div>
      </div> */
    private parseRow(row: cheerio.Element): EntryData {
        const entry: Partial<EntryData> = {};

        const cells = this.$("div.flex-column", row);

        try {
            const link = this.$("a", cells[0]);
            var closingDate = link.prop("title");
            entry.entruUrl = 'https://racesignup.co.uk' + link.prop("href");
            entry.title = link.text();

            entry.date = this.getDate(cells[1]);
            entry.club = this.getClub(cells[2]).toUpperCase();
            entry.status = this.getStatus(cells[3]);

        } catch (e) {
            console.log('Race signup parser: Error processing row ' + this.$(row).text() + '\n' + e);
            //   throw (e);
        }

        return entry as EntryData;
    }

    private text(el: cheerio.Element): string {
        return this.$(el).text();
    }

    /** convert date of the form Wed 27 Dec to ISO date string 
     * Dates may take the form of: 
     *    Sun 28 Jan
     *    27 - 28 Jan 2024
     *    27 - 28 January 
     *    22/23 January
     * 
     * 10 Jan - 13 Mar
     *  Jan - Mar
     * We could potrnatally return a date range to handle the second cases better. 
    */
    private getDate(el: cheerio.Element): string {
        const str = this.$(el).text().trim().split(' ');

        var month, day, year;

        try {
            switch (str.length) {
                case 3:  // Sun 28 Jan  AND  Jan - Mar
                    if (str[1] === '-') {
                        day = 1;
                        month = 1;
                        year = 1970;
                    } else {
                        month = this.getMonthFromString(str[2]);
                        day = parseInt(str[1]);
                        year = this.makeYear(month);
                    }
                    break;
                case 2:  // 22/23 January
                    month = this.getMonthFromString(str[1]);
                    day = parseInt(str[0].split("/")[0]);
                    year = this.makeYear(month);
                    break;
                case 4:
                case 5:  // 27 - 28  Jan 2024 AND  10 Jan - 13 Mar
                    if (str[2] == '-') {
                        day = 1;
                        month = 1;
                        year = 1970;
                    } else {
                        day = parseInt(str[0]);
                        month = this.getMonthFromString(str[3]);
                        year = this.makeYear(month);
                    }
                    break;
                default:
                    console.log('RaceSignup: Unexpected date format. Row: ' + this.$(el).text());
                    day = 1;
                    month = 1;
                    year = 1970;
            }
        } catch (error) {
            console.log('Error parsing racesignuop date' + str);
            day = 1;
            month = 1;
            year = 1970;
        }
        return (new Date(year, month, day)).toISOString()
    }

    /** Get club name from club image url */
    private getClub(el: cheerio.Element): string | null {
        const img = this.$("img", el);
        const clubURL = img.prop("src");
        let filename = clubURL.substring(clubURL.lastIndexOf('/') + 1);  // get file name from url
        filename = filename.substring(0, filename.lastIndexOf('.')); // strip extension

        const club = raceSignupClubs.find((club) => club.racesignup === filename);
        if (!club) {
            console.log(' Club not found: ' + filename);
        }
        return club?.shortName;
    }

    /* Returns the status from the status element*/
    private getStatus(el: cheerio.Element): EntryStatus {
        const statusStr = this.text(el).trim();

        switch (statusStr) {
            case 'OPEN':
                return 'Open';
            case 'CLOSED':
                return 'Closed';
            case 'FULL':
                return 'Full';
            case 'OPENS SOON':
                return 'Future'
            case 'CANCELLED':
            case 'PASSENGERS ONLY':
                return 'NotEvent'
            default:
                throw new Error('Racesignup invalid status: ' + statusStr);
        }
    }

    /** Return year assuming the target month is in the future.  
     * Works for dates up to 1 year ahead.  
    */
    private makeYear(futureMonth: number): number {
        const now = new Date();
        let year = now.getFullYear();
        return (now.getMonth() <= futureMonth) ? year : year + 1
    }

    getMonthFromString(mon: string): number {
        var d = Date.parse(mon + "1, 2012");
        if (!isNaN(d)) {
            return new Date(d).getMonth();
        }
        throw ("Invalid month name: " + mon);
    }
}