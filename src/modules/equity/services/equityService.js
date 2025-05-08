const mongoose = require('mongoose');
const equitySchema = require('../schemas/equitySchema');

const Equity = mongoose.model('Equity', equitySchema);

class EquityService {
  async createEquity(data) {
    return await Equity.create(data);
  }

  async getAllEquities() {
    return await Equity.find();
  }

  async getEquityById(id) {
    return await Equity.findById(id);
  }

  async updateEquity(id, data) {
    return await Equity.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
  }

  async deleteEquity(id) {
    return await Equity.findByIdAndDelete(id);
  }
}

module.exports = new EquityService(); 