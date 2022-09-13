'use strict';

/**
 *  saved-quote controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::saved-quote.saved-quote', ({strapi}) => ({

  async create(ctx, next) {
    const {id, username} = ctx.state.user;
    const entry = await strapi.db.query('api::saved-quote.saved-quote').create({
      data: {
        uid: `${ctx.request.body.data.uid}:${id}:${username}`,
        user_id: id
      }
    });

    const sanitizedEntity = await this.sanitizeOutput(entry, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async findUserSavedQuotes(ctx, next) {
    //find all saved quotes where uid contains the current user id
    const {id} = ctx.state.user;
    const quotes = await strapi.db.query('api::saved-quote.saved-quote').findMany({
      where: {
        user_id: id,
      },
    })

    const sanitizedEntity = await this.sanitizeOutput(quotes, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  findByUid: async (ctx, next) => {
    const {uid} = ctx.request.params
    const {id, username} = ctx.state.user;

    const uidToFind = `${uid}:${id}:${username}}`
    const entity = await strapi.db.query('api::saved-quote.saved-quote').findOne({
      where: {
        uid: uidToFind,
      }
    });

    // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return {data: entity}
  },

  deleteByUid: async (ctx, next) => {
    const {uid} = ctx.request.params
    const {id, username} = ctx.state.user;

    const uidToDelete = `${uid}:${id}:${username}}`

    const entity = await strapi.db.query('api::saved-quote.saved-quote').delete({
      where: {uid: uidToDelete, user_id: id}
    });

    return {
      data: entity,
    }
  },

  deleteAll: async (ctx, next) => {
    const {id} = ctx.state.user

    const entity = await strapi.db.query('api::saved-quote.saved-quote').deleteMany({
      where: {
        user_id: id
      },
    });

    return {
      data: entity,
    }
  }
}));
