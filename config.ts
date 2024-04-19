export const environments: Record<string, string> = {
  LOG_LEVEL : "debug",
  DB_NAME : "test",
  JADA_TEST_SECRET: process.env.JADA_TEST_SECRET
}
export const parameters: Record<string, string> = {
  TEST_Parameter: "test.com",
}