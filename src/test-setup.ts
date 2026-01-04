
import { getTestBed } from '@angular/core/testing';
import {
   BrowserTestingModule,
   platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { NgModule, provideZonelessChangeDetection } from '@angular/core';

@NgModule({
   providers: [provideZonelessChangeDetection()]
})
export class ZonelessTestModule { }

getTestBed().initTestEnvironment(
   [BrowserTestingModule, ZonelessTestModule],
   platformBrowserTesting(), {
   teardown: { destroyAfterEach: false }
}
);
