import type { Route } from "./+types/user.$id._index";

export default function Component({ params }: Route.ComponentProps) {
  return (
    <div className="">
      User view {params.id}
    </div>
  )
}