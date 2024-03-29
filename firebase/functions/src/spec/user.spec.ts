import { expect } from 'chai';
import 'mocha';
import { FixtureEntryDetails } from '../../src/model/entry';
import { Entry } from '../../src/model/entry';
import { iofXMLEntryList } from '../../src/entry/entry';
function makeEntry(e: Partial<Entry>): Entry {
    const entry: Entry = {
        id: e.id,
        fixtureId: 'abcd',
        userId: 'User1',
        course: e.course,
        ageClass: 'M21',
        firstname: e.firstname,
        surname: e.surname,
        club: 'HAVOC',
        madeAt: '2001-01-03',
        hiredCard: false
    };
    if (e.ecard) {
        entry.ecard = e.ecard;
    }
    return entry;
}

describe( 'Create user data when user is created', () => {

    it('gnerate IOF entry list', () => {
        const fixture: FixtureEntryDetails = {
            name: 'FixtureName',
            date: '2018-01-02',
            club: 'Club',
            createdAt: '2018-03-01',
            fixtureId: 'abcd',
            userId: 'UserA',
            type: "MapReservation",
            closingDate: '2018-04-02',
            hasAgeClasses: false,
            courses: [
                { name: 'Blue', maxMaps: 12, reservedMaps: 5 },
                { name: 'Green', maxMaps: 2, reservedMaps: 1 },
                { name: 'Yellow', maxMaps: 1, reservedMaps: 2 },

            ],
            latestEntry: 2,
        };

        const entries: Entry[] = [];
        entries.push(makeEntry({ id: '1', course: 'Blue', firstname: 'Fred', surname: 'Bloggs', ecard: 1234 }));
        entries.push(makeEntry({ id: '2', course: 'Blue', firstname: 'Joe', surname: 'Jones', ecard: 1235 }));
        entries.push(makeEntry({ id: '2', course: 'Green', firstname: 'Marie', surname: 'Hot' }));

        const text = iofXMLEntryList(fixture, entries);

   });

   it( 'Mark user data as archived when user is deleted', () => {
      // Delete a user

      // Check that user is marked as archivied

   });

} );
