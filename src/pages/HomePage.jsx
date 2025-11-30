import React from "react";
import Layout from "./Layout";
import logoGundar from "../assets/logoGundar.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                Sistem Data Mahasiswa
              </h1>
              <p className="text-lg md:text-xl text-purple-100 mb-8">
                Kelola data mahasiswa Universitas Gunadarma dengan mudah, cepat, dan efisien. Terintegrasi langsung dengan database pusat.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <Link
                  to="/data_mhs"
                  className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1"
                >
                  Lihat Data
                </Link>
                <a
                  href="https://gunadarma.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-purple-600 transition duration-300"
                >
                  Website Kampus
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={logoGundar}
                alt="Universitas Gunadarma"
                className="w-64 md:w-96 drop-shadow-2xl animate-fade-in-up"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Fitur Utama</h2>
              <p className="mt-4 text-gray-600">
                Dirancang untuk memudahkan administrasi data akademik.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Manajemen Mudah</h3>
                <p className="text-gray-600">
                  Tambah, ubah, dan hapus data mahasiswa dengan antarmuka yang intuitif dan user-friendly.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Database Terintegrasi</h3>
                <p className="text-gray-600">
                  Data tersimpan aman di database pusat dan dapat diakses secara real-time kapan saja.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Responsive Design</h3>
                <p className="text-gray-600">
                  Akses sistem dari berbagai perangkat, mulai dari desktop, tablet, hingga smartphone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} b1tg.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default HomePage;