import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "qj4a8id6",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});