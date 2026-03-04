"use client"

import { PropsWithChildren } from "react"

import ProviderForm from "@/context/form"
import HeaderStepper from "@/components/header-stepper"
import FooterButtons from "@/components/footer-buttons"

//useFormContext

export default ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full min-h-dvh flex flex-col gap-3 items-center py-4 px-4 md:px-6 lg:px-8">
      <HeaderStepper />
      <section className="w-full container max-w-230">
        <ProviderForm
          children={
            <>
              {children}
              <FooterButtons />
            </>
          }
        />
      </section>
    </main>
  )
}
