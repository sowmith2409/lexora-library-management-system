import { useEffect, useState } from "react";

import {
  BookOpen,
  ClipboardList,
  Users,
  HandCoins,
  AlertTriangle,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function DashboardPage() {

  // STATE

  const [stats, setStats] =
    useState({});


  // FETCH DASHBOARD DATA

  async function fetchDashboardData() {

    try {

      const response =
        await api.get(
          "/dashboard/stats"
        );

      setStats(
        response.data
      );

    }

    catch (error) {

      console.log(error);

    }

  }


  // PAGE LOAD

  useEffect(() => {

    fetchDashboardData();

  }, []);


  return (

    <MainLayout>

      {/* HERO SECTION */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-br
          from-slate-900
          via-slate-800
          to-indigo-900
          p-10
          text-white
          mb-10
        "
      >

        <div className="relative z-10">

          <p
            className="
              text-sm
              uppercase
              tracking-[4px]
              text-slate-300
              mb-4
            "
          >
            Lexora Library
          </p>


          <h1
            className="
              text-6xl
              font-serif
              font-bold
              leading-tight
              max-w-3xl
            "
          >
            Smart Library.
            <br />
            Seamless Experience.
          </h1>


          <p
            className="
              text-slate-300
              text-lg
              mt-6
              max-w-3xl
              leading-relaxed
            "
          >
            Lexora provides a modern, intelligent,
            and efficient digital library management
            experience designed for administrators,
            librarians, and readers. The platform
            simplifies book management, borrowing
            workflows, return tracking, overdue
            monitoring, and fine management through
            a clean and responsive interface.
          </p>

        </div>


        {/* GLOW EFFECT */}

        <div
          className="
            absolute
            w-[500px]
            h-[500px]
            rounded-full
            bg-indigo-500/20
            blur-3xl
            -right-24
            -top-24
          "
        />

      </div>


      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-7
        "
      >

        {/* TOTAL BOOKS */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-7
            shadow-sm
            hover:shadow-lg
            transition
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-blue-100
              text-blue-700
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <BookOpen size={26} />

          </div>


          <h2
            className="
              text-5xl
              font-bold
              text-slate-900
              mb-3
            "
          >

            {stats.totalBooks || 0}

          </h2>


          <p
            className="
              text-gray-500
              text-lg
            "
          >

            Total Books

          </p>

        </div>


        {/* ACTIVE BORROWS */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-7
            shadow-sm
            hover:shadow-lg
            transition
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-yellow-100
              text-yellow-700
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <ClipboardList size={26} />

          </div>


          <h2
            className="
              text-5xl
              font-bold
              text-slate-900
              mb-3
            "
          >

            {stats.activeBorrows || 0}

          </h2>


          <p
            className="
              text-gray-500
              text-lg
            "
          >

            Active Borrowings

          </p>

        </div>


        {/* USERS */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-7
            shadow-sm
            hover:shadow-lg
            transition
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-green-100
              text-green-700
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <Users size={26} />

          </div>


          <h2
            className="
              text-5xl
              font-bold
              text-slate-900
              mb-3
            "
          >

            {stats.totalUsers || 0}

          </h2>


          <p
            className="
              text-gray-500
              text-lg
            "
          >

            System Users

          </p>

        </div>


        {/* FINES */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-7
            shadow-sm
            hover:shadow-lg
            transition
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-red-100
              text-red-700
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <HandCoins size={26} />

          </div>


          <h2
            className="
              text-5xl
              font-bold
              text-slate-900
              mb-3
            "
          >

            ₹{stats.totalFine || 0}

          </h2>


          <p
            className="
              text-gray-500
              text-lg
            "
          >

            Fine Collection

          </p>

        </div>


        {/* OVERDUE */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-7
            shadow-sm
            hover:shadow-lg
            transition
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-orange-100
              text-orange-700
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <AlertTriangle size={26} />

          </div>


          <h2
            className="
              text-5xl
              font-bold
              text-red-600
              mb-3
            "
          >

            {stats.overdueBooks || 0}

          </h2>


          <p
            className="
              text-gray-500
              text-lg
            "
          >

            Overdue Books

          </p>

        </div>


        {/* INVENTORY */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-7
            shadow-sm
            hover:shadow-lg
            transition
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-indigo-100
              text-indigo-700
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <BookOpen size={26} />

          </div>


          <h2
            className="
              text-5xl
              font-bold
              text-slate-900
              mb-3
            "
          >

            {stats.availableInventory || 0}

          </h2>


          <p
            className="
              text-gray-500
              text-lg
            "
          >

            Available Inventory

          </p>

        </div>

      </div>


      {/* RECENT ACTIVITY */}

      <div
        className="
          mt-10
          bg-white
          border
          border-gray-200
          rounded-3xl
          p-8
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-8
          "
        >

          <div>

            <h2
              className="
                text-3xl
                font-serif
                font-bold
                text-slate-900
              "
            >
              Recent Activity
            </h2>


            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Latest library operations and updates.
            </p>

          </div>

        </div>


        <div
          className="
            space-y-5
          "
        >

          {/* ACTIVITY ITEM */}

          <div
            className="
              flex
              items-center
              justify-between
              border
              border-gray-100
              rounded-2xl
              p-5
            "
          >

            <div>

              <h3
                className="
                  font-semibold
                  text-slate-900
                "
              >
                New borrow request submitted
              </h3>

              <p
                className="
                  text-gray-500
                  mt-1
                "
              >
                A member requested a book from the catalog.
              </p>

            </div>


            <span
              className="
                text-sm
                text-gray-400
              "
            >
              Just now
            </span>

          </div>


          {/* ACTIVITY ITEM */}

          <div
            className="
              flex
              items-center
              justify-between
              border
              border-gray-100
              rounded-2xl
              p-5
            "
          >

            <div>

              <h3
                className="
                  font-semibold
                  text-slate-900
                "
              >
                Fine payment received
              </h3>

              <p
                className="
                  text-gray-500
                  mt-1
                "
              >
                A member completed a pending fine payment.
              </p>

            </div>


            <span
              className="
                text-sm
                text-gray-400
              "
            >
              2 hours ago
            </span>

          </div>


          {/* ACTIVITY ITEM */}

          <div
            className="
              flex
              items-center
              justify-between
              border
              border-gray-100
              rounded-2xl
              p-5
            "
          >

            <div>

              <h3
                className="
                  font-semibold
                  text-slate-900
                "
              >
                Inventory updated
              </h3>

              <p
                className="
                  text-gray-500
                  mt-1
                "
              >
                New books were added to the library inventory.
              </p>

            </div>


            <span
              className="
                text-sm
                text-gray-400
              "
            >
              Today
            </span>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default DashboardPage;