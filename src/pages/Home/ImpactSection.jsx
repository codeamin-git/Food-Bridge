

const ImpactSection = () => {
    return (
        <section className="py-12 bg-[#E6E6FA]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-2">Our Impact</h2>
            <p className="text-center mb-8">Nourishing Communities, Transforming Lives</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Impact Card 1 */}
              <div className="p-6 border-black border rounded-xl bg-[#D8BFD8]">
                <h3 className="text-xl font-semibold mb-4">Meals Served</h3>
                <p className="text-gray-600">In the past year, we've served over 100,000 nutritious meals to those in need, ensuring no one goes hungry.</p>
              </div>
              {/* Impact Card 2 */}
              <div className="p-6 border-black border rounded-xl bg-[#D8BFD8]">
                <h3 className="text-xl font-semibold mb-4">Families Supported</h3>
                <p className="text-gray-600">With the help of our community, we've supported over 10,000 families by providing them with essential food supplies and resources.</p>
              </div>
              {/* Impact Card 3 */}
              <div className="p-6 border-black border rounded-xl bg-[#D8BFD8]">
                <h3 className="text-xl font-semibold mb-4">Communities Reached</h3>
                <p className="text-gray-600">Our outreach efforts have touched the lives of people in various communities, spanning across cities, towns, and rural areas.</p>
              </div>
            </div>
          </div>
        </section>
      );
};

export default ImpactSection;