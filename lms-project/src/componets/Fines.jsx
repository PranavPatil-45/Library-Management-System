import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoans } from "../slices/loansSlice";
import { fetchMembers } from "../slices/membersSlice";
import { fetchBooks } from "../slices/bookSlice";
import { DollarSign, AlertTriangle } from "lucide-react";

const FineReport = () => {
  const dispatch = useDispatch();
  const { loans } = useSelector((s) => s.loans);
  const { members } = useSelector((s) => s.members);
  const { books } = useSelector((s) => s.books);
  const { fines } = useSelector((s) => s.fines); // already added


  useEffect(() => {
    if (!loans?.length) dispatch(fetchLoans());
    if (!members?.length) dispatch(fetchMembers());
    if (!books?.length) dispatch(fetchBooks());
  }, [dispatch]);

  // === Fine calculation ===
  const calculateFine = (loan) => {
    const today = new Date();
    const due = new Date(loan.dueDate);
    let fine = 0;

    // Overdue fine
    if (!loan.returnDate) {
      const diffDays = Math.floor((today - due) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        fine += diffDays * 20; // ₹20/day late
      }
    } else {
      const returned = new Date(loan.returnDate);
      const diffDays = Math.floor((returned - due) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        fine += diffDays * 20;
      }
    }

    // Damage fine
    if (loan.isDamaged) {
      fine += 50; // ₹50 for damage
    }

    return fine;
  };

  // === Group fines by member ===
  const memberFines = members.map((m) => {
    const userLoans = loans.filter((l) => String(l.memberId) === String(m.id));
    const fines = userLoans.map((loan) => ({
      ...loan,
      fine: calculateFine(loan),
    }));


    const totalFine = fines.reduce((sum, f) => sum + f.fine, 0);
    return { ...m, fines, totalFine };

  });

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <DollarSign className="text-indigo-600" /> Fine Report
      </h2>

      {memberFines.map((mf) => (
        <div
          key={mf.id}
          className="bg-white shadow rounded-xl p-6 space-y-4 border"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {mf.firstName} {mf.lastName || mf.name}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                mf.totalFine > 0
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              Total Fine: ₹{mf.totalFine}
            </span>
          </div>

          {mf.fines.length === 0 ? (
            <p className="text-gray-500 text-sm">No borrowing history.</p>
          ) : (
            <table className="w-full text-sm border mt-2">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="p-2 border">Book</th>
                  <th className="p-2 border">ISBN</th>
                  <th className="p-2 border">Borrowed</th>
                  <th className="p-2 border">Due</th>
                  <th className="p-2 border">Returned</th>
                  <th className="p-2 border">Fine</th>
                </tr>
              </thead>
              <tbody>
                {mf.fines.map((loan) => {
                  const book = books.find((b) => String(b.id) === String(loan.bookId));
                  return (
                    <tr key={loan.id} className="text-center">
                      <td className="p-2 border">{book?.title || "Unknown"}</td>
                      <td className="p-2 border text-indigo-600">{loan.bookIsbn}</td>
                      <td className="p-2 border">{loan.startDate}</td>
                      <td className="p-2 border">{loan.dueDate}</td>
                      <td className="p-2 border">{loan.returnDate || "Not Returned"}</td>
                      <td
                        className={`p-2 border font-medium ${
                          loan.fine > 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        ₹{loan.fine}
                        {loan.isDamaged && (
                          <span className="ml-1 inline-flex items-center text-xs text-red-500">
                            <AlertTriangle size={12} /> Damage
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default FineReport;
