
/** data associated with a user */
import { ControlCardType } from "./oevent";
import { ISODateString } from "./date";
import { GradeFilter } from "./fixture-filter";

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
