export interface ISelectGeneric {
  id: string;
  name: string;
  code: string;
}

export type TAutorization = {
  isAutorized: boolean;
};

export interface IDataStats {
  women: {
    minors: number;
    adults: number;
  };
  men: {
    minors: number;
    adults: number;
  };
}
