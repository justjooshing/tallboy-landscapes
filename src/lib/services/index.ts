import client from "../contentful";
import { mockServices } from "./mocks";
import { ServiceResolved } from "./types";

export async function getServices(): Promise<ServiceResolved[]> {
  try {
    const entries = await client.getEntries({
      content_type: "service",
    });

    const services = entries.items.length ? entries.items : mockServices;
    return services as unknown as ServiceResolved[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return mockServices;
  }
}
