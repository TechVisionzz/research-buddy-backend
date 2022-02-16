'use strict';

/**
 *  reference controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::reference.reference', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }
    //create tags
    let tags = [];
    if (ctx.request.body.data.tags) {
      for (const item of ctx.request.body.data.tags) {
        let tag = {
          data: {
            name: item
          }
        }
        var tagResponse = await strapi.service('api::tag.tag').create(tag);
        if (tagResponse) {
          tags.push(tagResponse.id);
        }
      }
    }
    //create editor
    let editors = [];
    if (ctx.request.body.data.editors) {
      for (const item of ctx.request.body.data.editors) {
        let editor = {
          data: {
            name: item
          }
        }
        const editorResponse = await strapi.service('api::editor.editor').create(editor);
        if (editorResponse) {
          editors.push(editorResponse.id);
        }

      };
    }
    //create author
    let authors = [];
    if (ctx.request.body.data.authors) {
      for (const item of ctx.request.body.data.authors) {
        let author = {
          data: {
            name: item
          }
        }
        const authorResponse = await strapi.service('api::author.author').create(author);
        if (authorResponse.id) {
          authors.push(authorResponse.id);
        }
      };
    }
    //assign values to ctx body
    ctx.request.body.data.tags = tags;
    ctx.request.body.data.authors = authors;
    ctx.request.body.data.editors = editors;
    ctx.request.body.data.ownerId = ctx.state.user.id;
    // create reference data
    const response = await super.create(ctx);
    return response;
  },
  async update(ctx) {
    ctx.query = { populate: "*" }
    const { data, meta } = await super.findOne(ctx);
    // console.log(JSON.stringify(data));
    //delete editors if present
    if (data.attributes.editors.data) {
      for (const item of data.attributes.editors.data) {
        var Response = await strapi.service('api::editor.editor').delete(item.id);
      }
    }
    //delete author if present
    if (data.attributes.authors.data) {
      for (const item of data.attributes.authors.data) {
        var Response = await strapi.service('api::author.author').delete(item.id);
      }
    }
    //delete tag if present
    if (data.attributes.tags.data) {
      for (const item of data.attributes.tags.data) {
        var Response = await strapi.service('api::tag.tag').delete(item.id);
      }
    }
    //now create new tags editors and author if available
    //create tags
    let tags = [];
    if (ctx.request.body.data.tags) {
      for (const item of ctx.request.body.data.tags) {
        let tag = {
          data: {
            name: item
          }
        }
        var tagResponse = await strapi.service('api::tag.tag').create(tag);
        if (tagResponse) {
          tags.push(tagResponse.id);
        }
      }
    }
    //create editor
    let editors = [];
    if (ctx.request.body.data.editors) {
      for (const item of ctx.request.body.data.editors) {
        let editor = {
          data: {
            name: item
          }
        }
        const editorResponse = await strapi.service('api::editor.editor').create(editor);
        if (editorResponse) {
          editors.push(editorResponse.id);
        }

      };
    }
    //create author
    let authors = [];
    if (ctx.request.body.data.authors) {
      for (const item of ctx.request.body.data.authors) {
        let author = {
          data: {
            name: item
          }
        }
        const authorResponse = await strapi.service('api::author.author').create(author);
        if (authorResponse.id) {
          authors.push(authorResponse.id);
        }
      };
    }
    //assign values to ctx body
    ctx.request.body.data.tags = tags;
    ctx.request.body.data.authors = authors;
    ctx.request.body.data.editors = editors;
    ctx.request.body.data.ownerId = ctx.state.user.id;
    // some logic here
    const response = await super.update(ctx);
    // some more logic

    return response;
  }
}));
