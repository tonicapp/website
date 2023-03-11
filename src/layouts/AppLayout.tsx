import { PropsWithChildren } from "react"
import { AppShell } from "@mantine/core"
import AppHeader from "src/components/headers/AppHeader"
import { Web3Provider } from "src/providers/Web3Provider"

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Web3Provider>
      <AppShell header={<AppHeader />}>
        { children }
      </AppShell>
    </Web3Provider>
  )
}