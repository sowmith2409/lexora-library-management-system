import { useEffect, useState } from "react";

import { RotateCcw, AlertTriangle } from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function ReturnsPage() {
  // STATES

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH BORROW RECORDS

  async function fetchRecords() {
    try {
      const response = await api.get("/borrow");

      // ONLY APPROVED / BORROWED

      const activeBorrows = response.data.filter(
        (record) => record.status === "Approved",
      );

      setRecords(activeBorrows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // PAGE LOAD

  useEffect(() => {
    fetchRecords();
  }, []);

  // RETURN BOOK

  async function handleReturnBook(borrowId) {
    try {
      await api.put(`/borrow/${borrowId}/return`);

      alert("Book returned successfully");

      fetchRecords();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to return book");
    }
  }

  // CHECK OVERDUE

  function isOverdue(dueDate) {
    if (!dueDate) {
      return false;
    }

    return new Date(dueDate) < new Date();
  }

  return (
    <MainLayout>
      {/* HEADER */}

      <div
        className="
          mb-10
        "
      >
        <h1
          className="
            text-3xl
            font-serif
            font-bold
            text-slate-900
            mb-3
          "
        >
          Returns
        </h1>

        <p
          className="
            text-gray-500
            text-20px
          "
        >
          Process borrowed books and overdue returns.
        </p>
      </div>

      {/* TABLE */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-3xl
          overflow-hidden
        "
      >
        {/* HEADER */}

        <div
          className="
            grid
            grid-cols-[2fr_2fr_1.5fr_1.2fr_1fr]
            px-8
            py-5
            bg-gray-50
            text-sm
            font-medium
            text-gray-500
          "
        >
          <div>User</div>

          <div>Book</div>

          <div>Due Date</div>

          <div>Status</div>

          <div>Action</div>
        </div>

        {/* BODY */}

        {loading ? (
          <div
            className="
                p-10
                text-center
                text-gray-500
              "
          >
            Loading returns...
          </div>
        ) : (
          records.map((record) => {
            const overdue = isOverdue(record.due_date);

            return (
              <div
                key={record.id}
                className="
                      grid
                      grid-cols-[2fr_2fr_1.5fr_1.2fr_1fr]
                      items-center
                      px-8
                      py-6
                      border-t
                      border-gray-100
                      hover:bg-gray-50
                      transition
                    "
              >
                {/* USER */}

                <div>
                  <h3
                    className="
                          text-[18px]
                          font-semibold
                          text-slate-900
                        "
                  >
                    {record.user_name}
                  </h3>
                </div>

                {/* BOOK */}

                <div>
                  <h3
                    className="
                          text-[18px]
                          font-semibold
                          text-slate-900
                        "
                  >
                    {record.book_title}
                  </h3>
                </div>

                {/* DUE DATE */}

                <div
                  className="
                        text-gray-600
                      "
                >
                  {record.due_date}
                </div>

                {/* STATUS */}

                <div>
                  <span
                    className={`
                          px-3
                          py-1.5
                          rounded-lg
                          text-sm
                          font-medium

                          ${
                            overdue
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                  >
                    {overdue ? "Overdue" : "Borrowed"}
                  </span>
                </div>

                {/* ACTION */}

                <div>
                  <button
                    onClick={() => handleReturnBook(record.id)}
                    className="
                          flex
                          items-center
                          gap-2
                          bg-slate-900
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          hover:bg-slate-800
                          transition
                        "
                  >
                    <RotateCcw size={16} />
                    Return
                  </button>
                </div>

                {/* OVERDUE ALERT */}

                {overdue && (
                  <div
                    className="
                            col-span-5
                            mt-4
                            flex
                            items-center
                            gap-2
                            text-red-600
                            text-sm
                          "
                  >
                    <AlertTriangle size={16} />
                    This book is overdue and may incur fines.
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </MainLayout>
  );
}

export default ReturnsPage;
