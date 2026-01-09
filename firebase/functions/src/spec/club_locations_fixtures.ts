import { Fixture } from "../model/fixture.js";

export const testFixtures: Fixture[] = [
   {
      id: "BOF-72446",
      date: "2019-03-24T00:00:00.000Z",
      name: "Test 1 SROC - Realistic lat long",
      grade: "National",
      clubURL: "http://www.sroc.org",
      club: "SROC",
      association: "NWOA",
      latLong: { lat: 54.2, lng: -2.9 },  // SD393805
      postcode: "LA11 6HL",
      area: "Hampsfell",
      nearestTown: "Grange over Sands",
      type: "Foot",
      locSource: 'postcode'
   },
   {
      id: "BOF-72447",
      date: "2019-03-24T00:00:00.000Z",
      name: "Test 2 SROC - Realistic lat long",
      grade: "National",
      clubURL: "http://www.sroc.org",
      club: "SROC",
      association: "NWOA",
      latLong: { lat: 54.3, lng: -2.8 },  // SD393805
      postcode: "LA11 6HL",
      area: "Hampsfell",
      nearestTown: "Grange over Sands",
      type: "Foot",
      locSource: 'postcode'
   },
   {
      id: "BOF-72448",
      date: "2019-03-24T00:00:00.000Z",
      name: "Test 3 SROC - Realistic lat long",
      grade: "National",
      clubURL: "http://www.sroc.org",
      club: "SROC",
      association: "NWOA",
      latLong: { lat: 54.4, lng: -2.7 },  // SD393805
      postcode: "LA11 6HL",
      area: "Hampsfell",
      nearestTown: "Grange over Sands",
      type: "Foot",
      locSource: 'gridref'
   },
   {
      id: "BOF-72448",
      date: "2019-03-24T00:00:00.000Z",
      name: "Test 3 SROC - Realistic lat long",
      grade: "National",
      clubURL: "http://www.sroc.org",
      club: "SROC",
      association: "NWOA",
      latLong: { lat: 54.4, lng: -2.7 },  // SD393805
      postcode: "LA11 6HL",
      area: "Hampsfell",
      nearestTown: "Grange over Sands",
      type: "Foot",
      locSource: 'google'
   },
   {
      id: "BOF-72450",
      date: "2019-03-24T00:00:00.000Z",
      name: "DEE test event",
      grade: "National",
      clubURL: "http://www.sroc.org",
      club: "DEE",
      association: "NWOA",
      latLong: { lat: 99.9, lng: -2 },  
      postcode: "LA11 6HL",
      area: "dee area",
      nearestTown: "dee town",
      type: "Foot",
      locSource: 'gridref'
   },
   {
      id: "76012",
      date: "2019-03-28T00:00:00.000Z",
      name: "No location",
      grade: "Club",
      clubURL: "http://www.wcoc.co.uk",
      club: "NoLocation",
      association: "NWOA",
      area: "",
      nearestTown: "Whitehaven",
      postcode: "",
      latLong: null,
      type: "Foot",
      locSource: ''
   },
   {
      id: "activity-26377",
      date: "2019-03-30T00:00:00.000Z",
      name: "SN Single event with google loc source",
      grade: "Local",
      clubURL: "http://www.quantockorienteers.co.uk",
      club: "SN",
      association: "SWOA",
      postcode: "TA1 2RH",
      latLong: { lat: 51.010333, lng: -3.073797 },
      area: "Blackbrook and Holway",
      nearestTown: "Taunton",
      type: "Foot",
      locSource: 'google'
   }
];

