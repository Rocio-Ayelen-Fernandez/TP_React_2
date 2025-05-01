const Section = ({ title, items, CardComponent }) => (
    <div >
      <h2 className="my-8 mx-4 sm:text-lg md:text-xl lg:text-2xl">{title}</h2>
      <div className="grid mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-12">
        {items.map((item, index) => (
          <CardComponent key={index} {...item} />
        ))}
      </div>
    </div>
  );
  export default Section;
  