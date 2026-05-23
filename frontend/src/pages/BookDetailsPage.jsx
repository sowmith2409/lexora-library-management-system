import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { BookOpen, Calendar, Hash, User } from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function BookDetailsPage() {
  // PARAMS

  const { id } = useParams();

  // STATES

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  // USER

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH BOOK

  async function fetchBook() {
    try {
      const response = await api.get(`/books/${id}`);

      setBook(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // BORROW BOOK

  async function handleBorrowBook() {
    try {
      await api.post("/borrow", {
        user_id: user.id,

        book_id: book.id,
      });

      alert("Borrow request sent successfully");

      fetchBook();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to borrow book");
    }
  }

  // PAGE LOAD

  useEffect(() => {
    fetchBook();
  }, []);

  // LOADING

  if (loading) {
    return (
      <MainLayout>
        <div
          className="
            text-center
            py-20
            text-gray-500
          "
        >
          Loading book...
        </div>
      </MainLayout>
    );
  }

  // NO BOOK

  if (!book) {
    return (
      <MainLayout>
        <div
          className="
            text-center
            py-20
            text-red-500
          "
        >
          Book not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[420px_1fr]
          gap-10
        "
      >
        {/* LEFT */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            h-[650px]
            flex
            flex-col
            items-center
            justify-center
            px-10
            text-center
          "
        >
          <BookOpen
            size={90}
            className="
              text-slate-300
              mb-10
            "
          />

          <h1
            className="
              text-5xl
              font-serif
              font-bold
              text-slate-900
              leading-tight
              mb-6
            "
          >
            {book.title}
          </h1>

          <p
            className="
              text-xl
              text-gray-500
            "
          >
            by {book.author}
          </p>
        </div>

        {/* RIGHT */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-10
          "
        >
          {/* TITLE */}

          <div
            className="
              mb-10
            "
          >
            <span
              className="
                bg-gray-100
                text-gray-700
                px-4
                py-2
                rounded-xl
                text-sm
              "
            >
              {book.category || "General"}
            </span>
          </div>

          {/* INFO */}

          <div
            className="
              space-y-7
            "
          >
            {/* AUTHOR */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <User
                size={22}
                className="
                  text-slate-400
                "
              />

              <div>
                <p
                  className="
                    text-sm
                    text-gray-400
                    mb-1
                  "
                >
                  Author
                </p>

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-slate-900
                  "
                >
                  {book.author}
                </h3>
              </div>
            </div>

            {/* ISBN */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <Hash
                size={22}
                className="
                  text-slate-400
                "
              />

              <div>
                <p
                  className="
                    text-sm
                    text-gray-400
                    mb-1
                  "
                >
                  ISBN
                </p>

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-slate-900
                  "
                >
                  {book.isbn}
                </h3>
              </div>
            </div>

            {/* STOCK */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <Calendar
                size={22}
                className="
                  text-slate-400
                "
              />

              <div>
                <p
                  className="
                    text-sm
                    text-gray-400
                    mb-1
                  "
                >
                  Availability
                </p>

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-slate-900
                  "
                >
                  {book.available_stock} of {book.total_stock} copies available
                </h3>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div
            className="
              mt-14
            "
          >
            <h2
              className="
                text-2xl
                font-semibold
                text-slate-900
                mb-5
              "
            >
              Description
            </h2>

            <p
              className="
                text-gray-600
                leading-8
                text-[17px]
              "
            >
              This book is part of our curated library collection. Explore
              knowledge, ideas, and stories through thoughtfully selected titles
              available in the Athenaeum library system.
            </p>
          </div>

          {/* BUTTON */}

          {user.role === "member" && (
            <button
              onClick={handleBorrowBook}
              disabled={book.available_stock <= 0}
              className={`
                  mt-12
                  px-8
                  py-4
                  rounded-2xl
                  text-white
                  text-lg
                  transition

                  ${
                    book.available_stock > 0
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "bg-gray-300 cursor-not-allowed"
                  }
                `}
            >
              {book.available_stock > 0 ? "Request to Borrow" : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default BookDetailsPage;
