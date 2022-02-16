'use strict';

/**
 *  collection controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::collection.collection', ({ strapi }) => ({
  async create(ctx) {
    //check user is loged in
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }
    // assign userid
    ctx.request.body.data.ownerId = ctx.state.user.id;
    const response = await super.create(ctx);
    return response;
  }
  ,
  async find(ctx) {
    console.log(ctx);
    // some logic here
    const { data, meta } = await super.find(ctx);
    // some more logic
    return { data, meta };
  }
}));

