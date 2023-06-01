
export const eventGrades = ["IOF" , "International" , "National" , "Regional" , "Club" , "Local"] as const;
export type EventGrade = typeof eventGrades[number];

export class EventGrades {
    static grades: Array<EventGrade> = ["IOF" , "International" , "National" , "Regional", "Club", "Local"];

    static indexObject(grade: EventGrade): any {
        const grades = EventGrades.grades.reverse();
        const gradeIndex = grades.indexOf(grade);

        const ret: any = {};
        for (let i = gradeIndex; i < grades.length; i++) {
            ret[grades[i]] = true;
        }
        return ret;
    }
}

export const eventDisciplines = ["Sprint", "Urban", "Middle", "Long", "Mountain marathon", "Other", "Unknown"] as const;
export type EventDiscipline = typeof eventDisciplines[number];

export const eventTypes = ["Foot", "Bike", "Ski", "Trail", "Other"] as const;
export type EventType = typeof eventTypes[number];

export const controlCardTypes = ["SI", "Emit", "Other"] as const;
export type ControlCardType = typeof controlCardTypes[number];
