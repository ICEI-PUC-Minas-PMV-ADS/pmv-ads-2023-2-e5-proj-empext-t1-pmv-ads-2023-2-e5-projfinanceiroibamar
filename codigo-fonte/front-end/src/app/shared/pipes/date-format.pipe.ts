import { Pipe, PipeTransform } from "@angular/core";
import { DateUtil } from "src/app/utilities/date.utility";

@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform{

    transform(value: any, ...args: string[]) {
        return DateUtil.Format(value, args[0]);
    }

}