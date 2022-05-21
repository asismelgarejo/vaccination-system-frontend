export interface ICitizen {
  dni: string;
  names: string;
  fr_lastname: string;
  mr_lastname: string;
  birthday: string;
  gender: "M" | "F";
}

interface IEntityBase {
  id?: string;
  name: string;
}

interface IDose extends IEntityBase {}
interface IVC extends IEntityBase {}
interface IRiskFactor extends IEntityBase {}
export interface IVaccineModel {
  id: string;
  citizen: ICitizen;
  dose: IDose;
  ref_cel_number: string;
  fc_dosis: string;
  vc: IVC;
  riskFactors: IRiskFactor[];
}

interface IVaccine {
  id: string;
  fc_dosis: string;
  dose: IDose;
  vc: IVC;
}

export interface ICitizenModel {
  names: string;
  fr_lastname: string;
  mr_lastname: string;
  birthday: string;
  gender: "M" | "F";
  address: string;
  dni: string;
  id: string;
  vaccines: IVaccine[];
}

export interface IMeModel {
  id: string;
  email: string;
  citizen: {
    names: string;
    fr_lastname: string;
    mr_lastname: string;
    dni: string;
  };
}
