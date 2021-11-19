export interface chatCredential{
    owner?: string;
    connStatus?: boolean;
    createdAt?: number;
    reqTitle?: string;
    members?: string[];
    id?: string;
}

export interface postQ{
    subject? : string;
    tag? : string;
    msg? : string[];
    owner?: string;
    connStatus?: boolean;
    createdAt?: number;
    reqTitle?: string;
    members?: string[];
    id?: string;
}


export interface Tag {
    value: string; 
    viewValue: string;
  }