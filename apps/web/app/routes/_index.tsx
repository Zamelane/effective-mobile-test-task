import { Button } from "~/components/ui/button";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login page" }
  ]
}

export default function Component({}: Route.ComponentProps) {
  return (
    <div className="">
      Index
      <Button>Login</Button>
    </div>
  )
}