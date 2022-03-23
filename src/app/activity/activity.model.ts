import { GeoPoint } from "firebase/firestore";

export interface activity{
    id?: string;
    title? : string;
    note? : string;
    time? : time;
    sensor? : number[];
    sensordata? : sensordata;
    distance? : number;
}

export interface time{
    starttime? : string;
    endtime?: string;
}

export interface sensordata{
    heartrate? : number[];
    temperature? : number[];
    oximeter?: number[];
    bloodpressure? : bloodpressure;
    position? : GeoPoint
    acceleration? : threedimentionalvalue;
    gyro? : threedimentionalvalue;
    orientation? : threedimentionalvalue;
    magnet? : threedimentionalvalue;
}

export interface threedimentionalvalue {
    x: number[];
    y: number[];
    z: number[];
}

export interface bloodpressure{
    upper? : number;
    lower? : number;
}
