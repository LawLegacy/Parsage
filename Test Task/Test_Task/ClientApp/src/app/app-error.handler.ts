import { Injectable, ErrorHandler } from '@angular/core';


@Injectable()
export class AppErrorHandler extends ErrorHandler {

    constructor() {
        super();
    }

    handleError(error: any) {

        if (confirm('An unresolved error has occured. ' + error.message)) {
            window.location.reload();
        }

        super.handleError(error);
    }
}
