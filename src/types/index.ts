export const enum ENamePath {
  SENDER = "/",
  RECIPIENT = "/recipient",
  SUBMIT = "/submit",
}

export interface IPropsStep {
  title: string
  description: string
  pathname: ENamePath
}

export const NumberPath = {
  0: ENamePath.SENDER,
  1: ENamePath.RECIPIENT,
  2: ENamePath.SUBMIT,
}

export const IndexPath = {
  [ENamePath.SENDER]: 0,
  [ENamePath.RECIPIENT]: 1,
  [ENamePath.SUBMIT]: 2,
}

export enum ETypeCargo {
  DOCUMENTS = "documents",
  FRAGILE = "fragile",
  ORDINARY = "ordinary",
}

export const valuesCargo = Object.values(ETypeCargo) as ETypeCargo[]
