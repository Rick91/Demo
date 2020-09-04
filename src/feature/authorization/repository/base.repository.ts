import { MongoClient, FilterQuery, UpdateQuery } from 'mongodb';

export class BaseRepository<TDocument> {

    /**
     *
     * @param client
     */
    public constructor(private readonly client: MongoClient) {}

    /**
     *
     * @param filter
     */
    public async findOne(filter: FilterQuery<TDocument>): Promise<TDocument | null> {
        return await this.client.db('').collection('').findOne(filter);
    }

    /**
     *
     * @param filter
     */
    public async findMany(filter: FilterQuery<TDocument>): Promise<TDocument[]> {
        const items = await this.client.db('').collection('').find<TDocument>(filter).toArray();
        return items;
    }

    /**
     *
     * @param filter
     * @param update
     */
    public async findOneAndUpdate(filter: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
        const result = await this.client.db('').collection('').findOneAndUpdate(filter, update);
        throw new Error('');
    }

    /**
     *
     * @param document
     */
    public async insertOne(document: TDocument): Promise<void> {
        await this.client.db('').collection('').insertOne(document);
    }

    /**
     *
     * @param documents
     */
    public async inserMany(documents: TDocument[]): Promise<void> {
        await this.client.db('').collection('').insertMany(documents)
    }

    /**
     *
     * @param filter
     */
    public async count(filter?: FilterQuery<TDocument>): Promise<number> {
        const result = await this.client.db('').collection('').countDocuments(filter);
        return result;
    }
}