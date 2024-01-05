import * as cheerio from "cheerio";
import * as request from "request-promise";
import { EntryData, EntryStatus } from "./entry";
import { } from "perf_hooks";

export class SIEntries {

    $: cheerio.Root;

    public async getEvents(): Promise<EntryData[]> {

        const url = 'https://www.sientries.co.uk/';

        let events: EntryData[] = [];

        console.log('Procesing SIEntries Entries');

        try {
            const str = await request(url, { method: "get" });

            events = this.parse(str);
            events = events.filter(c => c.club);

        } catch (e) {
            console.error("SI Entries: Error encountered reading events\n");
            console.error(e.toString().slice(0, 200));
            events = [];
        }

        return events;
    }

    /** Parse SI entries web page to idenfiy events to enter */
    public parse(text: string): EntryData[] {
        const data: EntryData[] = [];

        this.$ = cheerio.load(text);

        // The table contains two rows per event.  
        const tableRows = this.$("div.eti_wrap").toArray();

        for (const row of tableRows) {
            const [eventType, fixture] = this.parseRow(row);
            if (eventType == 'orienteering') {
                data.push(fixture);
            }
        }

        return data;

    }
    /**   */
    private parseRow(row: cheerio.Element): [string, EntryData] {
        const entry: Partial<EntryData> = {};
        let eventType = '';

        try {


            const typeLink = this.$("div.etp_running img", row);
            eventType = this.getType(typeLink);

            entry.date = this.getDate(this.$("div.eti_date", row));

            const entryLink = this.$("div.eti_title a", row);
            entry.title = entryLink.text();
            entry.club = entry.title.split(" ")[0].toUpperCase();  // club name is first titem in title
            entry.entruUrl = entryLink.prop("href");

            entry.status = this.getStatus(this.$("div.eti_status a", row));

        } catch (e) {
            console.log('SI entries parser: Error processing row ' + this.$(row).text() + '\n' + e);
            //   throw (e);
        }

        return [eventType, entry as EntryData];
    }

    private text(el: cheerio.Element): string {
        return this.$(el).text().trim();
    }

    /** convert date of the form Wed 27 Dec to ISO date string. 
     *     <div class="eti_date ets_edit"><span class="eti_day">Mon</span> <span
            class="eti_num">1</span> <span class="eti_month">Jan</span></div>
    */
    private getDate(el: cheerio.Cheerio): string {

        const elemets = this.$('span', el);

        const day = parseInt(this.text(elemets[1]));
        const month = this.getMonthFromString(this.text(elemets[2]));
        const year = this.makeYear(month);

        return (new Date(year, month, day)).toISOString()
    }

    /* Returns the status from the status element*/
    private getStatus(ch: cheerio.Cheerio): EntryStatus {

        const statusStr = ch.text().trim();

        if (statusStr.includes("/")) {
            return "Future";
        }

        switch (statusStr) {
            case 'Entries Open':
            case 'Bookings Open':
                return 'Open';
            case 'Entries Closed':
            case 'Bookings Closed':
                return 'Closed';
            case 'Not Yet Open':
                return 'Future';
            case 'Course Full':
            case 'Event Full':
            case 'Waiting List':
                return 'Full';
            case 'Pre-selection List':
            case 'Event Cancelled':
                return 'NotEvent'
            default:
                throw new Error('SI Entries invalid status: ' + statusStr);
        }
    }

    private getType(ch: cheerio.Cheerio): string {
        return (ch.prop("title")?.toLowerCase());
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

/* Example row 
<div class="event_table_item">
<div class="eti_wrap">
    <div class="eti_date ets_edit"><span class="eti_day">Mon</span> <span
            class="eti_num">1</span> <span class="eti_month">Jan</span></div>
    <div class="eti_type etp_running"><img
            src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2"
            alt="Orienteering" title="Orienteering" width="24" height="26" />
    </div>
    <div class="eti_type eti_map">
           <img
            src="https://www.sientries.co.uk/images/region_icons/8.svg"
            alt="North West" title="North West" height="28" />
        </div>
    <div class="eti_title">
         <a
            href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12786"
            title="The 23rd New Year Cracker! Start the New Year as you mean to go, with a choice of odds & evens or classic score. The venue will be the interesting mix of mature woodland and fast open areas at Sizergh Castle, near Kendal.">
            SROC 23rd New Year Cracker
          </a>
        <div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down"
                aria-hidden="true"></i
       ></div>
    </div>
    <div class="eti_status"><a
            href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12786"
            title="Entries Closed - SROC 23rd New Year Cracker">
            <div class="eti_button button-edit"><span
                    class="eti_link_text">Entries Closed</span></div>
        </a></div>
</div>
<div class="eti_hidden_content">
    <div class="eti_hc_padding">
        <div>The 23rd New Year Cracker! Start the New Year as you mean to go,
            with a choice of odds & evens or classic score. The venue will be
            the interesting mix of mature woodland and fast open areas at
            Sizergh Castle, near Kendal.</div>
        <div class="eth_link"><a
                href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12786"
                title="SROC 23rd New Year Cracker">FIND OUT MORE &raquo;</a><a
                href="https://www.sroc.org" target="_blank"><img
                    src="https://www.sientries.co.uk/images/social_icons/website.svg"
                    alt="Website" title="Website" class="socialicon" width="24"
                    height="24" /></a><a href="https://twitter.com/SROC_1964"
                target="_blank"><img
                    src="https://www.sientries.co.uk/images/social_icons/twitter.svg"
                    alt="Twitter" title="Twitter" class="socialicon" width="24"
                    height="24" /></a><a
                href="https://www.facebook.com/groups/SouthRibbleOC/about/"
                target="_blank"><img
                    src="https://www.sientries.co.uk/images/social_icons/facebook.svg"
                    alt="Facebook" title="Facebook" class="socialicon"
                    width="24" height="24" /></a></div>
        <div class="center">
            <div class="button eth_button button-edit"><a
                    href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12786"
                    title="Entries Closed - SROC 23rd New Year Cracker"><span
                        class="eti_link_text">Entries Closed</span></a></div>
        </div>
    </div>
</div>
</div> */