export interface ProductRepository {
  get(criteriaId: string, criteriaType: string): Promise<any>;
}
