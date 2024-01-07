import * as cheerio from "cheerio";
import * as request from "request-promise";
import { EntryData } from "./entry";
import { EntryStatus } from "model/fixture";

export class Fabian {

    $: cheerio.Root;

    public async getEvents(): Promise<EntryData[]> {

        const url = 'https://www.fabian4.co.uk/';

        let events: EntryData[] = [];

        console.log('Procesing Fabian Entries');

        try {
            const str = await request(url, { method: "get" });
            events = this.parse(str);

        } catch (e) {
            console.error("Fabian: Error encountered reading events\n");
            console.error(e.toString().slice(0, 200));
            events = [];
        }

        return events;
    }

    /** Parse Fabian web page to idenfiy events to enter */
    public parse(text: string): EntryData[] {
        const data: EntryData[] = [];

        this.$ = cheerio.load(text);

        const table = this.$("table.table-striped");

        const tableRows = this.$("tr", table).toArray();
        tableRows.shift(); // Skip header row

        for (const row of tableRows) {
            const fixture = this.parseRow(row);
            data.push(fixture);
        }

        return data;

    }
    /** Parse Fabian row of the form 
    <tr>
        <td>26-12-23</td>
        <td>
              <a href="https://www.wimborne-orienteers.co.uk/d7/node/55" target="EventWebsites">(D) WIM 52nd Boxing Day Canter 2023</a>
        </td>
        <td class="g-hidden-md-down">WIM</td>
        <td>
            <a id="ctl00_ContentPlaceHolderBody_EventListGridView_ctl02_StartListHyperLink" href="start/list.aspx?EventID=3601">Display</a>
        </td>
        <td>
            <a id="ctl00_ContentPlaceHolderBody_EventListGridView_ctl02_EnterHyperLink" disabled="disabled">Closed</a>
        </td>
    </tr>
    */
    private parseRow(row: cheerio.Element): EntryData {
        const entry: Partial<EntryData> = {};

        try {

            const cells = this.$("td", row);

            entry.date = this.getDate(cells[0]);
            entry.club = this.text(cells[2]).toUpperCase();
            entry.title = this.$("a", cells[0]).text();
            entry.entruUrl = this.getURL(cells[3]);
            entry.status = this.getStatus(cells[4]);
            
        } catch (e) {
            console.log('Fabian parser: Error processing row ' + this.$(row).text() + '\n' + e);
            //   throw (e);
        }

        return entry as EntryData;
    }

    private text(el: cheerio.Element): string {
        return this.$(el).text().trim();
    }

    /** convert date to ISO date string.  */
    private getDate(el: cheerio.Element): string {

        const str = this.text(el).split("-");

        const day = parseInt(str[0]);     // Day is from 1 to 31
        const month = parseInt(str[1])-1; // Month is from 0 to 11
        const year = parseInt(str[2]) + 2000;  

        return (new Date(year, month, day)).toISOString()
    }
    /* Returns the event URL from start list URL 
    event URL  https://www.fabian4.co.uk/default.aspx?EventID=3617 
    */
    private getURL(el: cheerio.Element): string {
        const link = this.$('a', el);
        const displayURL = link.prop("href") as  string;
        const str = displayURL.split("=");
        return ('https://www.fabian4.co.uk/default.aspx?EventID=' + str[1]);
    }

    /* Returns the status from the status element
    event URL  https://www.fabian4.co.uk/default.aspx?EventID=3617 
    */
    private getStatus(el: cheerio.Element): EntryStatus {
        const statusStr = this.text(el);
        if (statusStr.includes("/")) {
            return "Future";
        }
        switch (statusStr) {
            case 'Enter':
                return 'Open';
            case 'Closed':
                return 'Closed';
            case 'Full':
                return 'Full';
            case 'Join':
                return 'NotEvent';
            default:
                throw new Error('Fablan invalid status: ' + statusStr);
        }
    }
}

