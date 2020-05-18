import diaries from '../../data/diaries';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => {
    return diaries;
};

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility}) => ({
        id, date, weather, visibility
    }));
};

const addEntry = ( entry: NewDiaryEntry ): DiaryEntry => {
    const newEntry = {
        id: Math.max(...diaries.map(diary => diary.id)) + 1,
        ...entry
    };

    diaries.push(newEntry);
    return newEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(diary => diary.id === id);
    return entry;
};

export default {
    addEntry,
    findById,
    getEntries,
    getNonSensitiveDiaryEntries
};