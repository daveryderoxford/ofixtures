
/** data associated with a user */
import { GradeFilter } from "./fixture-filter";
import { ControlCardType } from "./oevent";

export interface ECard {
    id: string;
    type: ControlCardType;
}

/** Information set by the users abouth themselves */
export interface UserInfo {
    email: string;         // Not on client
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
    archived: boolean;
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
