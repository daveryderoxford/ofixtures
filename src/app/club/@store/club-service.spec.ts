import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import { ClubService } from './club-service';
import { FixturesService } from 'app/fixtures/@store/fixtures.service';
import { Fixture } from 'app/fixtures/@store/fixture';

const mockFixtures: Fixture[] = [
  { id: '1', name: 'Event A', club: 'Club Alpha', clubURL: 'url.alpha', date: '2024-01-01' } as Fixture,
  { id: '2', name: 'Event B', club: 'Club Beta', clubURL: 'url.beta', date: '2024-01-02' } as Fixture,
  { id: '3', name: 'Event C', club: 'Club Alpha', clubURL: 'url.alpha', date: '2024-01-03' } as Fixture, // Duplicate club name
  { id: '4', name: 'Event D', club: 'Club Gamma', clubURL: 'url.gamma', date: '2024-01-04' } as Fixture,
  { id: '5', name: 'Event E', club: '  Club Beta  ', clubURL: 'url.beta.trimmed', date: '2024-01-05' } as Fixture, // Club name with spaces
  { id: '6', name: 'Event F', club: '', clubURL: 'url.empty', date: '2024-01-06' } as Fixture, // Empty club name
  { id: '7', name: 'Event G', club: 'Club Alpha', clubURL: 'url.alpha.again', date: '2024-01-07' } as Fixture, // Another Club Alpha event
];

describe('ClubService', () => {
  let service: ClubService;
  let mockFixturesService: { fixtures: vi.Mock };

  beforeEach(() => {
    // Create a mock for FixturesService
    // The `fixtures` property needs to be a function that returns a signal
    mockFixturesService = {
      fixtures: vi.fn(() => signal(mockFixtures)), // Return a signal with mockFixtures
    };

    TestBed.configureTestingModule({
      providers: [
        ClubService,
        { provide: FixturesService, useValue: mockFixturesService },
      ],
    });

    service = TestBed.inject(ClubService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('clubs computed signal', () => {
    it('should return unique, trimmed, and sorted club names with their URLs', () => {
      const clubs = service.clubs();
      expect(clubs.length).toBe(3); // Alpha, Beta, Gamma
      expect(clubs.map(c => c.name)).toEqual(['Club Alpha', 'Club Beta', 'Club Gamma']);

      const clubAlpha = clubs.find(c => c.name === 'Club Alpha');
      expect(clubAlpha).toBeDefined();
      // The URL from the first encountered "Club Alpha" should be taken
      expect(clubAlpha?.url).toBe('url.alpha');

      const clubBeta = clubs.find(c => c.name === 'Club Beta');
      expect(clubBeta).toBeDefined();
      // The URL from the first encountered "Club Beta" (after trimming) should be taken
      expect(clubBeta?.url).toBe('url.beta');
    });

    it('should handle an empty fixtures list', () => {
      mockFixturesService.fixtures.mockReturnValue(signal([]));
      // Re-inject or re-create service if constructor logic needs to re-run with new mock value
      // For computed signals, changing the source signal should be enough
      const clubs = service.clubs();
      expect(clubs.length).toBe(0);
    });

    it('should filter out fixtures with empty or whitespace-only club names', () => {
      const fixturesWithEmptyClub = [
        ...mockFixtures,
        { id: '8', name: 'Event H', club: '   ', date: '2024-01-08' } as Fixture,
      ];
      mockFixturesService.fixtures.mockReturnValue(signal(fixturesWithEmptyClub));
      const clubs = service.clubs();
      expect(clubs.length).toBe(3); // Still Alpha, Beta, Gamma
      expect(clubs.find(c => c.name.trim() === '')).toBeUndefined();
    });
  });

  describe('fixtures computed signal', () => {
    it('should return fixtures for the selected club', fakeAsync(() => {
      service.selected.set('Club Alpha');
      tick(); // Allow computed signal to update

      const clubAlphaFixtures = service.fixtures();
      expect(clubAlphaFixtures.length).toBe(3); // Event A, Event C, Event G
      expect(clubAlphaFixtures.every(f => f.club === 'Club Alpha')).toBe(true);
    }));

    it('should return an empty array if no club is selected', fakeAsync(() => {
      service.selected.set(null);
      tick();
      expect(service.fixtures().length).toBe(0);
    }));

    it('should return an empty array if the selected club has no fixtures (or does not exist)', fakeAsync(() => {
      service.selected.set('NonExistent Club');
      tick();
      expect(service.fixtures().length).toBe(0);
    }));
  });

  describe('find method', () => {
    it('should find a club by its name', () => {
      const foundClub = service.find('Club Beta');
      expect(foundClub).toBeDefined();
      expect(foundClub?.name).toBe('Club Beta');
      expect(foundClub?.url).toBe('url.beta');
    });

    it('should return undefined if club name is not found', () => {
      expect(service.find('NonExistent Club')).toBeUndefined();
    });

    it('should return undefined if name is undefined', () => {
      expect(service.find(undefined)).toBeUndefined();
    });
  });
});