import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  route("users/:id", "routes/user-detail.tsx")
] satisfies RouteConfig;
