import type { Route } from "./+types/app.user.$id.edit";

export default function Component({ params }: Route.ComponentProps) {
  return (
    <div className="">
      User edit: {params.id}
    </div>
  )
}