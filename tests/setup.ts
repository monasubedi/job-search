import "@testing-library/jest-dom/vitest";
import { afterAll, beforeAll, beforeEach } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

vi.mock("@tanstack/react-query", async () => {
  const actualModule = await vi.importActual("@tanstack/react-query");
  return {
    ...actualModule,
    useMutation: vi.fn(),
  };
});
