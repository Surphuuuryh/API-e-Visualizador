import index from "../public/index.html";

const PORT = Number(process.env.PORT) || 3000;

const server = Bun.serve({
  port: PORT,
  routes: {
    "/": index,
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`Aula de DOM → http://localhost:${server.port}`);
