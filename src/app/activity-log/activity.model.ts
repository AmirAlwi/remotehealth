export interface activity{
    title? : string;
    date? : number;
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
    accelerometer? : threedimentionalvalue;
    gyroscope? : threedimentionalvalue;
}

export interface threedimentionalvalue {
    x: number[];
    y: number[];
    z: number[];
}

export interface bloodpressure{
    upper? : number[];
    lower? : number[];
}
