import { AppShell } from "@mantine/core"
import AppHeader from "src/components/headers/AppHeader"

export default function MainApp() {
  return(
    <AppShell header={<AppHeader />}>
    </AppShell>
  )
}