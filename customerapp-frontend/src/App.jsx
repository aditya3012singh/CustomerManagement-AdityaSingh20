import { useEffect, useState } from "react";
import { User, MapPin, Edit2, Trash2, Plus, Save, X } from "lucide-react";

const API_URL = "http://localhost:8080/customers";

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async () => {
    if (!name || !address) return;
    
    const payload = { name, address };

    try {
      if (editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setEditId(null);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setName("");
      setAddress("");
      fetchCustomers();
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const editCustomer = (customer) => {
    setEditId(customer.id);
    setName(customer.name);
    setAddress(customer.address);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setAddress("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Customer Management
          </h1>
          <p className="text-gray-600">Manage your customer database with ease</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {editId ? "Edit Customer" : "Add New Customer"}
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={!name || !address}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editId ? (
                  <>
                    <Save className="w-5 h-5" />
                    Update Customer
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Customer
                  </>
                )}
              </button>
              
              {editId && (
                <button
                  onClick={cancelEdit}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Customers List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            All Customers ({customers.length})
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading customers...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No customers yet. Add your first customer above!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {customer.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 ml-13">
                        <MapPin className="w-4 h-4" />
                        <p>{customer.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => editCustomer(customer)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="Edit customer"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteCustomer(customer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete customer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}