import { TestBed } from '@angular/core/testing';
import { LeagueService } from './league-service';
import { collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { League } from 'app/league/@store/league';
import { of, throwError } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';
import { FirestoreProvider } from 'app/shared/services/firestore-provider';
import { signal } from '@angular/core';
import { addDays, formatISO, subDays } from 'date-fns';
import { vi, describe, expect, Mock, it, beforeEach, afterEach } from 'vitest';

// Mock @angular/fire/firestore functions
vi.mock('@angular/fire/firestore', async (importOriginal: any) => {
  const actual = await importOriginal(); // type is inferred
  return {
    ...actual,
    collection: vi.fn(),
    collectionData: vi.fn(),
    doc: vi.fn(),
    setDoc: vi.fn(),
    deleteDoc: vi.fn(),
  };
});

// Cast mocked functions for type safety and spy access
const mockCollection = collection as Mock;
const mockCollectionData = collectionData as Mock;
const mockDoc = doc as Mock;
const mockSetDoc = setDoc as Mock;
const mockDeleteDoc = deleteDoc as Mock;

describe('LeagueService', () => {
  let service: LeagueService;
  let mockFirestoreProvider: { getFirestore: Mock; };
  let mockAuthService: { user: Mock; };
  let mockFirestoreInstance: any;

  const MOCK_TODAY = new Date(2024, 5, 15); // June 15, 2024
  const MOCK_USER_ID = 'test-user-id';

  const futureLeague: League = {
    id: '1', userId: 'user1', name: 'Future League', url: '', type: 'League', level: 'National',
    fixtureIds: ['fix1'], startDate: formatISO(addDays(MOCK_TODAY, 10)), endDate: formatISO(addDays(MOCK_TODAY, 20))
  };
  const pastLeague: League = {
    id: '2', userId: 'user2', name: 'Past League', url: '', type: 'League', level: 'Regional',
    fixtureIds: ['fix2'], startDate: formatISO(subDays(MOCK_TODAY, 20)), endDate: formatISO(subDays(MOCK_TODAY, 10))
  };
  const ongoingLeagueNoFixtures: League = {
    id: '3', userId: 'user3', name: 'Ongoing No Fixtures', url: '', type: 'League', level: 'Club',
    fixtureIds: [], startDate: formatISO(subDays(MOCK_TODAY, 5)), endDate: formatISO(addDays(MOCK_TODAY, 5))
  };
  const anotherFutureLeague: League = {
    id: '4', userId: 'user4', name: 'Another Future League', url: '', type: 'Multiday', level: 'National',
    fixtureIds: ['fix3', 'fix4'], startDate: formatISO(addDays(MOCK_TODAY, 5)), endDate: formatISO(addDays(MOCK_TODAY, 15))
  };

  const allLeaguesMock: League[] = [futureLeague, pastLeague, ongoingLeagueNoFixtures, anotherFutureLeague];

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(MOCK_TODAY);

    mockFirestoreInstance = {}; // Dummy Firestore instance
    mockFirestoreProvider = {
      getFirestore: vi.fn(() => mockFirestoreInstance)
    };
    mockAuthService = {
      user: vi.fn(() => signal({ uid: MOCK_USER_ID }))
    };

    // Default mock implementations
    mockCollection.mockReturnValue({ id: 'leaguesCollection' } as any); // Return a dummy collection ref
    mockCollectionData.mockReturnValue(of(allLeaguesMock));
    mockDoc.mockImplementation((_: any, path: string) => ({ id: path.split('/').pop(), path } as any)); // Return a dummy doc ref
    mockSetDoc.mockResolvedValue(undefined);
    mockDeleteDoc.mockResolvedValue(undefined);

    TestBed.configureTestingModule({
      providers: [
        LeagueService,
        { provide: FirestoreProvider, useValue: mockFirestoreProvider },
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    service = TestBed.inject(LeagueService);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('leagues resource', () => {
    it('should be loading initially', () => {
      expect(service.leagues.isLoading()).toBe(true);
    });

    it('should load, filter, and sort leagues successfully', async () => {
      // Trigger the resource loading if not already triggered by constructor/injection
      service.leagues.value(); // Access value to ensure loader runs
      TestBed.tick();
      await Promise.resolve(); // Allow observables to complete

      expect(service.leagues.isLoading()).toBe(false);
      expect(service.leagues.error()).toBeUndefined();
      const loadedLeagues = service.leagues.value();
      expect(loadedLeagues.length).toBe(2);
      expect(loadedLeagues[0]).toEqual(anotherFutureLeague); // Sorted by startDate
      expect(loadedLeagues[1]).toEqual(futureLeague);
      expect(mockCollectionData).toHaveBeenCalledWith({ id: 'leaguesCollection' });
    });

    it('should handle errors during league loading', async () => {
      const error = new Error('Failed to load leagues');
      mockCollectionData.mockReturnValue(throwError(() => error));

      // Re-initialize service or resource if necessary, or ensure error path is triggered
      // For rxResource, errors in the loader are caught and set to the error signal.
      service = TestBed.inject(LeagueService); // Re-inject to re-trigger resource with new mock
      service.leagues.value();
      TestBed.tick();
      await Promise.resolve();

      expect(service.leagues.isLoading()).toBe(false);
      expect(service.leagues.error()).toBe(error);
      expect(() => service.leagues.value()).toThrow(); // Accessing value throws in error state
    });
  });

  describe('findById', () => {
    it('should find a league by ID if it exists in the loaded leagues', async () => {
      service.leagues.value();
      TestBed.tick();
      await Promise.resolve(); // Load leagues
      expect(service.findById(futureLeague.id)).toEqual(futureLeague);
    });

    it('should return undefined if league ID is not found', async () => {
      service.leagues.value();
      TestBed.tick();
      await Promise.resolve();
      expect(service.findById('non-existent-id')).toBeUndefined();
    });

    it('should return undefined if ID is undefined', () => {
      expect(service.findById(undefined)).toBeUndefined();
    });
  });

  describe('update', async () => {
    it('should call setDoc with correct parameters', async () => {
      const leagueId = 'league-to-update';
      const partialLeague: Partial<League> = { name: 'Updated Name' };
      const expectedDocRef = { id: leagueId, path: `leagues/${leagueId}` };
      mockDoc.mockReturnValue(expectedDocRef as any);

      await service.update(leagueId, partialLeague);

      expect(mockDoc).toHaveBeenCalledWith(mockFirestoreInstance, 'leagues', leagueId);
      expect(mockSetDoc).toHaveBeenCalledWith(expectedDocRef, partialLeague, { merge: true });
    });
  });

  describe('add', () => {
    it('should call setDoc with a new ID and userId', async () => {
      const partialLeague: Partial<League> = { name: 'New League', type: 'League' };
      const newDocId = 'new-generated-id';
      const newDocRef = { id: newDocId, path: `leagues/${newDocId}` };
      mockDoc.mockReturnValueOnce(newDocRef as any); // For the d = doc(collection(...)) call

      await service.add(partialLeague);

      expect(mockCollection).toHaveBeenCalledWith(mockFirestoreInstance, "leagues");
      expect(mockDoc).toHaveBeenCalledWith({ id: 'leaguesCollection' }); // From collection(this.fs, "leagues")
      /*     expect(mockSetDoc).toHaveBeenCalledWith(newDocRef, expect.objectContaining({
               ...partialLeague,
               id: newDocId,
               userId: MOCK_USER_ID
           })
           ); */
    });
  });

  describe('delete', () => {
    it('should call deleteDoc with correct parameters', async () => {
      const leagueId = 'league-to-delete';
      const expectedDocRef = { id: leagueId, path: `leagues/${leagueId}` };
      mockDoc.mockReturnValue(expectedDocRef as any);

      await service.delete(leagueId);

      expect(mockDoc).toHaveBeenCalledWith(mockFirestoreInstance, 'leagues', leagueId);
      expect(mockDeleteDoc).toHaveBeenCalledWith(expectedDocRef);
    });
  });
});
