import { Fixture, LatLong } from 'app/fixtures/@store/fixture';
import { describe, expect, it } from 'vitest';
import { FixtureDatePipe, FixtureDistanceColorPipe, FixtureDistancePipe, GradeIconNamePipe, LikedPipe, LocationPipe } from './fixtures-grid-pipes';

describe('FixturePipes', () => {

    const dummyFixture: Fixture = {
        id: '1',
        date: '2024-03-10',
        name: 'Event 1',
        area: 'Area',
        nearestTown: 'Town',
        postcode: 'Postcode',
        latLong: { lat: 10, lng: 20 } as LatLong
    } as Fixture;

    it('LocationPipe should transform fixture data correctly', () => {
        const pipe = new LocationPipe();

        expect(pipe.transform(dummyFixture)).toBe('Area,&nbsp;&nbsp;&nbsp;Town,&nbsp;&nbsp;&nbsp;<b>Postcode</b>');

        const dummyFixtureSameTown = { ...dummyFixture, nearestTown: 'Area' };
        expect(pipe.transform(dummyFixtureSameTown)).toBe('Area,&nbsp;&nbsp;&nbsp;<b>Postcode</b>');

    });

    it('LocationPipe should truncate town if location is long', () => {
        const longAreaName = 'Area123456789012345678901234567890';  // 34 chaacters
        const longTownName = 'Town1234567890'; // 14 characters
        const pipe = new LocationPipe();
        const longFixture = { ...dummyFixture, area: longAreaName, nearestTown: longTownName };
        expect(pipe.transform(longFixture)).toBe(`${longAreaName},&nbsp;&nbsp;&nbsp;<b>Postcode</b>`);
    });


    it('FixtureDatePipe should transform date correctly', () => {
        const pipe = new FixtureDatePipe();
        // Today
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');

        expect(pipe.transform(todayStr + 'T10:00:00')).toBe('TODAY ');

        // Tomorrow
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1).toString().padStart(2, '0') + '-' + tomorrow.getDate().toString().padStart(2, '0');
        expect(pipe.transform(tomorrowStr + 'T10:00:00')).toBe('TOMORROW ');

        // Next week
        let nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 3);
        const nextWeekStr = nextWeek.getFullYear() + '-' + (nextWeek.getMonth() + 1).toString().padStart(2, '0') + '-' + nextWeek.getDate().toString().padStart(2, '0');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        expect(pipe.transform(nextWeekStr + 'T10:00:00')).toContain(days[nextWeek.getDay()]); // Check day of week

        // Future
        const future = new Date(2025, 2, 1);
        const futureStr = future.getFullYear() + '-' + (future.getMonth() + 1).toString().padStart(2, '0') + '-' + future.getDate().toString().padStart(2, '0');
        expect(pipe.transform(futureStr + 'T10:00:00')).toBe('Sat 1 Mar 25');

    });

    it('FixtureDistancePipe should transform distance correctly', () => {
        const pipe = new FixtureDistancePipe();

        expect(pipe.transform(10)).toBe('10');
        expect(pipe.transform(-1)).toBe('');
    });


    it('FixtureDistanceColorPipe should return correct color', () => {
        const pipe = new FixtureDistanceColorPipe();

        expect(pipe.transform(10)).toBe('#FF0000');
        expect(pipe.transform(30)).toBe('#0000FF');
        expect(pipe.transform(50)).toBe('#000000');
        expect(pipe.transform(-1)).toBe('#000000');

    });


    it('LikedPipe should return correct value', () => {
        const pipe = new LikedPipe();

        expect(pipe.transform('1', ['1', '2'])).toBe(true);
        expect(pipe.transform('3', ['1', '2'])).toBe(false);
        expect(pipe.transform('3', [])).toBe(false);

    });

    it('GradeIconNamePipe should return correct icon name', () => {
        const pipe = new GradeIconNamePipe();

        expect(pipe.transform('IOF')).toBe('grade-iof');
        expect(pipe.transform('International')).toBe('grade-international');
        expect(pipe.transform('Regional')).toBe('grade-regional');

    });

});