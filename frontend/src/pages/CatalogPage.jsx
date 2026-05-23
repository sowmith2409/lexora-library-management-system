import { useEffect, useState } from "react";

import { Search, ChevronDown, BookOpen } from "lucide-react";

import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function CatalogPage() {
  // STATES

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  // FETCH BOOKS

  async function fetchBooks() {
    try {
      const response = await api.get("/books");

      setBooks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // PAGE LOAD

  useEffect(() => {
    fetchBooks();
  }, []);

  // UNIQUE CATEGORIES

  const categories = ["All", ...new Set(books.map((book) => book.category))];

  // FILTER BOOKS

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchText.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          mb-10
        "
      >
        {/* LEFT */}

        <div>
          <h1
            className="
              text-3xl
              font-serif
              font-bold
              text-slate-900
              leading-none
              mb-3
            "
          >
            Catalog
          </h1>

          <p
            className="
              text-gray-500
              text-20px
            "
          >
            Browse our collection of curated texts.
          </p>
        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          {/* SEARCH */}

          <div
            className="
              flex
              items-center
              gap-3
              bg-white
              border
              border-gray-200
              rounded-2xl
              px-4
              h-[54px]
              w-[320px]
            "
          >
            <Search
              size={18}
              className="
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search title, author, ISBN..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="
                w-full
                outline-none
                bg-transparent
                text-sm
                text-gray-700
                placeholder:text-gray-400
              "
            />
          </div>

          {/* CATEGORY */}

          <div
            className="
              relative
            "
          >
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="
                appearance-none
                bg-white
                border
                border-gray-200
                rounded-2xl
                px-5
                pr-12
                h-[54px]
                text-sm
                text-slate-700
                outline-none
                cursor-pointer
              "
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
              "
            />
          </div>
        </div>
      </div>

      {/* BOOK GRID */}

      {loading ? (
        <div
          className="
              text-center
              py-20
              text-gray-500
            "
        >
          Loading books...
        </div>
      ) : (
        <div
          className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-8
            "
        >
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="
                      bg-white
                      rounded-3xl
                      overflow-hidden
                      border
                      border-gray-200
                      hover:shadow-lg
                      transition
                    "
            >
              {/* TOP */}

              <div
                className="
                        h-[320px]
                        bg-slate-100
                        flex
                        flex-col
                        items-center
                        justify-center
                        px-8
                        text-center
                      "
              >
                <BookOpen
                  size={70}
                  className="
                          text-slate-300
                          mb-8
                        "
                />

                <h2
                  className="
                          text-[20px]
                          font-serif
                          font-bold
                          text-slate-900
                          leading-tight
                        "
                >
                  {book.title}
                </h2>
              </div>

              {/* BOTTOM */}

              <div
                className="
                        p-6
                      "
              >
                {/* AUTHOR */}

                <p
                  className="
                          text-gray-500
                          text-[15px]
                          mb-6
                        "
                >
                  by {book.author}
                </p>

                {/* FOOTER */}

                <div
                  className="
                          flex
                          items-center
                          justify-between
                        "
                >
                  {/* CATEGORY */}

                  <span
                    className="
                            bg-gray-100
                            text-gray-700
                            px-3
                            py-1.5
                            rounded-lg
                            text-sm
                          "
                  >
                    {book.category || "General"}
                  </span>

                  {/* STOCK */}

                  <span
                    className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1.5
                            rounded-lg
                            text-sm
                            font-medium
                          "
                  >
                    {book.available_stock} Available
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default CatalogPage;
