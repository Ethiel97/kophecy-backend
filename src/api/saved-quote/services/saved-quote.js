'use strict';

/**
 * saved-quote service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::saved-quote.saved-quote');
