import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$productId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$productId/"!</div>
}
