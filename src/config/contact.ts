// Single source of truth for Texnoid's contact details. Change the number here only.
// Assumes an Indian mobile number (+91); change COUNTRY_CODE if that is wrong.
const COUNTRY_CODE = '91';
const LOCAL_NUMBER = '8341814583';

export const PHONE_TEL = `+${COUNTRY_CODE}${LOCAL_NUMBER}`; // for tel: links
export const WHATSAPP_NUMBER = `${COUNTRY_CODE}${LOCAL_NUMBER}`; // for wa.me links
export const PHONE_DISPLAY = `+${COUNTRY_CODE} ${LOCAL_NUMBER.slice(0, 5)} ${LOCAL_NUMBER.slice(5)}`;
