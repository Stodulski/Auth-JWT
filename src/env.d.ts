declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number
    DB_URI: string
    SECRET: string
  }
}
