import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [jenisKamar, setJenisKamar] = useState("");
  const [jenisKasur, setJenisKasur] = useState("");
  const [tanggalCheckIn, setTanggalCheckIn] = useState("");
  const [tanggalCheckOut, setTanggalCheckOut] = useState("");
  const [availabilityResult, setAvailabilityResult] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Format data untuk dikirimkan ke API
    const requestData = {
      date_from: formatTanggal(tanggalCheckIn),
      date_to: formatTanggal(tanggalCheckOut),
      tipe_kamar: jenisKamar === "all" ? null : jenisKamar,
      tipe_kasur: jenisKasur === "all" ? null : jenisKasur,
    };

    try {
      // Kirim permintaan ke API menggunakan axios
      const response = await axios.post(
        "http://127.0.0.1:8000/reservation/viewroom/",
        requestData
      );

      // Ambil data JSON dari respons API
      const data = response.data;

      // Set hasil ketersediaan kamar
      setAvailabilityResult(data);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error jika diperlukan
    }
  };
  const getMonthAbbreviation = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months[date.getMonth()];
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    const year = date.getFullYear();
    const monthAbbreviation = getMonthAbbreviation(date);
    const day = date.getDate();

    return `${year}-${monthAbbreviation}-${day}`;
  };

  const handleLoginClick = () => {
    // Redirect ke halaman login
    router.push("/login");
  };

  const handleSignUpClick = () => {
    // Redirect ke halaman login
    router.push("/signup");
  };

  const handleBookClick = () => {
    // Redirect ke halaman login
    router.push("/halaman_guest");
  };

  return (
    <div>
      <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Hotel XYZ</h1>
        <div>
          <button className="mr-4" onClick={handleLoginClick}>
            Login
          </button>
          <button className="mr-4" onClick={handleSignUpClick}>
            Sign Up
          </button>
          <button onClick={handleBookClick}>Book</button>
        </div>
      </header>

      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Cek Ketersediaan Kamar</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="jenisKamar"
              className="block text-sm font-medium text-gray-600"
            >
              Jenis Kamar
            </label>
            <select
              id="jenisKamar"
              name="jenisKamar"
              className="mt-1 p-2 border text-gray-500 rounded-md w-full"
              value={jenisKamar}
              onChange={(e) => setJenisKamar(e.target.value)}
            >
              <option value="all">Semua</option>
              <option value="REGULAR">Regular</option>
              <option value="SUITE">Suite</option>
              <option value="DELUXE">Deluxe</option>
              <option value="VIP">VIP</option>
              <option value="FAMILY">Family</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="jenisKasur"
              className="block text-sm font-medium text-gray-600"
            >
              Jenis Kasur
            </label>
            <select
              id="jenisKasur"
              name="jenisKasur"
              className="mt-1 p-2 text-gray-500 border rounded-md w-full"
              value={jenisKasur}
              onChange={(e) => setJenisKasur(e.target.value)}
            >
              <option value="all">Semua</option>
              <option value="TWIN">Single Bed</option>
              <option value="DOUBLE">Double Bed</option>
              <option value="QUEEN">Quen Size Bed</option>
              <option value="KING">King Size Bed</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="tanggalCheckIn"
              className="block text-sm font-medium text-gray-600"
            >
              Tanggal Check In
            </label>
            <input
              type="date"
              id="tanggalCheckIn"
              name="tanggalCheckIn"
              className="mt-1 p-2 border rounded-md w-full text-gray-500"
              value={tanggalCheckIn}
              onChange={(e) => setTanggalCheckIn(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tanggalCheckOut"
              className="block text-sm font-medium text-gray-600"
            >
              Tanggal Check Out
            </label>
            <input
              type="date"
              id="tanggalCheckOut"
              name="tanggalCheckOut"
              className="mt-1 p-2 border rounded-md w-full text-gray-500"
              value={tanggalCheckOut}
              onChange={(e) => setTanggalCheckOut(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Cek Ketersediaan
          </button>
        </form>

        {availabilityResult && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Hasil Ketersediaan Kamar:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-gray-500">
              {availabilityResult.map((room, index) => (
                <div key={index} className="bg-white p-4 border rounded-md">
                  <h4 className="text-lg font-semibold mb-2">
                    {room.tipe_kamar}
                  </h4>
                  <p>Jenis Kasur: {room.tipe_kasur}</p>
                  <p>Total Kamar: {room.total_kamar}</p>
                  <p>
                    Harga Kamar: Rp{" "}
                    {parseFloat(room.harga_kamar).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
