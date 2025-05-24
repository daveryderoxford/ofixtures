
/** data associated with a user */
import { DocumentSnapshot } from '@angular/fire/firestore';
import { GradeFilter } from "../../fixtures/@store/fixture-filter";

export const controlCardTypes = ["SI", "Emit", "Other"] as const;
export type ControlCardType = typeof controlCardTypes[number];

export interface ECard {
    id: string;
    type: ControlCardType;
}

/** Information set by the users abouth themselves */
export interface UserInfo {
    firstname: string;
    surname: string;
    club: string;
    nationality: string;  // short nationality code
    nationalId: string;
    ecards: ECard[];
    postcode: string;
    fixtureGradeFilters?: GradeFilter[];
}

/** All the user data stored for the user */
export interface UserData extends UserInfo {
    key: string;  // Matches with the users Firebase reference
    fixtures: UserFixture[] | UserReservation[];
    reminders: string[];  // array of eventIds
}


export interface UserFixture {
    eventId: string;
    date: string;
    name: string;
}
export interface UserReservation extends UserFixture {
    course: string;
    waitinglist?: number;
}

// Firestore data converters
// 1. Firebase only supports null while undefined is perferred in project
// 2. Firebase stores dates as Timestamps rather than Javascript dates.  
export const userConverter = {
    toFirestore: (user: UserData) => {
        return {
            ...user,
        };
    },
    fromFirestore: (snapshot: DocumentSnapshot<any>, options: any): UserData => {
        const data = snapshot.data()!;
        return {
            ...data,
        } as UserData;
    }
};
