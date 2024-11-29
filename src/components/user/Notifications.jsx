import React from "react";

const Notifications = ({ companies }) => {
  // Filter companies with overdue and due-today communications
  const overdueCompanies = companies.filter((company) => company.overdue);
  const dueTodayCompanies = companies.filter((company) => company.dueToday);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-4">Notifications</h3>

      {/* Overdue Communications */}
      <div className="mb-6">
        <h4 className="text-md font-bold text-red-500 mb-2">
          Overdue Communications
        </h4>
        {overdueCompanies.length > 0 ? (
          <ul className="space-y-2">
            {overdueCompanies.map((company) => (
              <li key={company.id} className="p-4 bg-red-100 rounded shadow">
                <p className="font-bold">{company.name}</p>
                <p className="text-sm text-gray-600">
                  Next Communication: {company.nextCommunication.type} -{" "}
                  {new Date(company.nextCommunication.date).toDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No overdue communications.</p>
        )}
      </div>

      {/* Today’s Communications */}
      <div>
        <h4 className="text-md font-bold text-yellow-500 mb-2">
          Today’s Communications
        </h4>
        {dueTodayCompanies.length > 0 ? (
          <ul className="space-y-2">
            {dueTodayCompanies.map((company) => (
              <li key={company.id} className="p-4 bg-yellow-100 rounded shadow">
                <p className="font-bold">{company.name}</p>
                <p className="text-sm text-gray-600">
                  Next Communication: {company.nextCommunication.type} -{" "}
                  {new Date(company.nextCommunication.date).toDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No communications due today.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
