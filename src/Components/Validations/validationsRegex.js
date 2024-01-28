
export const rname = new RegExp('^[A-Z]{1}[a-z]+$')
export const remail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
export const rpassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')
export const rusername = new RegExp('^[a-z]{3,}[0-9]{1,}$')
export const rtel = new RegExp('^[0]{1}[6]{1}[0-9]{8,}$')
export const rworkingtime = new RegExp('[0-9]{2}-[0-9]{2}h$');
export const raccnumber = new RegExp('^[0-9]{3}-[0-9]{13}-[0-9]{2}$');
export const rpib = new RegExp('^[0-9]{6}$')
