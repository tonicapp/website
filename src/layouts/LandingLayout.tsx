import { AppShell } from "@mantine/core";
import { PropsWithChildren } from "react";
import MainHeader from "src/components/headers/MainHeader";

export default function LandingLayout(props: PropsWithChildren) {
  return (
    <AppShell header={<MainHeader />} className="mt-5">
      <div className="space-y-32">
        { props.children }
      </div>
    </AppShell>
  )
}