const equityService = require('../services/equityService');

class EquityController {
  async createEquity(req, res) {
    try {
      const equity = await equityService.createEquity({
        ...req.body,
        createdBy: req.user._id
      });

      res.status(201).json({
        status: 'success',
        data: {
          equity
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async getAllEquities(req, res) {
    try {
      const equities = await equityService.getAllEquities();
      res.status(200).json({
        status: 'success',
        results: equities.length,
        data: {
          equities
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async getEquity(req, res) {
    try {
      const equity = await equityService.getEquityById(req.params.id);
      if (!equity) {
        return res.status(404).json({
          status: 'fail',
          message: 'No equity found with that ID'
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          equity
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async updateEquity(req, res) {
    try {
      const equity = await equityService.updateEquity(req.params.id, req.body);
      if (!equity) {
        return res.status(404).json({
          status: 'fail',
          message: 'No equity found with that ID'
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          equity
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async deleteEquity(req, res) {
    try {
      const equity = await equityService.deleteEquity(req.params.id);
      if (!equity) {
        return res.status(404).json({
          status: 'fail',
          message: 'No equity found with that ID'
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Equity successfully marked as deleted'
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

module.exports = new EquityController(); 