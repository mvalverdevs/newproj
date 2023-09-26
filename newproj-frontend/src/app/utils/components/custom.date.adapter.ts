import {Injectable} from "@angular/core";
import {NgxMatNativeDateAdapter} from "@angular-material-components/datetime-picker";

@Injectable()
export class CustomDateAdapter extends NgxMatNativeDateAdapter {
    getFirstDayOfWeek(): number {
        return 1;
    }
}