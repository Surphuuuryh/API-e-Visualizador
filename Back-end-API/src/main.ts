import { getStatus } from "./rotas/status";

let USERS: { id: number; name: string }[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
];

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
  "Access-Control-Allow-Headers": "Content-Type",
};

const server = Bun.serve({
  port: 4343,
  routes: {
    "/api/status": {
      GET: getStatus,
    },
    "/api/users": {
      // Adicionado para responder ao preflight do navegador
      OPTIONS: async () => {
        return new Response(null, {
          status: 204,
          headers: CORS_HEADERS,
        });
      },

      GET: async () => {
        return new Response(JSON.stringify(USERS), {
          headers: {
            "Content-Type": "application/json",
            ...CORS_HEADERS,
          },
        });
      },

      DELETE: async (request) => {
        const url = new URL(request.url);
        const idParam = url.searchParams.get("id")!;
        const id = parseInt(idParam);
        const deletedUser = USERS.filter((u) => u.id === id);

        if (deletedUser.length === 0) {
          return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              ...CORS_HEADERS,
            },
          });
        }

        USERS = USERS.filter((u) => u.id !== id);

        return new Response(
          JSON.stringify({ message: "User deleted", user: deletedUser[0] }),
          {
            headers: {
              "Content-Type": "application/json",
              ...CORS_HEADERS,
            },
          },
        );
      },

      PATCH: async (request: Request) => {
        const url = new URL(request.url);
        const idParam = url.searchParams.get("id")!;
        const id = parseInt(idParam);
        const filteredUser = USERS.filter((u) => u.id === id);
        const newNameParam = url.searchParams.get("newName")!;
        const newName = newNameParam;

        if (filteredUser.length === 0) {
          return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              ...CORS_HEADERS,
            },
          });
        }

        USERS = USERS.map((u) => {
          if (u.id === id) {
            return { ...u, name: newName };
          }
          return u;
        });

        return new Response(
          JSON.stringify({ message: "User patched", user: filteredUser }),
          {
            headers: {
              "Content-Type": "application/json",
              ...CORS_HEADERS,
            },
          },
        );
      },

      PUT: async (request: Request) => {
        const url = new URL(request.url);
        const nameParam = url.searchParams.get("name")!;
        const name = nameParam;

        let highestId = Math.max(...USERS.map((u) => u.id));

        highestId++;

        let idToPush: string = String(highestId);

        USERS.push({
          id: parseInt(idToPush),
          name: name,
        });

        const filteredUser = USERS.filter((u) => u.id === highestId);

        return new Response(
          JSON.stringify({ message: "User patched", user: filteredUser }),
          {
            headers: {
              "Content-Type": "application/json",
              ...CORS_HEADERS,
            },
          },
        );
      },
    },
  },
});

console.log(`Server running at http://localhost:${server.port}`);