import HeaderFilter from "@/components/header-filter"
import OrderList from "@/components/order-list"

export default () => {
  return (
    <main className="w-full min-h-dvh flex flex-col gap-3 items-center py-4 px-4 md:px-6 lg:px-8">
      <HeaderFilter />
      <section className="w-full container max-w-230">
        <OrderList />
      </section>
    </main>
  )
}
