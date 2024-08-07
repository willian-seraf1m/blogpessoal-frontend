import CardPost from "./CardPost"

function CardList() {
  return (
    <section className="max-w-[1000px] mx-auto py-8 px-8">
      <h1 className="text-[48px] font-semibold mb-8">Postagens</h1>

      <div className="flex gap-3 flex-wrap">
        <CardPost />
        <CardPost />
        <CardPost />
      </div>

    </section>
  )
}

export default CardList