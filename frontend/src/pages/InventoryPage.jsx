import { useEffect, useState } from "react";

import { Search, Plus, Pencil, Trash2, Tag } from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function InventoryPage() {
  // STATES

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);

  // EDIT STATES

  const [editTitle, setEditTitle] = useState("");

  const [editAuthor, setEditAuthor] = useState("");

  const [editCategory, setEditCategory] = useState("");

  const [editStock, setEditStock] = useState("");

  const [editAvailableStock, setEditAvailableStock] = useState("");

  const [editDescription, setEditDescription] = useState("");

  // NEW BOOK

  const [newBook, setNewBook] = useState({
    title: "",

    author: "",

    category: "",

    total_stock: "",
  });

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

  useEffect(() => {
    fetchBooks();
  }, []);

  // ADD BOOK

  async function handleAddBook() {
    try {
      await api.post("/books", {
        title: newBook.title,

        author: newBook.author,

        category: newBook.category,

        total_stock: Number(newBook.total_stock),

        available_stock: Number(newBook.total_stock),
      });

      setShowAddModal(false);

      fetchBooks();
    } catch (error) {
      console.log(error);

      alert("Failed to add book");
    }
  }

  // DELETE BOOK

  async function handleDeleteBook(bookId) {
    try {
      await api.delete(`/books/${bookId}`);

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  }

  // EDIT BOOK

  function handleEditBook(book) {
    setSelectedBook(book);

    setEditTitle(book.title || "");

    setEditAuthor(book.author || "");

    setEditCategory(book.category || "");

    setEditStock(book.total_stock || "");

    setEditAvailableStock(book.available_stock || "");

    setEditDescription(book.description || "");

    setShowEditModal(true);
  }

  // UPDATE BOOK

  async function handleUpdateBook() {
    try {
      await api.put(
        `/books/${selectedBook.id}`,

        {
          title: editTitle,

          author: editAuthor,

          category: editCategory,

          total_stock: editStock,

          available_stock: editAvailableStock,

          description: editDescription,
        },
      );

      alert("Book updated");

      setShowEditModal(false);

      fetchBooks();
    } catch (error) {
      console.log(error);

      alert("Failed to update book");
    }
  }

  // FILTER

  const filteredBooks = books.filter((book) => {
    const search = searchText.toLowerCase();

    return (
      book.title?.toLowerCase().includes(search) ||
      book.author?.toLowerCase().includes(search)
    );
  });

  return (
    <MainLayout>
      {/* HEADER */}

      <div className="flex justify-between mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-3">Inventory</h1>

          <p className="text-gray-500 text-20px">Manage library books.</p>
        </div>

        <div className="flex gap-4">
          {/* SEARCH */}

          <div className="flex items-center gap-3 bg-white border rounded-2xl px-4 h-[54px] w-[320px]">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search inventory..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* CATEGORY */}

          <button className="flex items-center gap-2 bg-white border rounded-2xl px-5 h-[54px]">
            <Tag size={17} />
            Categories
          </button>

          {/* ADD */}

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-slate-900 text-white rounded-2xl px-6 h-[54px]"
          >
            <Plus size={18} />
            Add Book
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl border overflow-hidden">
        <div className="grid grid-cols-[2.5fr_2fr_1fr_1fr_1fr] px-8 py-5 bg-gray-50 text-sm font-medium text-gray-500">
          <div>Title</div>

          <div>Author</div>

          <div>Category</div>

          <div>Stock</div>

          <div>Actions</div>
        </div>

        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="grid grid-cols-[2.5fr_2fr_1fr_1fr_1fr] items-center px-8 py-6 border-t"
          >
            {/* TITLE */}

            <div>
              <h3 className="font-semibold text-lg">{book.title}</h3>

              <p className="text-gray-400 text-sm">ISBN: {book.isbn}</p>
            </div>

            {/* AUTHOR */}

            <div>{book.author}</div>

            {/* CATEGORY */}

            <div>
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                {book.category || "General"}
              </span>
            </div>

            {/* STOCK */}

            <div>
              <h3 className="font-semibold">
                {book.available_stock}/{book.total_stock}
              </h3>

              <p className="text-gray-400 text-sm">available</p>
            </div>

            {/* ACTIONS */}

            <div className="flex gap-4">
              <button onClick={() => handleEditBook(book)}>
                <Pencil size={18} />
              </button>

              <button
                onClick={() => handleDeleteBook(book.id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">Edit Book</h2>

            <div className="space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                className="w-full border rounded-2xl px-4 py-3"
              />

              <input
                type="text"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                placeholder="Author"
                className="w-full border rounded-2xl px-4 py-3"
              />

              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                placeholder="Category"
                className="w-full border rounded-2xl px-4 py-3"
              />

              <input
                type="number"
                value={editStock}
                onChange={(e) => setEditStock(e.target.value)}
                placeholder="Total Stock"
                className="w-full border rounded-2xl px-4 py-3"
              />

              <input
                type="number"
                value={editAvailableStock}
                onChange={(e) => setEditAvailableStock(e.target.value)}
                placeholder="Available Stock"
                className="w-full border rounded-2xl px-4 py-3"
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                rows={4}
                className="w-full border rounded-2xl px-4 py-3"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowEditModal(false)}
                className="border px-5 py-3 rounded-2xl"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateBook}
                className="bg-slate-900 text-white px-5 py-3 rounded-2xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD BOOK MODAL */}

      {showAddModal && (
        <div
          className="
              fixed
              inset-0
              bg-black/40
              flex
              items-center
              justify-center
              z-50
            "
        >
          <div
            className="
                bg-white
                rounded-3xl
                p-8
                w-full
                max-w-2xl
              "
          >
            {/* TITLE */}

            <h2
              className="
                  text-3xl
                  font-bold
                  mb-6
                "
            >
              Add New Book
            </h2>

            {/* FORM */}

            <div
              className="
                  space-y-4
                "
            >
              {/* TITLE */}

              <input
                type="text"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,

                    title: e.target.value,
                  })
                }
                placeholder="Book Title"
                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                  "
              />

              {/* AUTHOR */}

              <input
                type="text"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,

                    author: e.target.value,
                  })
                }
                placeholder="Author"
                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                  "
              />

              {/* CATEGORY */}

              <input
                type="text"
                value={newBook.category}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,

                    category: e.target.value,
                  })
                }
                placeholder="Category"
                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                  "
              />

              {/* STOCK */}

              <input
                type="number"
                value={newBook.total_stock}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,

                    total_stock: e.target.value,
                  })
                }
                placeholder="Total Stock"
                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                  "
              />
            </div>

            {/* BUTTONS */}

            <div
              className="
                  flex
                  justify-end
                  gap-4
                  mt-8
                "
            >
              {/* CANCEL */}

              <button
                onClick={() => setShowAddModal(false)}
                className="
                    border
                    px-5
                    py-3
                    rounded-2xl
                  "
              >
                Cancel
              </button>

              {/* CREATE */}

              <button
                onClick={handleAddBook}
                className="
                    bg-slate-900
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                  "
              >
                Create Book
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default InventoryPage;
