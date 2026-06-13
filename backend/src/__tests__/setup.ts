import { beforeAll } from "vitest";

beforeAll(() => {
  // Setup environment variables yang dibutuhkan saat testing
  process.env.ACCESS_TOKEN_SECRET = "test_access_secret_key_for_testing";
  process.env.REFRESH_TOKEN_SECRET = "test_refresh_secret_key_for_testing";
  process.env.NODE_ENV = "test";
});
