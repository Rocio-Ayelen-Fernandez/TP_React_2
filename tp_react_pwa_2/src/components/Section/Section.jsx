const Section = ({ title, items, CardComponent }) => (
  <div>
    <h2 className="mt-8 mx-2 text-center xl:text-start sm:text-2xl md:text-2xl lg:text-4xl mb-12 font-semibold">
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-20 place-items-center lg:place-items-start">
      {items.map((item, index) => (
        <CardComponent key={index} {...item} />
      ))}
    </div>
  </div>
);

export default Section;
