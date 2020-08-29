class Repository {
  constructor(model) {
    this.model = model;
    this.add = this.add.bind(this);
    this.find = this.find.bind(this);
    this.removeById = this.removeById.bind(this);
    this.updateById = this.updateById.bind(this);
  }

  async add(object) {
    return await this.model.create(object);
  }

  async find(filter, refs = []) {
    const query = refs.reduce(
      (m, ref) => m.populate(ref),
      this.model.find(filter)
    );
    const products = await query.exec();
    return products;
  }

  async removeById(id) {
    return await this.model.findOneAndDelete(id).exec();
  }

  async updateById(id, update) {
    return this.model.findByIdAndUpdate(id, update).exec();
  }
}

module.exports = Repository;
