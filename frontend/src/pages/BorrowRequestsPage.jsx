import { useEffect, useState } from "react";

import { Check, X, Clock3 } from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function BorrowRequestsPage() {
  // STATES

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH REQUESTS

  async function fetchRequests() {
    try {
      const response = await api.get("/borrow");

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // PAGE LOAD

  useEffect(() => {
    fetchRequests();
  }, []);

  // APPROVE REQUEST

  async function handleApprove(requestId) {
    try {
      await api.put(`/borrow/${requestId}/approve`);

      fetchRequests();
    } catch (error) {
      console.log(error);

      alert("Failed to approve request");
    }
  }

  // REJECT REQUEST

  async function handleReject(requestId) {
    try {
      await api.put(`/borrow/${requestId}/reject`);

      fetchRequests();
    } catch (error) {
      console.log(error);

      alert("Failed to reject request");
    }
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
          Borrow Requests
        </h1>

        <p
          className="
            text-gray-500
            text-20px
          "
        >
          Manage member borrow requests.
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
            grid-cols-[2fr_2fr_1.5fr_1fr_1.5fr]
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

          <div>Request Date</div>

          <div>Status</div>

          <div>Actions</div>
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
            Loading requests...
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="
                    grid
                    grid-cols-[2fr_2fr_1.5fr_1fr_1.5fr]
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
                  {request.user_name}
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
                  {request.book_title}
                </h3>
              </div>

              {/* DATE */}

              <div
                className="
                      text-gray-600
                    "
              >
                {request.borrow_date}
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
                      request.status === "Approved"

                        ? "bg-green-100 text-green-700"

                        : request.status === "Rejected"

                        ? "bg-red-100 text-red-700"

                        : request.status === "Overdue"

                        ? "bg-orange-100 text-orange-700"

                        : request.status === "Returned"

                        ? "bg-blue-100 text-blue-700"

                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {request.status || "Pending"}

                </span>

              </div>

              {/* ACTIONS */}

              <div
                className="
                      flex
                      items-center
                      gap-4
                    "
              >
                {/* APPROVE */}

                <button
                  onClick={() => handleApprove(request.id)}
                  className="
                        w-10
                        h-10
                        rounded-xl
                        bg-green-100
                        text-green-700
                        flex
                        items-center
                        justify-center
                        hover:bg-green-200
                        transition
                      "
                >
                  <Check size={18} />
                </button>

                {/* REJECT */}

                <button
                  onClick={() => handleReject(request.id)}
                  className="
                        w-10
                        h-10
                        rounded-xl
                        bg-red-100
                        text-red-700
                        flex
                        items-center
                        justify-center
                        hover:bg-red-200
                        transition
                      "
                >
                  <X size={18} />
                </button>

                {/* PENDING */}

                <div
                  className="
                        w-10
                        h-10
                        rounded-xl
                        bg-yellow-100
                        text-yellow-700
                        flex
                        items-center
                        justify-center
                      "
                >
                  <Clock3 size={18} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default BorrowRequestsPage;
