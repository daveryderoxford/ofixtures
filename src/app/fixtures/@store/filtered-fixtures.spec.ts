import { FixtureFilter } from './fixture-filter'; // Assuming GradeFilter is in this path
import { UserData } from 'app/user/@store/user';
import { addMonths, formatISO } from 'date-fns';
import { anyWordStartsWith, isFixtureShown, makeDefaultGrades } from './filtered-fixtures';
import { Fixture } from './fixture';

describe('anyWordStartsWith', () => {
   it('should return true if a word starts with the search string (case insensitive)', () => {
      expect(anyWordStartsWith('Hello World', 'h')).toBe(true);
      expect(anyWordStartsWith('Hello World', 'wo')).toBe(true);
      expect(anyWordStartsWith('Another Test', 'Te')).toBe(true);
   });

   it('should return false if no word starts with the search string', () => {
      expect(anyWordStartsWith('Hello World', 'x')).toBe(false);
      expect(anyWordStartsWith('Hello World', 'orlds')).toBe(false);
   });

   it('should handle empty search string (returns true if str is not empty)', () => {
      expect(anyWordStartsWith('Hello World', '')).toBe(true);
      expect(anyWordStartsWith('', '')).toBe(false); // No words to start with ''
   });

   it('should return false if the input string is null or empty', () => {
      expect(anyWordStartsWith(null!, 'h')).toBe(false);
      expect(anyWordStartsWith(undefined!, 'h')).toBe(false);
      expect(anyWordStartsWith('', 'h')).toBe(false);
   });

   it('should handle multiple spaces between words', () => {
      expect(anyWordStartsWith('Hello    World', 'w')).toBe(true);
   });

   it('should handle search strings that are full words', () => {
      expect(anyWordStartsWith('Hello World', 'world')).toBe(true);
      expect(anyWordStartsWith('Hello World', 'World')).toBe(true);
   });
});

describe('isFixtureShown', () => {
   let baseFixture: Fixture;
   let baseFilter: FixtureFilter;
   let mockUser: UserData | null;
   const MOCK_TODAY = new Date(2023, 11, 1, 12, 0, 0); // Fri, Dec 1, 2023

   const createDate = (year: number, month: number, day: number) => new Date(year, month - 1, day);

   const SATURDAY_FIXTURE_DATE = createDate(2023, 12, 2); // Sat
   const SUNDAY_FIXTURE_DATE = createDate(2023, 12, 3);   // Sun
   const WEEKDAY_FIXTURE_DATE = createDate(2023, 12, 4);  // Mon

   beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(MOCK_TODAY);

      baseFixture = {
         id: 'fix1',
         date: formatISO(SATURDAY_FIXTURE_DATE),
         name: 'Super Event Alpha',
         club: 'Omega Club',
         area: 'Green Valley',
         nearestTown: 'Old Town',
         grade: 'National', // Default: distance 500, time 12 months
         distance: 50,
         clubURL: '',
         locSource: 'postcode',
         postcode: 'AB1 2CD',
         type: 'Foot',
         discipline: 'Long',
         webpage: '',
         association: 'BOF',
         rg: { baseURL: '', maps: [] },
      };

      baseFilter = {
         time: { sat: true, sun: true, weekday: true },
         gradesEnabled: true,
         grades: makeDefaultGrades(),
         likedOnly: false,
      };

      mockUser = {
         key: 'user1',
         firstname: 'Test',
         surname: 'User',
         club: 'User Club',
         nationality: 'GBR',
         nationalId: '',
         ecards: [],
         postcode: 'CD2 3EF',
         fixtures: [],
         reminders: ['fix1'], // Liked baseFixture
      };
   });

   afterEach(() => {
      jasmine.clock().uninstall();
   });

   // Time Filter Tests
   it('should show on Saturday if sat filter is true', () => {
      baseFixture.date = formatISO(SATURDAY_FIXTURE_DATE);
      baseFilter.time = { sat: true, sun: false, weekday: false };
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   it('should hide on Saturday if sat filter is false', () => {
      baseFixture.date = formatISO(SATURDAY_FIXTURE_DATE);
      baseFilter.time = { sat: false, sun: true, weekday: true };
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(false);
   });

   it('should show on Sunday if sun filter is true', () => {
      baseFixture.date = formatISO(SUNDAY_FIXTURE_DATE);
      baseFilter.time = { sat: false, sun: true, weekday: false };
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   it('should show on Weekday if weekday filter is true', () => {
      baseFixture.date = formatISO(WEEKDAY_FIXTURE_DATE);
      baseFilter.time = { sat: false, sun: false, weekday: true };
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   // Grade Filter Tests
   it('should show if grade filter passes (enabled, within time, within distance)', () => {
      baseFixture.grade = 'National'; // distance: 500, time: 12
      baseFixture.distance = 100;
      baseFixture.date = formatISO(addMonths(MOCK_TODAY, 1)); // Within 12 months
      baseFilter.gradesEnabled = true;
      const nationalGrade = baseFilter.grades.find(g => g.name === 'National')!;
      nationalGrade.enabled = true;
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   it('should hide if grade is disabled in filter', () => {
      baseFilter.gradesEnabled = true;
      const nationalGrade = baseFilter.grades.find(g => g.name === 'National')!;
      nationalGrade.enabled = false;
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(false);
   });

   it('should hide if fixture distance exceeds grade filter distance', () => {
      baseFixture.grade = 'Local'; // distance: 40, time: 2
      baseFixture.distance = 50; // Exceeds 40
      baseFilter.gradesEnabled = true;
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(false);
   });

   it('should hide if fixture date exceeds grade filter time', () => {
      baseFixture.grade = 'Local'; // distance: 40, time: 2 months
      baseFixture.date = formatISO(addMonths(MOCK_TODAY, 3)); // Exceeds 2 months
      baseFilter.gradesEnabled = true;
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(false);
   });

   it('should show if gradesEnabled is false, regardless of grade specifics', () => {
      baseFilter.gradesEnabled = false;
      baseFixture.grade = 'Local';
      baseFixture.distance = 1000; // normally would fail
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   // Liked Only Tests
   it('should show liked fixture if likedOnly is true and user liked it', () => {
      baseFilter.likedOnly = true;
      mockUser!.reminders = ['fix1'];
      baseFixture.id = 'fix1';
      // Other filters might fail, but likedOnly should override
      baseFilter.time.sat = false;
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   it('should hide non-liked fixture if likedOnly is true', () => {
      baseFilter.likedOnly = true;
      mockUser!.reminders = ['fix2']; // User hasn't liked fix1
      baseFixture.id = 'fix1';
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(false);
   });

   it('should show all fixtures if likedOnly is true and userdata is null (current behavior)', () => {
      baseFilter.likedOnly = true;
      // Make other filters fail to isolate likedOnly behavior
      baseFilter.time = { sat: false, sun: false, weekday: false };
      expect(isFixtureShown(baseFixture, null, baseFilter, '')).toBe(true);
   });

   it('should ignore liked status if likedOnly is false', () => {
      baseFilter.likedOnly = false;
      mockUser!.reminders = []; // User hasn't liked fix1
      // Should pass if other filters pass
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   // Search Filter Tests
   it('should show if search string is empty', () => {
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   it('should show if search matches club', () => {
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, 'omega')).toBe(true);
   });

   it('should show if search matches area', () => {
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, 'green')).toBe(true);
   });

   it('should show if search matches nearestTown', () => {
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, 'old')).toBe(true);
   });

   it('should show if search matches name', () => {
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, 'super')).toBe(true);
   });

   it('should hide if search does not match any field', () => {
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, 'xyz')).toBe(false);
   });

   it('should be case-insensitive for search', () => {
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, 'OMEGA')).toBe(true);
   });

   // Combination Tests
   it('should show if all filters pass', () => {
      // Base setup should pass
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(true);
   });

   it('should hide if time filter fails, even if others pass', () => {
      baseFilter.time.sat = false; // baseFixture is on Saturday
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(false);
   });

   it('should hide if grade filter fails, even if others pass', () => {
      baseFixture.distance = 1000; // Fails National grade distance
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(false);
   });

   it('should hide if search filter fails, even if others pass', () => {
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, 'nonexistent')).toBe(false);
   });

   it('should handle fixture with undefined distance when grades are enabled', () => {
      baseFixture.distance = undefined;
      baseFilter.gradesEnabled = true;
      // The condition is `(fix.distance !== undefined && fix.distance < gradeFilter.distance)`
      // So, if distance is undefined, this part of grade filter becomes false.
      expect(isFixtureShown(baseFixture, mockUser, baseFilter, '')).toBe(false);
   });
});