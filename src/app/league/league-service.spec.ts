import { TestBed } from '@angular/core/testing';
import { LeagueService } from './league-service';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { League } from 'app/model/league';
import { of } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';
import { FixturesService } from 'app/fixtures/fixtures.service';


describe('LeagueService', () => {
    let service: LeagueService;
    let mockFirestore: jasmine.SpyObj<Firestore>;
    let mockAuthService: jasmine.SpyObj<AuthService>;
    let mockFixtureService: jasmine.SpyObj<FixturesService>;

    beforeEach(() => {
        mockFirestore = jasmine.createSpyObj<Firestore>('Firestore', ['collection']);
        mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['user']);
        mockFixtureService = jasmine.createSpyObj<FixturesService>('FixtureService', ['setSelectedFixture']);

        TestBed.configureTestingModule({
            providers: [
                LeagueService,
                { provide: Firestore, useValue: mockFirestore },
                { provide: AuthService, useValue: mockAuthService },
                { provide: FixturesService, useValue: mockFixtureService }
            ]
        });
        service = TestBed.inject(LeagueService);

    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
