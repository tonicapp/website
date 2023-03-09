import { AppShell } from "@mantine/core";
import { PropsWithChildren } from "react";
import MainFooter from "src/components/footers/MainFooter";
import MainHeader from "src/components/headers/MainHeader";

export default function LandingLayout(props: PropsWithChildren) {
  return (
    <AppShell header={<MainHeader />} footer={<MainFooter />} fixed={false}>
      <div className="space-y-32 mt-20 mb-40">
        { props.children }
      </div>
    </AppShell>
  )
}