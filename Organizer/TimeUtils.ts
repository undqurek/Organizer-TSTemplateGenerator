import { StringUtils } from "./StringUtils";

/**
 * Created by qurek on 25.01.2019.
 */
export class TimeUtils
{
    // public methods

    public static getTime() : string
    {
        let date = new Date();

        let year = StringUtils.createL4String( date.getFullYear() );
        let month = StringUtils.createL2String( date.getMonth() );
        let day = StringUtils.createL2String( date.getDate() );

        let hour = StringUtils.createL2String( date.getHours() );
        let minute = StringUtils.createL2String( date.getMinutes() );
        let second = StringUtils.createL2String( date.getSeconds() );
        
        let millisecond = StringUtils.createL4String( date.getMilliseconds() );

        let a = year + '.' + month + '.' + day;
        let b = hour + ':' + minute + ':' + second + '.' + millisecond;

        return a + ' ' + b;
    }
}