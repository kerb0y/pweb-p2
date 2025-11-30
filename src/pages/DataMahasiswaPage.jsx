import Layout from "./Layout";
import logoGundar from "../assets/logoGundar.svg";
import { useState, useEffect, useRef } from "react";
import ModalComponent from "../components/ModalComponent";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function DataMahasiswaPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    npm: "",
    nama: "",
    kelas: "",
  });
  const [importProgress, setImportProgress] = useState(null);
  const fileInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const API_URL = "http://localhost/pweb_bintang";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/read.php`);
      if (response.data.status === "success") {
        setData(response.data.data);
      } else {
        setData([]); // Set empty if no data or error
      }
    } catch (err) {
      setError("Gagal mengambil data dari server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open modal for adding
  const handleAdd = () => {
    setIsEditMode(false);
    setFormData({ npm: "", nama: "", kelas: "" });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (mhs) => {
    setIsEditMode(true);
    setCurrentId(mhs.id);
    setFormData({ npm: mhs.npm, nama: mhs.nama, kelas: mhs.kelas });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update data
        await axios.put(`${API_URL}/update.php/${currentId}`, formData);
      } else {
        // Add data
        // Use FormData for POST request as expected by PHP $_POST
        const postData = new FormData();
        postData.append("npm", formData.npm);
        postData.append("nama", formData.nama);
        postData.append("kelas", formData.kelas);

        await axios.post(`${API_URL}/create.php`, postData);
      }
      fetchData(); // Refresh data
      setIsModalOpen(false);
    } catch (err) {
      alert("Gagal menyimpan data.");
      console.error(err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${API_URL}/delete.php/${id}`);
        fetchData(); // Refresh data
      } catch (err) {
        alert("Gagal menghapus data.");
        console.error(err);
      }
    }
  };

  // Handle CSV Import
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const rawItems = text.split(';').map(item => item.trim()).filter(item => item !== "");

      const items = rawItems.slice(4);

      const totalStudents = Math.floor(items.length / 4);

      if (totalStudents === 0) {
        alert("Format file tidak valid atau kosong.");
        return;
      }

      if (window.confirm(`Ditemukan ${totalStudents} data mahasiswa. Apakah Anda ingin mengimpornya?`)) {
        setImportProgress(`Mengimpor 0/${totalStudents}...`);

        let successCount = 0;

        for (let i = 0; i < totalStudents; i++) {
          const baseIndex = i * 4;
          const npm = items[baseIndex + 1];
          const nama = items[baseIndex + 2];
          const kelas = items[baseIndex + 3];

          try {
            const postData = new FormData();
            postData.append("npm", npm);
            postData.append("nama", nama);
            postData.append("kelas", kelas);

            await axios.post(`${API_URL}/create.php`, postData);
            successCount++;
            setImportProgress(`Mengimpor ${successCount}/${totalStudents}...`);
          } catch (err) {
            console.error(`Gagal mengimpor data ke-${i + 1}:`, err);
          }
        }

        setImportProgress(null);
        alert(`Impor selesai! Berhasil menambahkan ${successCount} dari ${totalStudents} data.`);
        fetchData();
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = null;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src={logoGundar} alt="Logo Gunadarma" className="h-16 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Data Mahasiswa</h1>
                <p className="text-sm text-gray-500">Universitas Gunadarma</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv"
                className="hidden"
              />
              <button
                onClick={handleImportClick}
                disabled={importProgress !== null}
                className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center ${importProgress !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {importProgress || "Import CSV"}
              </button>
              <button
                onClick={handleAdd}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Tambah Data
              </button>
            </div>
          </div>

          {/* Data Display Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Memuat data...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : (
              <>
                {/* Desktop View - Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-purple-600 text-white">
                        <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider">No</th>
                        <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider">NPM</th>
                        <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Nama</th>
                        <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Kelas</th>
                        <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentItems.map((mhs, index) => (
                        <tr key={mhs.id} className="hover:bg-purple-50 transition duration-150">
                          <td className="py-4 px-6 text-gray-700">{indexOfFirstItem + index + 1}</td>
                          <td className="py-4 px-6 text-gray-700 font-medium">{mhs.npm}</td>
                          <td className="py-4 px-6 text-gray-700 capitalize">{mhs.nama}</td>
                          <td className="py-4 px-6 text-gray-700">{mhs.kelas}</td>
                          <td className="py-4 px-6 text-center space-x-2">
                            <button
                              onClick={() => handleEdit(mhs)}
                              className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
                            >
                              Edit
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => handleDelete(mhs.id)}
                              className="text-red-600 hover:text-red-800 font-medium transition duration-150"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View - Cards */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                  {currentItems.map((mhs, index) => (
                    <div key={mhs.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          No. {indexOfFirstItem + index + 1}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(mhs)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(mhs.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-gray-800">{mhs.nama}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">NPM:</span> {mhs.npm}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Kelas:</span> {mhs.kelas}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {data.length > 0 && (
                  <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">Tampilkan</span>
                      <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                      </select>
                      <span className="text-sm text-gray-700">data per halaman</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-700">
                        Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span> sampai <span className="font-medium">{Math.min(indexOfLastItem, data.length)}</span> dari <span className="font-medium">{data.length}</span> data
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                        >
                          <FaChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                        >
                          <FaChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {data.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow mt-4">
                    <p className="text-gray-500 text-lg">Belum ada data mahasiswa.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? "Edit Data Mahasiswa" : "Tambah Data Mahasiswa"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">NPM</label>
            <input
              type="text"
              name="npm"
              value={formData.npm}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kelas</label>
            <input
              type="text"
              name="kelas"
              value={formData.kelas}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </ModalComponent>
    </Layout>
  );
}