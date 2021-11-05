export interface Roles {
    patient ? : boolean;
    physician ? : boolean;
    admin ? : boolean;
}

export interface User{
    uid? : string;
    email? :string;
    roles? :Roles;
    fName? : string;
    lName? : string;
    birthdate? : number;
    gender? : string;
    weight? : number;
    height?: number;
}
