export interface Roles {
    patient ? : boolean;
    physician ? : boolean;
    admin ? : boolean;
}

export interface User{
    uid : string;
    email :string;
    roles :Roles;
}