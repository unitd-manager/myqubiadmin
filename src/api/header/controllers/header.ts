import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::header.header', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        logo: true,
        powered_by_logo: true,
        nav_links: true,
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));