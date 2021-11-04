export interface Roles {
    patient ? : boolean;
    physician ? : boolean;
    admin ? : boolean;
}

export interface User{
    uid : string;
    email :string;
    roles :Roles;
    displayName ? : string;
}

export interface completeUser{
    uid : string;
    email :string;
    roles :Roles;
    displayName ? : string;
    fName? : string;
    lName? : string;
    birthdate? : string;
    gender? : string;
    weight : number;
    height : number;

}