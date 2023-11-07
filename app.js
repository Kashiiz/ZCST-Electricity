const fastify = require("fastify")({ logger: true });
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
if(!config.AuthServer.studentId || !config.AuthServer.password) throw new Error("在config.json填入正确的学生信息,studentId为你的学号,password没改过的话就是你的身份证后6位")
const routes = require("./routes/index");
routes.forEach((route) => {
  fastify.route({
    ...route,
  });
});

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {

    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

  
    
    

start();
