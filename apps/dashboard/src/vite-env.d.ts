/// <reference types="vite/client" />

/* eslint-disable ts/naming-convention */
interface ImportMetaEnv {
  readonly VITE_CLERK_PK: string
}
/* eslint-enable ts/naming-convention */

interface ImportMeta {
  readonly env: ImportMetaEnv
}
