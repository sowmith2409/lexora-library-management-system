import { useEffect, useState } from "react";

import { HandCoins, CheckCircle2, AlertTriangle } from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function MyFinesPage() {
  // USER

  const user = JSON.parse(localStorage.getItem("user"));

  // STATES

  const [fines, setFines] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH FINES

  async function fetchFines() {
    try {
      const response = await api.get("/fines");

      // ONLY CURRENT USER

      const myFines = response.data.filter((fine) => fine.user_id === user.id);

      setFines(myFines);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // PAGE LOAD

  useEffect(() => {
    fetchFines();
  }, []);

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
          My Fines
        </h1>

        <p
          className="
            text-gray-500
            text-20px
          "
        >
          View your overdue penalties and payment status.
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
            grid-cols-[2fr_1fr_1fr_1fr]
            px-8
            py-5
            bg-gray-50
            text-sm
            font-medium
            text-gray-500
          "
        >
          <div>Book</div>

          <div>Fine Amount</div>

          <div>Status</div>

          <div>Payment</div>
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
            Loading fines...
          </div>
        ) : (
          fines.map((fine) => (
            <div
              key={fine.id}
              className="
                    grid
                    grid-cols-[2fr_1fr_1fr_1fr]
                    items-center
                    px-8
                    py-6
                    border-t
                    border-gray-100
                    hover:bg-gray-50
                    transition
                  "
            >
              {/* BOOK */}

              <div>
                <h3
                  className="
                        text-[18px]
                        font-semibold
                        text-slate-900
                      "
                >
                  {fine.book_title}
                </h3>
              </div>

              {/* AMOUNT */}

              <div
                className="
                      text-red-600
                      font-semibold
                      text-lg
                    "
              >
                ₹{fine.amount}
              </div>

              {/* STATUS */}

              <div>
                <span
                  className={`
                        flex
                        items-center
                        gap-2
                        w-fit
                        px-3
                        py-1.5
                        rounded-lg
                        text-sm
                        font-medium

                        ${
                          fine.paid_status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                >
                  {fine.paid_status ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertTriangle size={16} />
                  )}

                  {fine.paid_status ? "Paid" : "Pending"}
                </span>
              </div>

              {/* PAYMENT */}

              <div>
                {fine.paid_status ? (
                  <div
                    className="
                            flex
                            items-center
                            gap-2
                            text-green-600
                            font-medium
                          "
                  >
                    <CheckCircle2 size={18} />
                    Completed
                  </div>
                ) : (
                  <button
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
                    <HandCoins size={16} />
                    Pay Fine
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default MyFinesPage;
