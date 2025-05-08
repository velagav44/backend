const express = require('express');
const router = express.Router();
const equityController = require('../controllers/equityController');
const { protect, restrictTo } = require('../../../middleware/authMiddleware');

/**
 * @route   POST /api/equity
 * @desc    Create a new equity entry
 * @access  Private (Admin only)
 * @body    {Object} equityData - Equity details
 */
router.post('/', protect, restrictTo('admin'), equityController.createEquity);

/**
 * @route   GET /api/equity
 * @desc    Get all equity entries
 * @access  Private (Authenticated users)
 * @query   {Number} page - Page number for pagination (optional)
 * @query   {Number} limit - Number of items per page (optional)
 */
router.get('/', protect, equityController.getAllEquities);

/**
 * @route   GET /api/equity/:id
 * @desc    Get a single equity entry by ID
 * @access  Private (Authenticated users)
 * @param   {String} id - Equity ID
 */
router.get('/:id', protect, equityController.getEquity);

/**
 * @route   PATCH /api/equity/:id
 * @desc    Update an existing equity entry
 * @access  Private (Admin only)
 * @param   {String} id - Equity ID
 * @body    {Object} updateData - Fields to update
 */
router.patch('/:id', protect, restrictTo('admin'), equityController.updateEquity);

/**
 * @route   DELETE /api/equity/:id
 * @desc    Delete an equity entry
 * @access  Private (Admin only)
 * @param   {String} id - Equity ID
 */
router.delete('/:id', protect, restrictTo('admin'), equityController.deleteEquity);

module.exports = router; 