import { describe, it, expect, vi, beforeEach } from 'vitest';
import { findAddressLocation, makeAddress } from '../fixtures/address_search.js';
import { googleLocationSearch } from '../fixtures/google_search.js';
import { findInGoogleSearchCache, saveInGoogleSearchCache } from '../fixtures/google_search_cache.js';

vi.mock('../fixtures/google_search.js');
vi.mock('../fixtures/google_search_cache.js');

describe('findAddressLocation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return null if no area and town specified', async () => {
        const result = await findAddressLocation(null, null, 'club', null);
        expect(result).toEqual({ source: '', location: null });
    });

    it('should return location from cache if found', async () => {
        const latLong = { lat: 1, lng: 1 };
        vi.mocked(findInGoogleSearchCache).mockResolvedValue(latLong);
        
        const result = await findAddressLocation('area', 'town', 'club', null);
        expect(result).toEqual({ source: 'googleCache', location: latLong });
        expect(findInGoogleSearchCache).toHaveBeenCalledWith('area, town', 'club');
        expect(googleLocationSearch).not.toHaveBeenCalled();
    });

    it('should search google if not found in cache and save result to cache', async () => {
        const latLong = { lat: 1, lng: 1 };
        vi.mocked(findInGoogleSearchCache).mockResolvedValue(null);
        vi.mocked(googleLocationSearch).mockResolvedValue(latLong);
        const result = await findAddressLocation('area', 'town', 'club', null);
        expect(result).toEqual({ source: 'google', location: latLong });
        expect(findInGoogleSearchCache).toHaveBeenCalledWith('area, town', 'club');
        expect(googleLocationSearch).toHaveBeenCalledWith('area, town', null);
        expect(saveInGoogleSearchCache).toHaveBeenCalledWith('area, town', 'club', latLong);
    });

    it('should search google if not found in cache and return null if google search fails', async () => {
        vi.mocked(findInGoogleSearchCache).mockResolvedValue(null);
        vi.mocked(googleLocationSearch).mockResolvedValue(null);
        const result = await findAddressLocation('area', 'town', 'club', null);
        expect(result).toEqual({ source: '', location: null });
        expect(findInGoogleSearchCache).toHaveBeenCalledWith('area, town', 'club');
        expect(googleLocationSearch).toHaveBeenCalledWith('area, town', null);
        expect(saveInGoogleSearchCache).not.toHaveBeenCalled();
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