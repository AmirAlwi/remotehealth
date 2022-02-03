import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityFunctionService {

  constructor() { }

  /**
   * 
   * @param input date in string var
   * @returns return date(string) in format can parse into date
   */
  toDate(input: string){
    const year = input.slice(0,4);
    const month = input.slice(4,6);
    const day = input.slice(6,8);
    const date = month + " " + day + " " + year;
    
    return date
  }

  /**
   * 
   * @param input Date and Time string
   * @returns LongDate format string
   */
  toDateTime(input : string){
    const year = input.slice(4,8);
    const month = input.slice(2,4);
    const day = input.slice(0,2);
    const hour = input.slice(9,11);
    const minute = input.slice(11,13);
    const longDate = month + " " + day + " " + year + " " + hour + ":"+ minute;

    return longDate;
  }

  getTimeInterval(interval : any ){

    interval = interval/1000;
  
    const numb = new Array<number>(interval);
    let stringNumb : string[] = new Array(numb.length);
    let j = 0;

    for(let i = 0;i<=interval;i++){ 
      // if(i % 60 !=0){
        j++
        numb[i]=  + j; 
        stringNumb[i] = numb[i].toString();

        stringNumb[i] = ('0000'+ stringNumb[i]).slice(-4)

      // } else{
      //   numb[i]= time + ((i/60)*100);
      //   stringNumb[i] = numb[i].toString();

      //   stringNumb[i] = ('0000'+ stringNumb[i]).slice(-4)

      //   refTime = time + (i/60)*100;
      //   j = 0;
      // }
    }
    return stringNumb 
  }  
}
