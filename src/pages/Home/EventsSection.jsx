const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Food Drive: Help us Fight Hunger!",
      date: "May 20, 2024",
      location: "City Park",
      description:
        "Join us in our fight against hunger by participating in our annual food drive. Together, we can make a difference in our community!",
    },
    {
      id: 2,
      title: "Cooking Workshop: Learn to Cook Healthy Meals",
      date: "June 5, 2024",
      location: "Community Center",
      description:
        "Join our cooking workshop to learn how to prepare delicious and nutritious meals on a budget. Perfect for beginners!",
    },
    {
      id: 3,
      title: "Fundraising Gala: A Night to Remember",
      date: "July 15, 2024",
      location: "Grand Ballroom, Downtown Hotel",
      description:
        "Support our cause by attending our fundraising gala. Enjoy an evening of fine dining, entertainment, and charity auctions.",
    },
  ];

  return (
    <section className="bg-[#FFCCBC] py-12">
      <div className="container mx-auto">
  <h2 className="text-3xl font-semibold text-center mb-8">
    Upcoming Events
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {events.map((event) => (
      <div key={event.id} className="p-6 bg-[#F8F8FF] shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">
          <strong>Date:</strong> {event.date}
          <br />
          <strong>Location:</strong> {event.location}
        </p>
        <p className="text-gray-600">{event.description}</p>
        <div className="mt-4">
          <span className="inline-block bg-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold mr-2">
            Free Admission
          </span>
          <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
            RSVP Required
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
    </section>
  );
};

export default EventsSection;
