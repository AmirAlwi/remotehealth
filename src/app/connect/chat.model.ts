export interface chatCredential{
    owner?: string;
    connStatus?: boolean;
    createdAt?: number;
    reqTitle?: string;
    tag? : string
    msg? : message[];
    members?: string[];
    id?: string;
}

export interface postQ{
    owner?: string;
    connStatus?: boolean;
    createdAt?: number;
    reqTitle?: string;
    tag? : string;
    msg? : message[];
    members?: string[];
}


export interface Tag {
    value? : string; 
    viewValue? : string;
  }

  export interface message{
      uid? : string,
      content? : string,
      createdAt? : number
  }