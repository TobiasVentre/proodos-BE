import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { NotFoundError } from "../../Errors/NotFoundError";

export const ensureTipoComponenteExists = async (
  tipoComponenteRepository: ITipoComponenteRepository,
  id_tipo_componente: number
) => {
  const exists = await tipoComponenteRepository.exists(id_tipo_componente);
  if (!exists) {
    throw new NotFoundError("Tipo componente not found");
  }
};
