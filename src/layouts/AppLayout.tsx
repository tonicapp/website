import { PropsWithChildren } from "react"
import { AppShell } from "@mantine/core"
import AppHeader from "src/components/headers/AppHeader"
import { Web3Provider } from "src/providers/Web3Provider"
import MainFooter from "src/components/footers/MainFooter"

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Web3Provider>
      <AppShell header={<AppHeader />} footer={<MainFooter />}>
        <div className="mt-20 mb-40 mx-10">
          { children }
        </div>
      </AppShell>
    </Web3Provider>
  )
}