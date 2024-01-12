import { useState } from "react";
import axios from "axios";

const Reservation = () => {
  const [tipeKamar, setTipeKamar] = useState("REGULAR");
  const [tipeKasur, setTipeKasur] = useState("TWIN");
  const [nama, setNama] = useState("");
  const [nik, setNIK] = useState("");
  const [email, setEmail] = useState("");
  const [kontak, setKontak] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [error, setError] = useState("");
  const [reservationResult, setReservationResult] = useState(null);

  const handleReservation = async (e) => {
    e.preventDefault();

    // Format data to be sent to the API
    const requestData = {
      tipe_kamar: tipeKamar,
      tipe_kasur: tipeKasur,
      nama: nama,
      nik: nik,
      email: email,
      kontak: kontak,
      date_from: formatTanggal(dateFrom),
      date_to: formatTanggal(dateTo),
    };

    try {
      // Send the reservation request to the API
      const response = await axios.post(
        "http://127.0.0.1:8000/reservation/pesankamar/",
        requestData
      );

      const responseData = response.data;

      if (responseData.msg === "Sukses memesan") {
        // Reservation successful
        // Display the reservation details
        setReservationResult(responseData);
      } else {
        setError("Pemesanan gagal");
      }
    } catch (error) {
      console.error("Reservation Error:", error.message);
      setError("Pemesanan gagal");
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pemesanan Kamar Hotel</h2>
      <form onSubmit={handleReservation}>
        {/* Other input fields can be added as needed */}
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-600"
          >
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 p-2 border rounded-md w-70 text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nik"
            className="block text-sm font-medium text-gray-600"
          >
            Nik
          </label>
          <input
            type="text"
            id="nik"
            name="nik"
            value={nik}
            onChange={(e) => setNIK(e.target.value)}
            className="mt-1 p-2 border rounded-md w-70 text-gray-500"
          />
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded-md w-70 text-gray-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="kontak"
              className="block text-sm font-medium text-gray-600"
            >
              KOntak
            </label>
            <input
              type="text"
              id="kontak"
              name="kontak"
              value={kontak}
              onChange={(e) => setKontak(e.target.value)}
              className="mt-1 p-2 border rounded-md w-70 text-gray-500"
            />
          </div>

          <label
            htmlFor="tipeKamar"
            className="block text-sm font-medium text-gray-600"
          >
            Tipe Kamar
          </label>
          <select
            id="tipeKamar"
            name="tipeKamar"
            className="mt-1 p-2 border rounded-md w-70 text-gray-500"
            value={tipeKamar}
            onChange={(e) => setTipeKamar(e.target.value)}
          >
            <option value="REGULAR">Regular</option>
            <option value="SUITE">Suite</option>
            <option value="DELUXE">Deluxe</option>
            <option value="VIP">VIP</option>
            <option value="FAMILY">Family</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="tipeKasur"
            className="block text-sm font-medium text-gray-600"
          >
            Tipe Kasur
          </label>
          <select
            id="tipeKasur"
            name="tipeKasur"
            className="mt-1 p-2 border rounded-md w-70 text-gray-500"
            value={tipeKasur}
            onChange={(e) => setTipeKasur(e.target.value)}
          >
            <option value="TWIN">Single Bed</option>
            <option value="DOUBLE">Double Bed</option>
            <option value="QUEEN">Quen Size Bed</option>
            <option value="KING">King Size Bed</option>
          </select>
        </div>

        {/* Other input fields for NIK, email, kontak, dateFrom, and dateTo can be added similarly */}

        <div className="mb-4">
          <label
            htmlFor="dateFrom"
            className="block text-sm font-medium text-gray-600"
          >
            Tanggal Check In
          </label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="mt-1 p-2 border rounded-md w-70 text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dateTo"
            className="block text-sm font-medium text-gray-600"
          >
            Tanggal Check Out
          </label>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="mt-1 p-2 border rounded-md w-70 text-gray-500"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Pesan Kamar
        </button>
      </form>
      {reservationResult && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Detail Pemesanan</h3>
          <p>Kode Booking: {reservationResult.kode_booking}</p>
          <p>Atas Nama: {reservationResult.atas_nama}</p>
          <p>Tanggal Pesan: {reservationResult.tanggal_pesan}</p>
          <p>Tanggal Check In: {reservationResult.tanggal_chek_in}</p>
          <p>Tanggal Check Out: {reservationResult.tanggal_chek_out}</p>
          <p>Tipe Kamar: {reservationResult.tipe_kamar}</p>
          <p>Tipe Kasur: {reservationResult.tipe_kasur}</p>
          <p>Lama Inap: {reservationResult.lama_inap} hari</p>
          <p>
            Harga Kamar: Rp{" "}
            {parseFloat(reservationResult.harga_kamar).toLocaleString()}
          </p>
          <p>
            Total Harga: Rp{" "}
            {parseFloat(reservationResult.total_harga).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Reservation;
