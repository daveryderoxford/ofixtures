/**  */
import { expect } from 'chai';
import { loadBAOCFixtures, parsseBAOCFixtues } from '../fixtures/baoc_fixtures';
import 'mocha';
import { baocFixtures } from './baoc-fixtures-data.spec';

const baocExampleData = `{
        "events": [
           {
              "title": "Mytchett (West)",
              "desc": "<b>Location:</b> <a href=\\"https://w3w.co/rams.overnight.encounter\\" target=\\"_blank\\">///rams.overnight.encounter</a> <br><b>Flyer:</b> Click <u><a href=\\"https://img1.wsimg.com/blobby/go/10a56cdc-91fe-4964-bbcb-29d36b9fc4e1/downloads/9ecafc87-fdda-446e-bfd2-f33de2554690/MLS-Mytchett-West-15-Jan-2025.pdf?ver=1734435335505\\" target=\\"_blank\\">here</a></u> for flyer <br><b>Entry:</b> Click <a href=\\"https://racesignup.co.uk/\\" target=\\"_blank\\">here</a> for entry link <br><b>Contact:</b> Maj (Retd) Colin Dickson BAOC",
              "location": "GU16 6DD, Mytchett, Camberley GU16 6DD, UK",
              "start": "2025-01-15T11:00:00+00:00",
              "end": "2025-01-15T15:00:00+00:00",
              "allDay": false
           },
           {
              "title": "TBC",
              "desc": "<b>Location:</b> <br><b>Flyer:</b> Click for flyer <br><b>Entry:</b> Click <a href=\\"https://www.google.com/url?q=https://racesignup.co.uk/&amp;sa=D&amp;source=calendar&amp;usd=2&amp;usg=AOvVaw1u2i5m-k64dtUf7rCgixn3\\" target=\\"_blank\\">here</a> for entry link <br><b>Contact:</b> Maj (Retd) Allan Farrington BAOC",
              "location": "TBC",
              "start": "2025-03-05T11:00:00+00:00",
              "end": "2025-03-05T15:00:00+00:00",
              "allDay": false
           }
        ],
        "timeZone": "Europe/London"
     }`;

describe.only('BAOC fixture data parser', () => {

   it.only('Get fixtures from live BAOC website', async () => {
      const fixtures = await loadBAOCFixtures();
      expect(fixtures.length).to.be.gt(1);
      console.log(fixtures);
   }).timeout(15000);

   it('Parse real example data', () => {

      const fixtures = parsseBAOCFixtues(baocFixtures);

      expect(fixtures.length).to.equal(16);

      expect(fixtures[0].date).to.equal('22025-01-15T11:00:00+00:00');
      expect(fixtures[0].id).to.equal('bof-72446');
      expect(fixtures[0].name).to.equal('Mytchett (West)');
      expect(fixtures[0].what3words).to.equal('rams.overnight.encounter');
      expect(fixtures[0].postcode).to.equal('GU16 6DD');
      expect(fixtures[0].webpage).to.equal('https://img1.wsimg.com/blobby/go/10a56cdc-91fe-4964-bbcb-29d36b9fc4e1/downloads/9ecafc87-fdda-446e-bfd2-f33de2554690/MLS-Mytchett-West-15-Jan-2025.pdf?ver=1734435335505');
   });

   it('Parses example data', () => {

      const fixtures = parsseBAOCFixtues(baocExampleData);

      expect(fixtures.length).to.equal(1);

      expect(fixtures[0].date).to.equal('2025-01-15T11:00:00+00:00');
      expect(fixtures[0].id).to.equal('BAOC-0');
      expect(fixtures[0].name).to.equal('Mytchett (West)');
      expect(fixtures[0].what3words).to.equal('https://w3w.co/rams.overnight.encounter');
      expect(fixtures[0].postcode).to.equal('GU16 6DD');
      expect(fixtures[0].webpage).to.equal('https://img1.wsimg.com/blobby/go/10a56cdc-91fe-4964-bbcb-29d36b9fc4e1/downloads/9ecafc87-fdda-446e-bfd2-f33de2554690/MLS-Mytchett-West-15-Jan-2025.pdf?ver=1734435335505');
   });

   it('Handles location with just area ', () => {
      const data = `{
            "events": [
               {
                  "title": "Mytchett (West)",
                  "desc": "",
                  "location": "Yateley, UK",
                  "start": "",
                  "end": "",
                  "allDay": false
               }
            ]
         }`;
      const fixtures = parsseBAOCFixtues(data);

      expect(fixtures[0].area).to.equal('Yateley');
      expect(fixtures[0].postcode).to.equal('');

   });


   it('Ignores TBC fixtures', () => {
      const data = `{
             "events": [
                {
                   "title": "TBC",
                   "desc": "",
                   "location": "",
                   "start": "",
                   "end": "",
                   "allDay": false
                }
             ]
          }`;
      const fixtures = parsseBAOCFixtues(data);

      expect(fixtures.length).to.equal(0);

   });

});