import { useState, useEffect } from 'react';
import {
  Users,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  User2,
  Shield,
  Clock,
  UserCheck
} from "lucide-react";
import { ClipLoader, HashLoader, PropagateLoader, PulseLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import { allAccounts, createAccount, deleteAccount, updateAccount, allPersons } from '../../services/accountService';

const Account = () => {
  const [accountView, setAccountView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [editFormData, setEditFormData] = useState({
    personId: '',
    username: '',
    password: '',
    isDeleted: 'N'
  });

  const [accountData, setAccountData] = useState([]);
  const [personsData, setPersonsData] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [reload, setReload] = useState(true);
  const [formData, setFormData] = useState({
    personId: '',
    username: '',
    password: '',
    isDeleted: 'N'
  });

  const accountsPerPage = 8;

  const getAllAccounts = async () => {
    setLoadingAccounts(true);
    const accountsResponse = await allAccounts();
    if (accountsResponse.data.success) {
      const accounts = accountsResponse.data.data;
      setAccountData(accounts);
      setLoadingAccounts(false);
    }
  }

  const getAllPersons = async () => {
    const personsResponse = await allPersons();
    if (personsResponse.data.success) {
      const persons = personsResponse.data.allPerson;
      setPersonsData(persons);
    }
  }

  const deleteAccounts = async (id) => {
    const deleteResponse = await deleteAccount(id);
    if (deleteResponse.data.success) {
      toast.success("Account deleted successfully!", {
        position: 'top-center',
      });
      setReload(!reload);
    } else {
      toast.error("Failed to delete account!", {
        position: 'top-center',
      });
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Edit modal handlers
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = (account) => {
    setEditingAccount(account);
    setEditFormData({
      personId: account.personId,
      username: account.username,
      password: '',
      isDeleted: account.isDeleted
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAccount(editingAccount.accountId, editFormData);
      if (response.data.success) {
        console.log(response.data);
        toast.success("Account updated successfully!", {
          position: 'top-center',
        });
        setShowEditModal(false);
        setEditingAccount(null);
        setReload(!reload);
      } else {
        toast.error("Failed to update account!", {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update account!", {
        position: 'top-center',
      });
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingAccount(null);
    setEditFormData({
      personId: '',
      username: '',
      password: '',
      isDeleted: 'N'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAccount(formData);
      if (response.data.success) {
        setFormData({
          personId: '',
          username: '',
          password: '',
          isDeleted: 'N'
        });
        setReload(!reload);
        toast.success("Account created successfully!", {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account!", {
        position: 'top-center',
      });
    }
  };

  const filteredAccounts = accountData.filter(account => {
    const matchesSearch = 
      `${account.username}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${account.user?.personCode || ''}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${account.user?.name || ''}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === 'username') {
      aValue = `${a.username}`;
      bValue = `${b.username}`;
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });


  const totalPages = Math.ceil(sortedAccounts.length / accountsPerPage);
  const startIndex = (currentPage - 1) * accountsPerPage;
  const endIndex = startIndex + accountsPerPage;
  const currentAccounts = sortedAccounts.slice(startIndex, endIndex);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAccounts = (accountId) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAccounts(
      selectedAccounts.length === currentAccounts.length
        ? []
        : currentAccounts.map(account => account.accountId)
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPersonName = (personId) => {
    const person = personsData.find(p => p.user.personId === personId);
    return person ? `${person.firstName} (${person.personCode})` : 'Unknown Person';
  };

  useEffect(() => {
    getAllAccounts();
    getAllPersons();
  }, [reload]);

  return (
    <>
      {loadingAccounts ? 
        <>
          <div className="w-auto h-2/3 flex items-center justify-center">
            <PropagateLoader
              color="#48bb78"
              loading={loadingAccounts}
              cssOverride={{
                display: "block",
                margin: "0 auto",
                borderColor: "#48bb78",
              }}
              size={20}
            />
          </div>
        </>
        :
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
          {/* Header Stats */}
          <ToastContainer autoClose={2000} />
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* Table Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
                  <p className="text-gray-600 mt-1">Manage User Accounts</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setAccountView(!accountView)}
                    className={accountView ? "flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium" : "flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"}
                  >
                    {accountView ? " Close Add Account " : " Add Account "}
                    {accountView ? <X className='h-4 w-4 mr-2' /> : <Plus className="h-4 w-4 mr-2" />}
                  </button>

                  <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>
            <>
              {/* Search and Filters */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search Username, Person Code, or Name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {/* Filter Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>

                    {selectedAccounts.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{selectedAccounts.length} selected</span>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Account Form */}
                {accountView && (
                  <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="p-1 border-b mb-6 border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Shield className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-800">Add New Account</h2>
                            <p className="text-sm text-gray-600">Enter account details to add them to the system</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Person</label>
                        <select
                          name="personId"
                          value={formData.personId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Person</option>
                          {personsData.map((person) => (
                            <option key={person.personId} value={person.personId}>
                              ({person.personCode})-{person.firstName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="john.doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={handleSubmit}
                          className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors"
                        >
                          Add Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left p-4">
                        <input
                          type="checkbox"
                          checked={selectedAccounts.length === currentAccounts.length && currentAccounts.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </th>
                      <th
                        className="text-left p-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('username')}
                      >
                        Username
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">Person</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Last Login</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAccounts.map((account) => (
                      <tr key={account.accountId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedAccounts.includes(account.accountId)}
                            onChange={() => handleSelectAccounts(account.accountId)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                        </td>

                        <td className="p-4">
                          <div className="flex items-center space-x-3 cursor-pointer">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {account.username.substr(0, 2).toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {account.username}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <User2 className="h-3 w-3 mr-1" />
                            {account.user ? `${account.user.firstName} (${account.user.personCode})` : 'Unknown Person'}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(account.lastLogin)}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            account.isDeleted === 'N' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <UserCheck className="h-3 w-3 mr-1" />
                            {account.isDeleted === 'N' ? 'Active' : 'Inactive'}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditClick(account)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit Account"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" onClick={() => deleteAccounts(account.accountId)}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, sortedAccounts.length)} of {sortedAccounts.length} accounts
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : "text-gray-700 hover:bg-gray-200 bg-white border border-gray-300"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </button>

                    <div className="flex space-x-1">
                      {[...Array(Math.min(5, totalPages))].map((_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                              currentPage === page
                                ? "bg-green-600 text-white"
                                : "text-gray-700 hover:bg-gray-200 bg-white border border-gray-300"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : "text-gray-700 hover:bg-gray-200 bg-white border border-gray-300"
                      }`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          </div>

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Edit className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">Edit Account</h2>
                        <p className="text-sm text-gray-600">Update account details</p>
                      </div>
                    </div>
                    <button
                      onClick={closeEditModal}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <form onSubmit={handleEditSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Person
                      </label>
                      <select
                        name="personId"
                        value={editFormData.personId}
                        onChange={handleEditInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Person</option>
                        {personsData.map((person) => (
                          <option key={person.personId} value={person.personId}>
                            {person.firstName}-{person.personCode}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={editFormData.username}
                        onChange={handleEditInputChange}
                        placeholder="john.doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password (leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={editFormData.password}
                        onChange={handleEditInputChange}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="isDeleted"
                        value={editFormData.isDeleted}
                        onChange={handleEditInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="N">Active</option>
                        <option value="Y">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Update Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>}
    </>
  );
};

export default Account;