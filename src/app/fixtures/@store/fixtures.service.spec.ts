import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { vi } from 'vitest';
import { Storage } from '@angular/fire/storage'; // Correct import for Storage type
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { formatISO, addDays, subDays } from 'date-fns';
import { FixturesService } from './fixtures.service';
import { Fixture, LatLong } from './fixture';

// Mock 'rxfire/storage'
import { getDownloadURL } from 'rxfire/storage';
import { LocalStorageLocationData, LocalStorageService } from './local-storage';
vi.mock('rxfire/storage', () => ({
   getDownloadURL: vi.fn(),
}));
const mockGetDownloadURL = getDownloadURL as vi.Mock;

// Define MOCK_FIXTURES_ALL and MOCK_FIXTURES_FUTURE_ONLY as they are used in tests
const MOCK_TODAY_ISO = formatISO(new Date(2024, 0, 15, 12, 0, 0));
const MOCK_YESTERDAY_ISO = formatISO(subDays(new Date(2024, 0, 15, 12, 0, 0), 1));
const MOCK_TOMORROW_ISO = formatISO(addDays(new Date(2024, 0, 15, 12, 0, 0), 1));

const baseFixture: Omit<Fixture, 'id' | 'date' | 'name' | 'distance'> = {
   club: 'Test Club', clubURL: '', area: 'Test Area', locSource: 'postcode', postcode: 'AB12CD',
   grade: 'National', type: 'Foot', discipline: 'Long', webpage: '', nearestTown: 'Test Town',
   association: 'BOF', rg: { baseURL: '', maps: [] }, latLong: { lat: 51, lng: 0 }
};

const MOCK_FIXTURES_ALL: Fixture[] = [
   { ...baseFixture, id: '1', name: 'Past Event', date: MOCK_YESTERDAY_ISO, latLong: { lat: 50, lng: -1 } },
   { ...baseFixture, id: '2', name: 'Today Event', date: MOCK_TODAY_ISO, latLong: { lat: 52, lng: 1 } },
   { ...baseFixture, id: '3', name: 'Future Event', date: MOCK_TOMORROW_ISO, latLong: { lat: 53, lng: 2 } },
   { ...baseFixture, id: '4', name: 'Future Event No LatLng', date: MOCK_TOMORROW_ISO, latLong: undefined },
];

const MOCK_FIXTURES_FUTURE_ONLY: Fixture[] = [
   MOCK_FIXTURES_ALL[1], // Today
   MOCK_FIXTURES_ALL[2], // Future
   MOCK_FIXTURES_ALL[3], // Future No LatLng
];

describe('FixturesService', () => {
   let service: FixturesService;
   let httpClientSpy: { get: vi.Mock; };
   let storageSpy: { ref: vi.Mock; };
   let mockLocalStorageService: { getFromLocalStorage: vi.Mock, saveToLocalStorage: vi.Mock; };

   const MOCK_TODAY = new Date(2024, 0, 15, 12, 0, 0); // Jan 15, 2024, noon

   beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(MOCK_TODAY);

      httpClientSpy = { get: vi.fn() };
      storageSpy = { ref: vi.fn().mockReturnValue({}) }; // ref returns a dummy StorageReference

      // Setup the mock for getDownloadURL from rxfire/storage
      mockGetDownloadURL.mockReturnValue(of('http://fake-url.com/fixtures.json')); // Default success

      // Mock LocalStorageService
      mockLocalStorageService = {
         getFromLocalStorage: vi.fn().mockReturnValue(null), // Default: no stored location
         saveToLocalStorage: vi.fn(),
      };

      TestBed.configureTestingModule({
         providers: [ // providers should be an array
            FixturesService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: Storage, useValue: storageSpy },
            { provide: LocalStorageService, useValue: mockLocalStorageService }, // Provide the mock service
         ],
      });

      // Default http client behavior for fixture loading
      httpClientSpy.get.mockImplementation((url: string) => {
         if (url === 'http://fake-url.com/fixtures.json') {
            return of(MOCK_FIXTURES_ALL).pipe(delay(1));
         }
         // For postcode lookups, return a default success or let individual tests override
         return of({ result: { latitude: 50, longitude: 0 } });
      });

      service = TestBed.inject(FixturesService); // Initialize service here for all tests
   });

   afterEach(() => {
      vi.useRealTimers();
      vi.clearAllMocks(); // Use vi.clearAllMocks() for Vitest
   });

   // Helper to initialize service and wait for initial fixture load
   const initializeServiceAndWaitForLoad = () => {
      // Service is already injected in beforeEach, this function can ensure loading state is processed
      // Accessing a computed signal that depends on rawFixtures will trigger the load
      service.loading(); // or service.fixtures()
      tick(1); // Allow microtasks and observables (like fixture loading delay) to complete
   };

   describe('constructor', () => {
      it('should initialize with default postcode and location if nothing in local storage', () => {
         // Mock provided in TestBed.configureTestingModule
         // Service is already created in beforeEach
         // No tick needed here as constructor logic is synchronous regarding localStorage
         expect(service.postcode()).toBe(FixturesService.DEFAULT_POSTCODE);
         expect(service.homeLocation()).toEqual(FixturesService.DEFAULT_LATLNG);
         expect(mockLocalStorageService.getFromLocalStorage).toHaveBeenCalledWith('location');
      });

      it('should initialize from local storage if data exists', () => {
         const storedLocation: LocalStorageLocationData = { postcode: 'ZZ11AA', latlng: { lat: 10, lng: 20 } };
         // Get the mock service instance from TestBed and configure the spy
         mockLocalStorageService.getFromLocalStorage.mockReturnValue(storedLocation);
         // Re-inject or re-create service if constructor logic needs to re-run with new mock value
         // For this specific case, the constructor runs once when service is first injected.
         // To test this scenario properly, you might need to setup the mock *before* TestBed.inject
         // or create a new TestBed for this specific test case.
         // However, if the service is already injected in the outer beforeEach,
         // we need to ensure the mock is set before that.
         // A simpler way for this specific test is to re-instantiate the service.
         TestBed.resetTestingModule(); // Reset current TestBed
         TestBed.configureTestingModule({
            providers: [
               FixturesService,
               { provide: HttpClient, useValue: httpClientSpy },
               { provide: Storage, useValue: storageSpy },
               { provide: LocalStorageService, useValue: { getFromLocalStorage: vi.fn().mockReturnValue(storedLocation), saveToLocalStorage: vi.fn() } },
            ],
         });
         service = TestBed.inject(FixturesService);

         expect(service.postcode()).toBe('ZZ11AA');
         expect(service.homeLocation()).toEqual({ lat: 10, lng: 20 });
         expect(TestBed.inject(LocalStorageService).getFromLocalStorage).toHaveBeenCalledWith('location');
      });
   });
   describe('fixture loading (rawFixtures, loading, error)', () => {
      it('should have loading true initially then false after fixtures load', fakeAsync(() => {
         mockGetDownloadURL.mockReturnValue(of('http://fake-url.com/fixtures.json'));
         httpClientSpy.get.mockReturnValue(of(MOCK_FIXTURES_ALL).pipe(delay(1)));

         service = TestBed.inject(FixturesService);

         expect(service.loading()).toBe(true);
         tick(1); // Advance time for the delay in http.get
         expect(service.loading()).toBe(false);
         expect(service.rawFixtures.value().length).toBe(MOCK_FIXTURES_FUTURE_ONLY.length);
         expect(service.error()).toBeNull();
      }));

      it('should load and filter future fixtures successfully', fakeAsync(() => {
         initializeServiceAndWaitForLoad();

         expect(service.loading()).toBe(false);
         expect(service.error()).toBeNull();
         const rawFixtures = service.rawFixtures.value();
         expect(rawFixtures.length).toBe(MOCK_FIXTURES_FUTURE_ONLY.length);
         expect(rawFixtures).toEqual(
            expect.arrayContaining([
               expect.objectContaining({ id: '2' }), // Today
               expect.objectContaining({ id: '3' }), // Future
               expect.objectContaining({ id: '4' }), // Future No LatLng
            ])
         );
         expect(rawFixtures.find(f => f.id === '1')).toBeUndefined(); // Past event filtered out
      }));

      it('should handle error from getDownloadURL', fakeAsync(() => {
         const downloadError = new Error('Download URL failed');
         mockGetDownloadURL.mockReturnValue(throwError(() => downloadError));

         initializeServiceAndWaitForLoad(); // This will attempt to load


         expect(service.loading()).toBe(false);
         expect(service.error()).toBe(downloadError);
         expect(service.rawFixtures.value()).toEqual([]);
      }));
      it('should handle error from httpClient.get for fixtures', fakeAsync(() => {
         const httpError = new Error('HTTP fetch failed');
         mockGetDownloadURL.mockReturnValue(of('http://fake-url.com/fixtures.json'));
         httpClientSpy.get.mockImplementation((url: string) => {
            if (url === 'http://fake-url.com/fixtures.json') {
               return throwError(() => httpError);

               initializeServiceAndWaitForLoad();

               expect(service.loading()).toBe(false);
               expect(service.error()).toBe(httpError);
               expect(service.rawFixtures.value()).toEqual([]);
            }));
   });

   describe('fixtures computed signal (with distance)', () => {
      beforeEach(fakeAsync(() => {
         initializeServiceAndWaitForLoad();
      }));

      it('should calculate distances correctly for loaded fixtures using default home location', () => {
         const fixturesWithDistance = service.fixtures();
         const todayEvent = fixturesWithDistance.find(f => f.id === '2');
         const futureEvent = fixturesWithDistance.find(f => f.id === '3');
         const noLatLngEvent = fixturesWithDistance.find(f => f.id === '4');

         expect(fixturesWithDistance.length).toBe(MOCK_FIXTURES_FUTURE_ONLY.length);
         expect(todayEvent?.distance).toBe(80); // Approx distance
         expect(futureEvent?.distance).toBe(148); // Approx distance
         expect(noLatLngEvent?.distance).toBe(-1);
      });

      it('should update distances when homeLocation changes via setPostcode', fakeAsync(async () => {
         const initialFixtures = service.fixtures();
         const todayEventInitial = initialFixtures.find(f => f.id === '2');
         const initialDistance = todayEventInitial!.distance;

         const newPostcode = 'WC2N5DU'; // Trafalgar Square
         const newLatLng: LatLong = { lat: 51.5074, lng: -0.1278 };
         httpClientSpy.get.mockImplementation((url: string) => {
            if (url.includes(newPostcode.toLowerCase())) {
               return of({ result: { latitude: newLatLng.lat, longitude: newLatLng.lng } });
            }
            return of(MOCK_FIXTURES_ALL); // For initial fixture load
         });

         await service.setPostcode(newPostcode);
         tick(); // Allow signals to update based on new homeLocation
         // Need to tick again for the saveToLocalStorage effect if it's triggered by a signal change
         // tick();
         const updatedFixtures = service.fixtures();
         const todayEventUpdated = updatedFixtures.find(f => f.id === '2'); // Fixture at { lat: 52, lng: 1 }
         expect(todayEventUpdated!.distance).not.toBe(initialDistance);
         expect(todayEventUpdated!.distance).toBe(58); // Approx new distance
      }));
   });

   describe('setPostcode', () => {
      const testPostcode = 'SW1A1AA'; // Buckingham Palace
      const testLatLng: LatLong = { lat: 51.5014, lng: -0.1419 };

      beforeEach(fakeAsync(() => {
         initializeServiceAndWaitForLoad();
         httpClientSpy.get.mockImplementation((url: string) => {
            if (url.includes('fixtures.json')) return of(MOCK_FIXTURES_ALL).pipe(delay(1));
            if (url.includes(testPostcode.toLowerCase())) return of({ result: { latitude: testLatLng.lat, longitude: testLatLng.lng } });
            return of({ result: { latitude: 0, longitude: 0 } });
         });
      }));

      it('should update postcode and homeLocation on successful API call and save to local storage', fakeAsync(async () => {
         const result = await service.setPostcode(testPostcode);
         tick();

         expect(result).toEqual(testLatLng);
         expect(service.postcode()).toBe(testPostcode);
         expect(service.homeLocation()).toEqual(testLatLng); // Signal should be updated
         // Check the spy on the mock LocalStorageService
         expect(mockLocalStorageService.saveToLocalStorage).toHaveBeenCalledWith('location', { postcode: testPostcode, latlng: testLatLng });
      }));

      it('should return null and not update if postcode API fails (e.g., 404)', fakeAsync(async () => {
         const failingPostcode = 'FA1LUR3';
         httpClientSpy.get.mockImplementation((url: string) => {
            if (url.includes(failingPostcode.toLowerCase())) return throwError(() => new HttpErrorResponse({ error: 'Postcode not found', status: 404 }));
            if (url.includes('fixtures.json')) return of(MOCK_FIXTURES_ALL);
            return of(null);
         });

         const initialPc = service.postcode();
         const initialLoc = service.homeLocation();

         const result = await service.setPostcode(failingPostcode);
         tick();

         expect(result).toBeNull();
         expect(service.postcode()).toBe(initialPc);
         expect(service.homeLocation()).toEqual(initialLoc);
         // Check the spy on the mock LocalStorageService
         expect(mockLocalStorageService.saveToLocalStorage).not.toHaveBeenCalled();
      }));

      it('should return null and not update if postcode API returns invalid data (null result)', fakeAsync(async () => {
         const invalidPostcode = 'INV4L1D';
         httpClientSpy.get.mockImplementation((url: string) => {
            if (url.includes(invalidPostcode.toLowerCase())) return of({ result: null });
            if (url.includes('fixtures.json')) return of(MOCK_FIXTURES_ALL);
            return of(null);
         });
         const initialPc = service.postcode();
         const initialLoc = service.homeLocation();

         const result = await service.setPostcode(invalidPostcode);
         tick();

         expect(result).toBeNull();
         expect(service.postcode()).toBe(initialPc);
         expect(service.homeLocation()).toEqual(initialLoc);
         expect(mockLocalStorageService.saveToLocalStorage).not.toHaveBeenCalled();
      }));

      it('should return null and not update if postcode API returns invalid data (missing lat/lng)', fakeAsync(async () => {
         const invalidPostcode = 'NOL4TLNG';
         httpClientSpy.get.mockImplementation((url: string) => {
            if (url.includes(invalidPostcode.toLowerCase())) return of({ result: { some_other_prop: true } });
            if (url.includes('fixtures.json')) return of(MOCK_FIXTURES_ALL);
            return of(null);
         });
         const initialPc = service.postcode();
         const initialLoc = service.homeLocation();

         const result = await service.setPostcode(invalidPostcode);
         tick();

         expect(result).toBeNull();
         expect(service.postcode()).toBe(initialPc);
         expect(service.homeLocation()).toEqual(initialLoc);
         expect(mockLocalStorageService.saveToLocalStorage).not.toHaveBeenCalled();
      }));
   });
});