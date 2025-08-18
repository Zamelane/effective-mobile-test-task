import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/context";

export default function Layout() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to={'/app/user/' + user.id} replace />
  }

  return(
    <Outlet/>
  )
}