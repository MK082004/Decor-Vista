import * as moment from "moment";
import { config } from "process";

class DateTimeConfig{
  static timeZone: string = 'en-GB';
  static dateFormat: string = 'DD/MM/YYYY';
  static dateTimeFormat: string = 'DD/MM/YYYY HH:mm:ss A';
};
export class DateTimeHelper {
  /**
   * This function is used to add a timezone offset, which is necessary as angular is passing a datetime to C# that minuses this offset
   * @param date
   * @returns
   */

  static getTimeZoneOffset(date: Date): Date {
    if (!date) return null;
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  }

  //converts  "28/6/2022" to 28 Jun 22
  static convertToNewDate(dateTime: string): string {
    let parts = dateTime.split("/");
    let dateLastPart = parts[2].slice(-2);
    var mydateStringConvert = parts[2] + "/" + parts[1] + "/" + parts[0];
    const month = new Date(mydateStringConvert).toLocaleString("default", {
      month: "short",
    });
    var alterFormat = parts[0] + " " + month + " " + dateLastPart;
    return alterFormat;
  }
  /**
   * this will return date
   * @param date this will pass date
   * @returns
   */
  // This format is for reporting
  static dateFormatWithMonthName(date: string): string {
    return moment(date).format("D-MMM-yyyy");
  }
  //converts Fri Aug 05 2022 09:31:54 GMT+0500 (Pakistan Standard Time) to  05/08/2022 09:31:54 AM
  static toString(date): string{
    return moment(date).format(DateTimeConfig.dateTimeFormat);
  }
  //converts Fri Aug 05 2022 09:31:54 GMT+0500 (Pakistan Standard Time) to  05/08/2022
  static getDatePart(date: Date | string): string{
    return moment(date).format(DateTimeConfig.dateFormat);
  }
  /**
   * Used for converting a string in any format to Date
   * @param inputString the string to convert
   * @param dateTimeFormat the format of the input string for eg('dd/mm/yy', 'mm/yy/dd', 'yyyy-mm-dd')
   * @returns Date
   */
  //converts 05/08/2022 09:31:54 AM to Fri Aug 05 2022 09:31:54 GMT+0500 (Pakistan Standard Time)
  static getDateFromString(inputString: string, dateTimeFormat: string = DateTimeConfig.dateTimeFormat): Date{
    return moment(inputString, DateTimeConfig.dateTimeFormat).toDate();
  }
  //converts 09:31:54 GMT+0500 (Pakistan Standard Time) to 09:31:54 AM
  static getTimePart(date: Date): string {
    return moment(date).format("LT");
  }
}
