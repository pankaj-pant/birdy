import PouchDB from 'pouchdb'

export default class DB {
  constructor(name){
    this.db = new PouchDB(name)
  }

  async getObservation(id){
    let observation = await this.db.get(id, { include_docs: true, attachments: true })
    return observation
  }

  async getAllObservations() {
    let allObservations = await this.db.allDocs({ include_docs: true, attachments: true })
    let observations = {}

    allObservations.rows.forEach(o => observations[o.id] = o.doc)

    return observations
  }

  async createObservation(observation) {
    const res = await this.db.post({ ...observation })
    return res
  }



}