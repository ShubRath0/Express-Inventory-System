export default {
  api: {
    input: "http://localhost:8080/v3/api-docs",
    output: {
      target: "./src/api/__generated__/types.ts",
      client: "react-query",
      httpClient: "axios",
      mode: "tags-split",
      unwrapResponseData: true,
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        mutator: {
          path: "./src/lib/axios.ts",
          name: "axiosInstance",
        },
      },
    },
  },
};