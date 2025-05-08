const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const equitySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    trim: true,
    default: () => `EQ-${uuidv4()}`
  },
  symbol: {
    type: String,
    unique: true,
    trim: true
  },
  equity_type: {
    type: String,
    required: [true, 'Equity type is required'],
    trim: true
    // required: [true, 'Equity type is required'],
    // enum: ['Preferred', 'Common'],
    // default: 'Preferred'
  },
  class_name: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
  valuation_pre_money: {
    type: Number,
    required: [true, 'Pre-money valuation is required']
  },
  conversion_rate: {
    type: Number,
    required: [true, 'Conversion rate is required'],
    default: 1
  },
  liquidity_preference: {
    type: Boolean,
    default: true
  },
  seniority: {
    type: String,
    required: [true, 'Seniority is required'],
    enum: ['Senior', 'Junior'],
    default: 'Senior'
  },
  liquidation_multiplier: {
    type: Number,
    required: [true, 'Liquidation multiplier is required'],
    default: 1.0
  },
  rights_to_participation: {
    type: Boolean,
    default: false
  },
  participation_cap: {
    type: Number,
    default: 3.0
  },
  dividends: {
    type: Boolean,
    default: true
  },
  dividend_percent: {
    type: Number,
    default: 8
  },
  dividend_frequency: {
    type: String,
    enum: ['Annually', 'Semi-Annually', 'Quarterly', 'Monthly'],
    default: 'Annually'
  },
  compounding: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add pre-save middleware to generate unique symbol
equitySchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  try {
    // Get the first 3 letters of equity_type and convert to uppercase
    const prefix = this.equity_type.substring(0, 3).toUpperCase();
    // Generate a random 4-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    // Create the symbol
    this.symbol = `${prefix}-${randomNum}`;
    
    // Check if symbol already exists
    const existingEquity = await this.constructor.findOne({ symbol: this.symbol });
    if (existingEquity) {
      // If symbol exists, try again with a new number
      return this.save();
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = equitySchema; 