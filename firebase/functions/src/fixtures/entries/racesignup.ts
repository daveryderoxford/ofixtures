import * as cheerio from "cheerio";
import { raceSignupClubs } from "./racesignup_clubs";
import request from "request-promise";
import { EntryData } from "./entry";
import { EntryStatus } from "model/fixture";

export class RaceSignup {

   $: cheerio.Root;
   clubsNotFound = '';

   public async getEvents(): Promise<EntryData[]> {

      const url = 'https://racesignup.co.uk/';

      let events: EntryData[] = [];
      this.clubsNotFound = '';

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

      console.error(`RaceSignup: Clubs not found: \n${this.clubsNotFound}`);

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

         [entry.date, entry.enddate] = this.getDate(cells[1]);
         entry.club = this.getClub(cells[2]);
         entry.status = this.getStatus(cells[3]);
         entry.source = 'Racesignup';

      } catch (e) {
         console.log('RaceSignup: Error processing row: ' + this.$(row).text() + '\n' + e);
         //   throw (e);
      }

      return entry as EntryData;
   }

   private text(el: cheerio.Element): string {
      return this.$(el).text();
   }

   /** convert date of the form Wed 27 Dec to ISO date string 
    * Dates may take the form of a single date, two days (separated by a /) 
    * or a period (separated by a -).
   */
   private getDate(el: cheerio.Element): [string, string] {
      const str = this.$(el).text().trim();
      const arr = str.split(" ");

      var date, endDate;

      try {
         if (str.includes('-')) {
            [date, endDate] = this.getPeriod(arr);
         } else if (str.includes('/')) {
            [date, endDate] = this.getTwoDayPeriod(arr);
         } else {
            [date, endDate] = this.getSingleDay(arr);
         }
      } catch (error) {
         console.log('RaceSugnup:  Error parsing date: ' + str);
         return [this.dateStr(1970, 1, 1), null];
      }

      return [date, endDate];
   }

   dateStr = (y: number, m: number, d: number) => (new Date(y, m, d)).toISOString();

   /* Gets Racesignup date for a single date in the form  or */
   private getSingleDay(arr: string[]): [string, string] {
      var month: number;
      var day: number;

      if (parseInt(arr[1]) !== Number.NaN) {  // Sun 28 Jan
         month = this.getMonthFromString(arr[2]);
         day = parseInt(arr[1]);
      } else {  // 6 March 2024
         month = this.getMonthFromString(arr[1]);
         day = parseInt(arr[0]);
      }

      const year = this.makeYear(month);
      const date = this.dateStr(year, month, day);

      return [date, null];
   }

   /** Gets Racesignup date for 2 days period
    *  of the following form 22/23 January
    */
   private getTwoDayPeriod(arr: string[]): [string, string] {

      const days = arr[0].split("/");
      const day = parseInt(days[0]);
      const endDay = parseInt(days[1]);

      const month = this.getMonthFromString(arr[1]);

      const year = this.makeYear(month);

      const date = this.dateStr(year, month, day);
      const endDate = this.dateStr(year, month, endDay);

      return [date, endDate];
   }

   /* Gets racesignup date for a period.  
    * This is identifed by date string containing a -. 
    * Handles the following forms: 
    *  27 - 28 Jan 2024
    *  27 - 28 January 
    *  10 Jan - 13 Mar
    *  Note:  Dates of the form Jan - Mar (are not parsed) */
   private getPeriod(arr: string[]): [string, string] {
      var month, day, year;
      var endMonth, endDay, endYear;

      if (parseInt(arr[0]) != Number.NaN) {
         if (arr[1] == '-') {  // 27 - 28 January and  27 - 28  Jan 2024 
            month = this.getMonthFromString(arr[3]);
            day = parseInt(arr[0]);
            endMonth = month;
            endDay = parseInt(arr[2]);
            year = this.makeYear(month);
            endYear = this.makeYear(endMonth);
         } else if (arr[2] == '-') {  // 10 Jan - 13 Mar
            month = this.getMonthFromString(arr[1]);
            day = parseInt(arr[0]);
            endMonth = this.getMonthFromString(arr[4]);
            endDay = parseInt(arr[3]);
            year = this.makeYear(month);
            endYear = this.makeYear(endMonth);
         }
      } else {  // Jan - Mar
         day = 1;
         month = 1;
         year = 1970;
      }

      const date = this.dateStr(year, month, day);
      const endDate = this.dateStr(endYear, endMonth, endDay);

      return [date, endDate];
   }

   /** Get club name from club image url */
   private getClub(el: cheerio.Element): string | undefined {
      const img = this.$("img", el);
      const clubURL = img.prop("src");
      let filename = clubURL.substring(clubURL.lastIndexOf('/') + 1);  // get file name from url
      filename = filename.substring(0, filename.lastIndexOf('.')); // strip extension

      const club = raceSignupClubs.find((club) => club.racesignup === filename);
      if (!club) {
         this.clubsNotFound = this.clubsNotFound + '  ' + filename;
         //  console.log('   Club not found: ' + filename);
         return undefined;
      } else {
         return club.shortName.toUpperCase();
      }
   }

   /* Returns the status from the status element */
   private getStatus(el: cheerio.Element): EntryStatus {
      const statusStr = this.text(el).trim();

      switch (statusStr) {
         case 'OPEN':
         case 'BUY':
         case 'PRE-ENTRY AND EOD':
         case 'YHOA SUPERLEAGUE':
            return 'Open';
         case 'CLOSED':
            return 'Closed';
         case 'FULL':
            return 'Full';
         case 'OPENS SOON':
            return 'Future';
         case 'LIMITED EOD':
            return 'EOD';
         case 'CANCELLED':
         case 'PASSENGERS ONLY':
            return 'NotEvent';
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
      return (now.getMonth() <= futureMonth) ? year : year + 1;
   }

   /** Returns month index (0-11) from month name string */
   getMonthFromString(mon: string): number {
      var d = Date.parse(mon + "1, 2012");
      if (!isNaN(d)) {
         return new Date(d).getMonth();
      }
      throw ("Racesignup:  Invalid month name: " + mon);
   }
}