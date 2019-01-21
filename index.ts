import * as Hapi from "hapi";
import * as Joi from "joi";
import * as Sequelize from "sequelize";

const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const server = new Hapi.Server();
const port = process.env.PORT || 3000;
server.connection({ port });

(async () => {
  if (!process.env.POSTGRES_HOST) {
    throw Error(
      "process.env.POSTGRES_HOST must be a: user:pass@ipService:port ",
    );
  }
  const sequelize = new Sequelize(
    `postgres://${process.env.POSTGRES_HOST}/heroes`,
  );
  await sequelize.authenticate();
  console.log("postgres is running");

  const Hero = sequelize.define("hero", {
    name: Sequelize.STRING,
    power: Sequelize.STRING,
  });

  await Hero.sync({ force: true });

  await server.register([
    Inert,
    Vision,
    {
      register: HapiSwagger,
      options: {
        info: {
          title: "Node.js with Postgres Example - Erick Wendel",
          version: "1.0",
        },
      },
    },
  ]);

  server.route([
    {
      method: "GET",
      path: "/heroes",
      config: {
        handler: (req: any, reply: any) => {
          return reply(Hero.findAll());
        },
        description: "List All heroes",
        notes: "heroes from database",
        tags: ["api"],
      },
    },
    {
      method: "POST",
      path: "/heroes",
      config: {
        handler: (req, reply) => {
          const { payload } = req;
          return reply(Hero.create(payload));
        },
        description: "Create a hero",
        notes: "create a hero",
        tags: ["api"],
        validate: {
          payload: {
            name: Joi.string().required(),
            power: Joi.string().required(),
          },
        },
      },
    },

    {
      method: "DELETE",
      path: "/heroes/{id}",
      config: {
        handler: (req, reply) => {
          return reply(Hero.destroy({ where: { id: req.params.id } }));
        },
        description: "Delete a hero",
        notes: "Delete a hero",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
        },
      },
    },
  ]);

  await server.start();
  console.log("server running at", server.info.port);
})();
