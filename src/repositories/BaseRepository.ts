import {
  Repository,
  FindOptionsWhere,
  ObjectLiteral,
  DataSource,
  FindOneOptions,
  DeepPartial,
  FindManyOptions,
} from "typeorm";

export class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;
  protected dataSource: DataSource;

  constructor(entity: { new (): T }, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entity);
    this.dataSource = dataSource;
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data as DeepPartial<T>);
    return this.repository.save(entity);
  }

  async bathCreate(data: Partial<T[]>): Promise<void> {
    const entity = this.repository.create(data as DeepPartial<T[]>);
    await this.repository.save(entity);
  }

  async basicFindOneByConditions(
    conditions: FindOptionsWhere<T>
  ): Promise<T | null> {
    return this.repository.findOne({
      where: conditions,
    } as FindOneOptions<T>);
  }

  async basicFindManyByConditions(
    conditions: FindOptionsWhere<T>
  ): Promise<T[] | []> {
    return this.repository.find({
      where: conditions,
    } as FindOneOptions<T>);
  }

  async findOneByConditions(
    conditions: FindOptionsWhere<T>,
    order: "DESC" | "ASC" = "DESC",
    orderBy: keyof T
  ): Promise<T | null> {
    return this.repository.findOne({
      where: conditions,
      order: { [orderBy as string]: order },
    } as FindOneOptions<T>);
  }

  async findAll(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async countAll(): Promise<number> {
    return this.repository.count();
  }

  async findInChunks(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async updateOne(where: Partial<T>, updates: Partial<T>): Promise<void> {
    await this.repository.update(where, updates);
  }

  async deleteByCondition(conditions: FindOptionsWhere<T>): Promise<void> {
    await this.repository.delete(conditions);
  }

  async save(data: Partial<T>): Promise<T> {
    return this.repository.save(data as DeepPartial<T>);
  }

  getRepo(): Repository<T> {
    return this.repository;
  }

  async findManyAndRelations(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOneAndRelations(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }
}
