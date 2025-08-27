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

  getRepo(): Repository<T> {
    return this.repository;
  }

  async findManyAndRelations(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOneAndRelations(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async getPagedData(
    baseQuery: string,
    countQuery: string,
    limit: number,
    page: number
  ) {
    const data = await this.repository.query(
      `${baseQuery} LIMIT $1 OFFSET $2`,
      [page, limit]
    );

    const countRes = await this.repository.query(countQuery);
    const total = parseInt(countRes[0]?.count ?? 0);

    return {
      data,
      total,
      perPage: page,
      page_count: Math.ceil(total / page),
    };
  }
}
