Generate unit tests

import { LatLong } from 'model/latlng';
import { findAddressLocation, makeAddress } from './address_search';
import { findInGoogleSearchCache, saveInGoogleSearchCache } from './google_search_cache';
import { googleLocationSearch } from './google_search';

jest.mock('./google_search');
jest.mock('./google_search_cache');

const mockGoogleLocationSearch = googleLocationSearch as jest.MockedFunction<typeof googleLocationSearch>;
const mockFindInGoogleSearchCache = findInGoogleSearchCache as jest.MockedFunction<typeof findInGoogleSearchCache>;
const mockSaveInGoogleSearchCache = saveInGoogleSearchCache as jest.MockedFunction<typeof saveInGoogleSearchCache>;

describe('findAddressLocation', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return null if no area and town specified', async () => {
        const result = await findAddressLocation(null, null, 'club', null);
        expect(result).toEqual({ source: '', location: null });
    });


    it('should return location from cache if found', async () => {
        const latLong = { lat: 1, lng: 1 };
        mockFindInGoogleSearchCache.mockResolvedValue(latLong);

        const result = await findAddressLocation('area', 'town', 'club', null);

        expect(result).toEqual({ source: 'googleCache', location: latLong });
        expect(mockFindInGoogleSearchCache).toHaveBeenCalledWith('area, town', 'club');
        expect(mockGoogleLocationSearch).not.toHaveBeenCalled();
    });

    it('should search google if not found in cache and save result to cache', async () => {
        const latLong = { lat: 1, lng: 1 };
        mockFindInGoogleSearchCache.mockResolvedValue(null);
        mockGoogleLocationSearch.mockResolvedValue(latLong);


        const result = await findAddressLocation('area', 'town', 'club', null);

        expect(result).toEqual({ source: 'google', location: latLong });
        expect(mockFindInGoogleSearchCache).toHaveBeenCalledWith('area, town', 'club');
        expect(mockGoogleLocationSearch).toHaveBeenCalledWith('area, town', null);
        expect(mockSaveInGoogleSearchCache).toHaveBeenCalledWith('area, town', 'club', latLong);
    });


    it('should search google if not found in cache and return null if google search fails', async () => {
        mockFindInGoogleSearchCache.mockResolvedValue(null);
        mockGoogleLocationSearch.mockResolvedValue(null);

        const result = await findAddressLocation('area', 'town', 'club', null);

        expect(result).toEqual({ source: '', location: null });
        expect(mockFindInGoogleSearchCache).toHaveBeenCalledWith('area, town', 'club');
        expect(mockGoogleLocationSearch).toHaveBeenCalledWith('area, town', null);
        expect(mockSaveInGoogleSearchCache).not.toHaveBeenCalled();

    });

    it('should filter out invalid locations', async () => {
        const result = await findAddressLocation('tBc', 'OnLine', 'club', null);
        expect(result).toEqual({ source: '', location: null });
    });



});


describe('makeAddress', () => {
    it('should return combined address if area and town specified', () => {
        expect(makeAddress('area', 'town')).toEqual('area, town');
    });

    it('should return area if town not specified', () => {
        expect(makeAddress('area', null)).toEqual('area');
    });

    it('should return town if area not specified', () => {
        expect(makeAddress(null, 'town')).toEqual('town');
    });

    it('should return empty string if area and town not specified', () => {
        expect(makeAddress(null, null)).toEqual('');
    });

    it('should return empty string if area is invalid', () => {
        expect(makeAddress('tba', 'town')).toEqual('town');
    });


    it('should return empty string if town is invalid', () => {
        expect(makeAddress('area', 'online')).toEqual('area');
    });

    it('should return empty string if area and town are invalid', () => {
        expect(makeAddress('tbc', 'online')).toEqual('');
    });

});
Rate this answer: 
Context Sources (14)
