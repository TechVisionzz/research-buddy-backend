module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6671f581bc1c836fd2b2f5287f56dba8'),
  },
});
