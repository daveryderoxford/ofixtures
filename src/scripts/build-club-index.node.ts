/** Node script to build the index of club */
import {Inject, NgModule} from "@angular/core";



/*Declare golbal providers for services we use.
* This will allow angular injector to create instances of child componnets as required
*/

@NgModule( {
    imports: [],
    providers: []
})

/**
 * @Inject uses angular injection system to inject an instance of eventAdmin into the function.
 */
function buildClub( @Inject(EventAdminService) eventAdmin) {



}
