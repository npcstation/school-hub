import { MongoClient } from 'mongodb';

let url, options, dbname;

class db {
	async insert(model, data: [any] | object) {
		let insertMore = false;
		if (Array.isArray(data)) {
			insertMore = true;
		}
		const client = new MongoClient(url);
		const database = client.db(dbname);
		const coll = database.collection(model);
		insertMore ? await coll.insertMany(data as [any]) : await coll.insertOne(data);
		client.close();
	}

	async getone(model, query, options) {
		const client = new MongoClient(url);
		const database = client.db(dbname);
		const coll = database.collection(model);
		return await coll.findOne(query, options)
	}

	async getall(model, query, options) {
		const client = new MongoClient(url);
		const database = client.db(dbname);
		const coll = database.collection(model);
		return await coll.find(query, options);
	}
}

export async function apply() {
	url = global.Project.config.mongo;
	dbname = global.Project.config.mongon || 'bx';
	options = global.Project.config.mongoconfig || {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};
}