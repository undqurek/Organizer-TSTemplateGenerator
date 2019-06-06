/**
 * Created by qurek on 04.02.2017.
 */

export class StringUtils
{
    // public methods

    /**
     * Tworzy string uzupelniany lewo-stronnie zerami do dlugosci 2 dla numeru.
     *
     * @param number
     *        [wymagany] numer dla ktorego tworzony jest string
     * @returns string utworzony z numeru
     */
    public static createL2String( number : number ) : string
    {
        return ( number > 9 ? number.toString() : '0' + number );
    }

    /**
     * Tworzy string uzupelniany lewo-stronnie zerami do dlugosci 4 dla numeru.
     *
     * @param number
     *        [wymagany] numer dla ktorego tworzony jest string
     * @returns string utworzony z numeru
     */
    public static createL4String( number : number ) : string
    {
        if ( number > 9 )
        {
            if ( number > 99 )
            {
                if ( number > 999 )
                    return number.toString();

                return '0' + number;
            }

            return '00' + number;
        }

        return '000' + number;
    }
}
