export type ContratoMinimoElementoFieldType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array";

export type ContratoMinimoElemento = {
  required?: string[];
  fields?: Record<
    string,
    {
      type: ContratoMinimoElementoFieldType;
      nullable?: boolean;
    }
  >;
};
