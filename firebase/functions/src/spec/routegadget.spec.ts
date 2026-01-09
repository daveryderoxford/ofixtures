import { describe, it, expect, vi } from 'vitest';
import { Routegadget } from '../fixtures/routegadget.js';
import { RGSITES } from '../fixtures/routegadgetclubs.js';
import { writeFileSync } from 'node:fs';
import { getStorage } from 'firebase-admin/storage';

vi.mock('firebase-admin/storage');

const sn = {
   "name": "Southern Navigators",
   "shortName": "sn",
   "rgUKPrifix": "",
   "isNonStandard": null,
   "baseURL": "https://www.sn.routegadget.co.uk/",
   "notes": ""
};

const int = {
   "name": "Interlopers",
   "shortName": "int",
   "rgUKPrifix": "interlopers",
   "isNonStandard": null,
   "baseURL": "https://www.interlopers.routegadget.co.uk/",
   "notes": ""
};

describe('Routegaedget', () => {

   it('should read routegadget events for specified clubs', async () => {

      const gr = new Routegadget();

      await gr.initialise(

      );

      /*  console.log( "=== Clubs Map details ====" );
        for ( const [key, events] of gr.clubs ) {
           console.log( key + "  Event count: " + events.length );
        } */

      expect(gr.rgSitesMap.size).toBe(RGSITES.length);

      const ret = gr.getRoutegadgetData('xxx', 'SN');
      expect(ret.baseURL).toBe(sn.baseURL);

      writeFileSync('routegadget_events.json', JSON.stringify(gr.rgSitesMap));

   }, 20000);

   it('should read routegadget events from cache', async () => {

      const gr = new Routegadget();

      // Mock Firebase Storage response with data derived from RGSITES
      const mockMap = new Map();
      RGSITES.forEach(site => {
         mockMap.set(site.shortName.toLowerCase(), { ...site, events: [] });
      });
      const mockResponse = [JSON.stringify(Array.from(mockMap.entries()))];

      const mockFile = {
         download: vi.fn().mockResolvedValue(mockResponse)
      };
      const mockBucket = {
         file: vi.fn().mockReturnValue(mockFile)
      };
      vi.mocked(getStorage).mockReturnValue({
         bucket: vi.fn().mockReturnValue(mockBucket)
      } as any);

      await gr.initialiseFromCache();

      /*  console.log( "=== Clubs Map details ====" );
        for ( const [key, events] of gr.clubs ) {
           console.log( key + "  Event count: " + events.length );
        } */

      expect(gr.rgSitesMap.size).toBe(RGSITES.length);

      const ret = gr.getRoutegadgetData('xxx', 'SN');
      expect(ret.baseURL).toBe(sn.baseURL);

      writeFileSync('routegadget_events.json', JSON.stringify(Array.from(gr.rgSitesMap)));

   }, 20000);

   it('should return null if event does not exist in routegagdte', async () => {
      const gr = new Routegadget();

      await gr.initialise([sn]);

   });

   it('should read clubs events for routegadget', async () => {

      const rg = new Routegadget();

      await rg.initialise([sn]);

      const ret = rg.getRoutegadgetData('Merrist', 'XXX');

      expect(ret).toBeNull();
   });


   it('should load events for a specified area', async () => {

      const gr = new Routegadget();

      await gr.initialise([sn]);

      const ret = gr.getRoutegadgetData('Merrist', 'SN');

      expect(ret.baseURL).toBe(sn.baseURL);
      expect(ret.maps.length).toBe(5);
      expect(ret.maps[1]).toEqual({ id: 109, name: "Merrist Wood Saturday Series", mapfile: "106.gif" });

   });

   it('search should be case insensitive', async () => {

      const rg = new Routegadget();

      await rg.initialise([sn]);

      const ret = rg.getRoutegadgetData('mErrist', 'SN');

      expect(ret.maps.length).toBe(5);
      expect(ret.maps[0]).toEqual({ id: 173, name: "Merrist Woods Saturday Series", mapfile: "171.gif" });

   });

   it('When finding events for area should ignore common keywords', async () => {

      const rg = new Routegadget();
      let ret;

      await rg.initialise([sn]);

      // Ignore common keywords
      //Note: the whole area string will still match so we specify multipe skipped words
      expect(rg.getRoutegadgetData('Common Woods', 'SN').maps.length).toBe(0);
      expect(rg.getRoutegadgetData('woods and', 'SN').maps.length).toBe(0);

      // Southwood is found and country, part are ignored
      ret = rg.getRoutegadgetData('Southwood Country Park', 'SN');
      expect(ret.maps.length).toBe(4);
      expect(ret.maps[3]).toEqual({ id: 140, name: 'Southwood Country Park', mapfile: "138.gif" });

      // Two letter word is ignored.  
      expect(rg.getRoutegadgetData('Common st', 'SN').maps.length).toBe(0);
   });

   it('and should be excluded (Interlopers test)', async () => {

      const rg = new Routegadget();

      await rg.initialise([int]);

      const ret = rg.getRoutegadgetData("Holyrood and Craigmillar", 'INT');

      //  6 events expected for interlopers containg Craigmillar
      expect(ret.maps.length).toBe(7);

   });

   it('Two valid words returns events for both areas', async () => {

      const rg = new Routegadget();

      await rg.initialise([sn]);

      const ret = rg.getRoutegadgetData('Merrist Wisley', 'SN');

      //  12 events for both wisley and merrist
      expect(ret.maps.length).toBe(12);

   });

   it('Blank area should not find any maps', async () => {

      const rg = new Routegadget();

      await rg.initialise([sn]);

      const ret = rg.getRoutegadgetData('', 'SN');

      expect(ret.maps.length).toBe(0);

   });

});
