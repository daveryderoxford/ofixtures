import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FixturesService } from './fixtures.service';
import { Fixture } from 'app/model/fixture';
import { of } from 'rxjs';
import { UserDataService } from 'app/user/user-data.service';
import { FixtureFilter, GradeFilter } from 'app/model/fixture-filter';
import { Storage } from '@angular/fire/storage';
import { ref } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { getFromLocalStorage } from './local-storage';


describe('FixturesService', () => {
  let service: FixturesService;
  let httpMock: HttpTestingController;
  let mockUserDataService: jasmine.SpyObj<UserDataService>;
  let mockStorage: jasmine.SpyObj<Storage>;


  beforeEach(() => {
    mockUserDataService = jasmine.createSpyObj<UserDataService>(['userdata']);
    mockStorage = jasmine.createSpyObj<Storage>(['ref']);

    TestBed.configureTestingModule({
      providers: [
        FixturesService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Storage, useValue: mockStorage }
      ]
    });
    service = TestBed.inject(FixturesService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    // check for pending requests
    httpMock.verify();
    localStorage.clear(); // clear local storage after each test
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return fixtures from the HTTP request', () => {
    const dummyFixtures: Fixture[] = [
      { id: '1', date: '2024-03-10', name: 'Event 1' } as Fixture,
      { id: '2', date: '2024-03-17', name: 'Event 2' } as Fixture,
    ];

    mockStorage.ref.and.returnValue(ref(mockStorage, "fixtures/uk"));

    service.allFixtues().subscribe(fixtures => {
      expect(fixtures.length).toBe(2);
      expect(fixtures).toEqual(dummyFixtures);
    });


    const req = httpMock.expectOne(req => req.url.includes("fixtures/uk"));
    expect(req.request.method).toBe('GET');
    req.flush(dummyFixtures);

  });



  it('should filter fixtures based on date - time and grade', () => {

    mockUserDataService.userdata.and.returnValue(of(null));
    mockStorage.ref.and.returnValue(ref(mockStorage, "fixtures/uk"));


    const filter: FixtureFilter = {
      ...FixturesService.DEFAULT_FILTER, time: { sat: true, sun: false, weekday: false },
      grades: [
        { name: 'IOF', enabled: true, distance: 1000, time: 48 },
        { name: 'International', enabled: true, distance: 1000, time: 48 },
        { name: 'National', enabled: false, distance: 500, time: 12 },
      ]
    };

    service.setFilter(filter);

    const dummyFixtures: Fixture[] = [
      { id: '1', date: '2024-03-09T12:00:00', name: 'Saturday Event', grade: "IOF", latLong: FixturesService.DEFAULT_LATLNG, area: "A", nearestTown: "T" } as Fixture,
      { id: '2', date: '2024-03-10T12:00:00', name: 'Sunday Event', grade: "International", latLong: FixturesService.DEFAULT_LATLNG, area: "A", nearestTown: "T" } as Fixture,
      { id: '3', date: '2024-03-11T12:00:00', name: 'Weekday Event', grade: "National", latLong: FixturesService.DEFAULT_LATLNG, area: "A", nearestTown: "T" } as Fixture,

    ];

    service.allFixtues().subscribe();
    const req = httpMock.expectOne(req => req.url.includes("fixtures/uk"));
    expect(req.request.method).toBe('GET');
    req.flush(dummyFixtures);



    service.getFixtures().subscribe(fixtures => {
      expect(fixtures.length).toBe(1);
      expect(fixtures[0].id).toEqual('1');
    });

  });




  it('should filter fixtures based on liked status', () => {
    mockUserDataService.userdata.and.returnValue(of({ reminders: ['2'] }));
    mockStorage.ref.and.returnValue(ref(mockStorage, "fixtures/uk"));

    service.setFilter({ ...FixturesService.DEFAULT_FILTER, likedOnly: true });
    const dummyFixtures: Fixture[] = [
      { id: '1', date: '2024-03-09T12:00:00', name: 'Saturday Event', grade: "IOF", latLong: FixturesService.DEFAULT_LATLNG, area: "A", nearestTown: "T" } as Fixture,
      { id: '2', date: '2024-03-10T12:00:00', name: 'Sunday Event', grade: "International", latLong: FixturesService.DEFAULT_LATLNG, area: "A", nearestTown: "T" } as Fixture,
    ];

    service.allFixtues().subscribe();
    const req = httpMock.expectOne(req => req.url.includes("fixtures/uk"));
    req.flush(dummyFixtures);

    service.getFixtures().subscribe(fixtures => {
      expect(fixtures.length).toBe(1);
      expect(fixtures[0].id).toEqual('2');
    });

  });

  it('should filter fixtures based on search string', () => {
    mockUserDataService.userdata.and.returnValue(of({ reminders: ['2'] }));
    mockStorage.ref.and.returnValue(ref(mockStorage, "fixtures/uk"));


    service.setFilter(FixturesService.DEFAULT_FILTER);
    service.setSearch('Town2');
    const dummyFixtures: Fixture[] = [
      { id: '1', date: '2024-03-09T12:00:00', name: 'Event 1', grade: "IOF", latLong: FixturesService.DEFAULT_LATLNG, area: "Area1", nearestTown: "Town1" } as Fixture,
      { id: '2', date: '2024-03-10T12:00:00', name: 'Event 2', grade: "International", latLong: FixturesService.DEFAULT_LATLNG, area: "Area2", nearestTown: "Town2" } as Fixture,
    ];

    service.allFixtues().subscribe();
    const req = httpMock.expectOne(req => req.url.includes("fixtures/uk"));
    req.flush(dummyFixtures);

    service.getFixtures().subscribe(fixtures => {
      expect(fixtures.length).toBe(1);
      expect(fixtures[0].id).toEqual('2');
    });

  });



  it('should set and retrieve filter from local storage', () => {
    const newGrades = [
      { name: 'IOF', enabled: false, distance: 10, time: 4 },
      { name: 'International', enabled: true, distance: 100, time: 40 },
    ];

    service.setFilter({ ...FixturesService.DEFAULT_FILTER, grades: newGrades });

    // retrieve from local storage and check if saved correctly
    const retrievedGrades = getFromLocalStorage('grades') as GradeFilter[];
    expect(retrievedGrades).toEqual(newGrades);

    // check if filter is set correctly
    service.filter$.subscribe(filter => {
      expect(filter.grades).toEqual(newGrades);
    });
  });


  it('should set postcode and location', async () => {

    mockStorage.ref.and.returnValue(ref(mockStorage, "fixtures/uk"));

    const newPostcode = 'AB1 2CD';
    const newLatLong = { lat: 10, lng: 20 };

    service._calcLatLong(newPostcode).subscribe();


    const req = httpMock.expectOne(`https://api.postcodes.io/postcodes/${newPostcode}`);
    req.flush({ result: { latitude: newLatLong.lat, longitude: newLatLong.lng } });



    const result = await service.setPostcode(newPostcode);

    expect(result).toEqual(newLatLong);


    service.postcode$.subscribe(postcode => {
      expect(postcode).toBe(newPostcode);
    });

    service.homeLocation$.subscribe(latlng => {
      expect(latlng).toEqual(newLatLong);
    });


    const retrievedLocation = getFromLocalStorage('location') as LocalStorageLocationData;
    expect(retrievedLocation.postcode).toBe(newPostcode);
    expect(retrievedLocation.latlng).toEqual(newLatLong);


  });



  it('should calculate distance', () => {

    const fixture = { latLong: { lat: 51.5, lng: 0 } } as Fixture;

    const distance = service._distanceFromHome(fixture, { lat: 51.6, lng: 0 });

    expect(distance).toBeGreaterThan(0);


  });


});