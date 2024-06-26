import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8000/api/graphql',
  documents: 'http/graphql/**/*.ts',
  generates: {
    'http/graphql/codegen/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
