import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppLayout from "@/Layouts/AppLayout";
import axios from "axios";
import { Request } from "@/../src/interfaces/Request"; // Assuming Request interface is defined in interfaces/Request.ts
import Swal from 'sweetalert2';


const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [floor, setFloor] = useState<string>("");
  const [roomUnit, setRoomUnit] = useState<string>("");
  const [block, setBlock] = useState<string>("");
  const [guestName, setGuestName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [service, setService] = useState('');
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setViewModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("floor", floor);
      formData.append("room_unit", roomUnit);
      formData.append("block", block);
      formData.append("guest_name", guestName);
      formData.append("service", service);
      formData.append("department", department);
      formData.append("priority", priority);
      formData.append("phone_number", phoneNumber);
      if (file) {
        formData.append("file", file);
      }
      await axios.post("http://127.0.0.1:8000/api/requests", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset state and close modal after successful submission
      setFloor("");
      setRoomUnit("");
      setBlock("");
      setGuestName("");
      setPhoneNumber("");
      setFile(null);
      setShowModal(false);

      // Fetch requests again to update the list
      fetchRequests();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Request created successfully.',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });

    } catch (error) {
      console.error("Error creating request:", error);
      // Handle error
    }
  };

  const handleEditClick = (request: Request) => {
    setSelectedRequest(request);
    setFloor(request.floor);
    setRoomUnit(request.room_unit);
    setBlock(request.block);
    setGuestName(request.guest_name);
    setPhoneNumber(request.phone_number);
    setService(request.service);
    setDepartment(request.department);
    setPriority(request.priority);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!selectedRequest) return;

      const formData = new FormData();
      formData.append("floor", floor);
      formData.append("room_unit", roomUnit);
      formData.append("block", block);
      formData.append("guest_name", guestName);
      formData.append("service", service);
      formData.append("department", department);
      formData.append("priority", priority);
      formData.append("phone_number", phoneNumber);
      if (file) {
        formData.append("file", file);
      }
      await axios.put(`http://127.0.0.1:8000/api/requests/${selectedRequest.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset state and close modal after successful submission
      setFloor("");
      setRoomUnit("");
      setBlock("");
      setGuestName("");
      setPhoneNumber("");
      setFile(null);
      setShowEditModal(false);

      // Fetch requests again to update the list
      fetchRequests();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Request updated successfully.',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });

    } catch (error) {
      console.error("Error updating request:", error);
      // Handle error
    }
  };

  // Function to handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const [requests, setRequests] = useState<Request[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of requests per page

  useEffect(() => {
    fetchRequests();
  }, [searchText, selectedDate, selectedDepartment, selectedStatus, currentPage]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get<{ requests: Request[] }>('http://127.0.0.1:8000/api/requests', {
        params: {
          searchText,
          date: selectedDate ? selectedDate.toISOString() : '',
          department: selectedDepartment,
          status: selectedStatus
        }
      });
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Handle error
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toUpperCase()) {
      case 'HIGH':
        return 'bg-danger'; // Red
      case 'MEDIUM':
        return 'bg-warning'; // Yellow
      case 'LOW':
        return 'bg-success'; // Green
      default:
        return 'bg-secondary'; // Grey for any other case
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'NEW':
        return <span className="badge bg-warning text-dark">NEW</span>; // Yellow
      case 'IN_PROGRESS':
        return <span className="badge bg-success">IN PROGRESS</span>; // Green
      case 'ON_HOLD':
        return <span className="badge bg-purple">ON HOLD</span>; // Purple
      case 'REJECTED':
        return <span className="badge bg-danger">REJECTED</span>; // Red
      case 'CANCELLED':
        return <span className="badge bg-black">CANCELLED</span>; // Black (you may need to define a specific class for black)
      default:
        return <span className="badge bg-secondary">{status}</span>; // Grey for any other case
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleDeleteRequest = (request: Request) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Perform delete request here
          await axios.delete(`http://127.0.0.1:8000/api/requests/${request.id}`);
          Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
          // Fetch requests again after deletion
          fetchRequests();
        } catch (error) {
          console.error('Error deleting request:', error);
          Swal.fire('Error!', 'Failed to delete the request.', 'error');
        }
      }
    });
  };

  const filteredRequests = requests.filter(request => {
    const searchTextLower = searchText.toLowerCase().trim();

    // Guard against null or undefined values
    const idMatches = request.id && request.id.toString().toLowerCase().includes(searchTextLower);
    const locationMatches = request.location && request.location.toLowerCase().includes(searchTextLower);
    const serviceMatches = request.service && request.service.toLowerCase().includes(searchTextLower);
    const departmentMatches = request.department && request.department.toLowerCase().includes(searchTextLower);
    const requestedByMatches = request.requested_by && request.requested_by.toLowerCase().includes(searchTextLower);
    const assignedToMatches = request.assigned_to && request.assigned_to.toLowerCase().includes(searchTextLower);
    const priorityMatches = request.priority && request.priority.toLowerCase().includes(searchTextLower);
    const statusMatches = request.status && request.status.toLowerCase().includes(searchTextLower);
    const phoneMatches = request.phone_number && request.phone_number.toLowerCase().includes(searchTextLower);
    const floorMatches = request.floor && request.floor.toLowerCase().includes(searchTextLower);
    const roomUnitMatches = request.room_unit && request.room_unit.toLowerCase().includes(searchTextLower);
    const blockMatches = request.block && request.block.toLowerCase().includes(searchTextLower);
    const guestNameMatches = request.guest_name && request.guest_name.toLowerCase().includes(searchTextLower);

    return (
      (searchTextLower === '' ||
        idMatches ||
        locationMatches ||
        serviceMatches ||
        departmentMatches ||
        requestedByMatches ||
        assignedToMatches ||
        priorityMatches ||
        statusMatches ||
        phoneMatches ||
        floorMatches ||
        roomUnitMatches ||
        blockMatches ||
        guestNameMatches) &&
      (!selectedDate || (request.created_at && new Date(request.created_at).toLocaleDateString() === selectedDate.toLocaleDateString())) &&
      (selectedDepartment === '' || (request.department && request.department === selectedDepartment)) &&
      (selectedStatus === '' || (request.status && request.status === selectedStatus))
    );
  });

  // Calculate counts for each status
  const countNew = filteredRequests.filter(request => request.status === 'NEW').length;
  const countInProgress = filteredRequests.filter(request => request.status === 'IN_PROGRESS').length;
  const countOnHold = filteredRequests.filter(request => request.status === 'ON_HOLD').length;
  const countRejected = filteredRequests.filter(request => request.status === 'REJECTED').length;
  const countCancelled = filteredRequests.filter(request => request.status === 'CANCELLED').length;

  // Calculate total pages based on filtered requests
  const totalPages = Math.ceil(filteredRequests.length / pageSize);

  // Array of page numbers for pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleNewRequestClick = () => {
    setShowModal(true); // Open the modal when "New Request" button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const closeEditModal = () => {
    setShowEditModal(false); // Close the edit modal
  };

    return (
        <>
            <AppLayout title="Home">
            <section className="custom-page-header">
                    <div className="container-fluid vstack gap-4">
                        <div className="wrapper">
                            <div className="row mb-4">
                                <div className="col-12 d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <h1 className="fs-4 mb-0 me-2">
                                            Requests
                                        </h1>
                                        <button className="btn btn-sm btn-danger ms-3" onClick={handleNewRequestClick}>
                                            <i className="bi bi-plus" />
                                            &nbsp; New Request
                                        </button>
                                    </div>
                                    <div className="ms-auto d-flex">
                                        <div className="me-2 rounded-data text-center first-round-data">
                                            <span className="fs-3 fw-bolder text-dark d-block" style={{ lineHeight: '1.2' }}>{countNew}</span>
                                            <span className="sub-circle-font text-dark fw-light" style={{ lineHeight: '1.2' }}>New <br />Request</span>
                                        </div>
                                        <div className="me-2 rounded-data text-center second-round-data">
                                            <span className="fs-3 fw-bolder text-dark d-block" style={{ lineHeight: '1.2' }}>{countInProgress}</span>
                                            <span className="sub-circle-font text-dark fw-light" style={{ lineHeight: '1.2' }}>In Progress <br />Request</span>
                                        </div>
                                        <div className="me-2 rounded-data text-center third-round-data">
                                            <span className="fs-3 fw-bolder text-dark d-block" style={{ lineHeight: '1.2' }}>{countOnHold}</span>
                                            <span className="sub-circle-font text-dark fw-light" style={{ lineHeight: '1.2' }}>On Hold <br />Request</span>
                                        </div>
                                        <div className="rounded-data text-center fourth-round-data">
                                            <span className="fs-3 fw-bolder text-dark d-block" style={{ lineHeight: '1.2' }}>{countRejected}</span>
                                            <span className="sub-circle-font text-dark fw-light" style={{ lineHeight: '1.2' }}>Rejected <br />Request</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row g-3 align-items-center justify-content-between mb-3">
                                        <div className="col-md-8">
                                            <div className="d-flex">
                                                <div className="col-md-4">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">
                                                            <i className="bi bi-search"></i>
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search By"
                                                            aria-label="Search"
                                                            value={searchText}
                                                            onChange={handleSearchChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="ms-1">
                                                    <div className="input-group">

                                                        <DatePicker
                                                            selected={selectedDate}
                                                            onChange={handleDateChange}
                                                            className="form-control"
                                                            dateFormat="yyyy-MM-dd"
                                                            placeholderText="Select a date"
                                                        />

                                                    </div>
                                                </div>
                                                <div className="ms-1">
                                                    <select
                                                        id="departmentSelect"
                                                        className="form-select"
                                                        value={selectedDepartment}
                                                        onChange={handleDepartmentChange}
                                                    >
                                                        <option value="">Choose Department...</option>
                                                        <option value="IT">IT</option>
                                                        <option value="HR">HR</option>
                                                    </select>
                                                </div>
                                                <div className="ms-1">
                                                    <select
                                                        id="statusSelect"
                                                        className="form-select"
                                                        value={selectedStatus}
                                                        onChange={handleStatusChange}
                                                    >
                                                        <option value="">Choose Status...</option>
                                                        <option value="NEW">NEW</option>
                                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                                        <option value="ON_HOLD">ON HOLD</option>
                                                        <option value="REJECTED">REJECTED</option>
                                                        <option value="CANCELLED">CANCELLED</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 text-end">
                                                <button className="btn btn-dark">
                                                    <i className="bi bi-funnel" />
                                                </button>
                                                <button className="btn btn-dark ms-2">
                                                    <i className="bi bi-download" />
                                                </button>
                                            </div>
                                    </div>

                                    <div className="card rounded-3">
                                        <div className="table-responsive rounded-3">
                                            <table className="table table-bordered">
                                                <thead style={{ backgroundColor: '#c19c27', border: 'transparent' }}>
                                                    <tr className="table-head">
                                                        <th scope="col" className="text-white">SL No</th>
                                                        <th scope="col" className="text-white">Request ID</th>
                                                        <th scope="col" className="text-white">Created on</th>
                                                        <th scope="col" className="text-white">Location</th>
                                                        <th scope="col" className="text-white">Service</th>
                                                        <th scope="col" className="text-white">Status</th>
                                                        <th scope="col" className="text-white">Department</th>
                                                        <th scope="col" className="text-white">Requested By</th>
                                                        <th scope="col" className="text-white">Assigned to</th>
                                                        <th scope="col" className="text-white">Priority</th>
                                                        <th scope="col" className="text-white"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Conditional rendering based on requests state */}
                                                    {filteredRequests.length > 0 ? (
                                                        filteredRequests.map((request, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{request.id}</td>
                                                                <td className="text-left">{new Date(request.created_at).toLocaleDateString()}</td>
                                                                <td>{request.location}</td>
                                                                <td className="text-left">{request.service}</td>
                                                                <td>{getStatusBadge(request.status)}</td>
                                                                <td className="text-left">{request.department}</td>
                                                                <td>{request.requested_by}</td>
                                                                <td>{request.assigned_to}</td>
                                                                <td><span className={`badge ${getPriorityColor(request.priority.toLowerCase())}`}>{request.priority}</span></td>
                                                                <td className="text-center">
                                                                <a href="#" className="text-secondary" onClick={() => handleViewRequest(request)}>
    <i className="bi bi-eye" />
</a>

    <a href="#" className="text-success ms-2" onClick={() => handleEditClick(request)}>
        <i className="bi bi-pencil"  />
    </a>
    <a href="#" className="text-danger ms-2" onClick={() => handleDeleteRequest(request)}>
        <i className="bi bi-trash" />
    </a>
</td>

                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={11} className="text-center">No requests found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>

                                            {/* Pagination controls */}
                                            {/* Pagination controls */}
                                    <div className="pb-3 d-flex justify-content-center">
                                        <nav className="mb-sm-0 d-flex justify-content-center" aria-label="navigation">
                                            <ul className="pagination pagination-sm pagination-primary-soft mb-0">
                                                {/* Previous page button */}
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button className="btn btn-light" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                                        <i className="bi bi-chevron-left" />
                                                    </button>
                                                </li>

                                                {/* Page numbers */}
                                                {pageNumbers.map((page) => (
                                                    <li key={page} className="page-item">
                                                        <button
                                                            className={`btn ${currentPage === page ? 'btn-danger' : 'btn-light'}`}
                                                            onClick={() => setCurrentPage(page)}
                                                        >
                                                            {page}
                                                        </button>
                                                    </li>
                                                ))}

                                                {/* Next page button */}
                                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button className="btn btn-light" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                                        <i className="bi bi-chevron-right" />
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">New Request</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                <div className="row">
                  <div className="mb-3 col-6">
                    <label className="form-label">Floor</label>
                    <select
                      className="form-select"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                    >
                      <option value="">Choose Floor...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="mb-3 col-6">
                    <label className="form-label">Room/Unit</label>
                    <select
                      className="form-select"
                      value={roomUnit}
                      onChange={(e) => setRoomUnit(e.target.value)}
                    >
                      <option value="">Choose Room/Unit...</option>
                      <option value="Room A">Room A</option>
                      <option value="Room B">Room B</option>
                      <option value="Unit 1">Unit 1</option>
                      <option value="Unit 2">Unit 2</option>
                    </select>
                  </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Block</label>
                    <select
                      className="form-select"
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                    >
                      <option value="">Choose Block...</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Guest Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Service</label>
                    <select
                      className="form-select"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option value="">Choose Service...</option>
                      <option value="Service A">Service A</option>
                      <option value="Service B">Service B</option>
                      <option value="Service C">Service C</option>
                    </select>
                  </div>
                  <div className="row">
  <div className="mb-3 col-6">
    <label className="form-label">Department</label>
    <select
      className="form-select"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
    >
      <option value="">Choose Department...</option>
      <option value="IT">IT</option>
      <option value="HR">HR</option>
    </select>
  </div>
  <div className="mb-3 col-6">
    <label className="form-label">Priority</label>
    <select
      className="form-select"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option value="">Choose Priority...</option>
      <option value="HIGH">High</option>
      <option value="MEDIUM">Medium</option>
      <option value="LOW">Low</option>
    </select>
  </div>
</div>

                  <div className="mb-3">
                    <label className="form-label">Upload File</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-danger">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

{showEditModal && (
  <div className="modal fade show" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <form onSubmit={handleEditSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Edit Request</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowEditModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="mb-3 col-6">
                <label className="form-label">Floor</label>
                <select
                  className="form-select"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                >
                  <option value="">Choose Floor...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Room/Unit</label>
                <select
                  className="form-select"
                  value={roomUnit}
                  onChange={(e) => setRoomUnit(e.target.value)}
                >
                  <option value="">Choose Room/Unit...</option>
                  <option value="Room A">Room A</option>
                  <option value="Room B">Room B</option>
                  <option value="Unit 1">Unit 1</option>
                  <option value="Unit 2">Unit 2</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Block</label>
              <select
                className="form-select"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
              >
                <option value="">Choose Block...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Guest Name</label>
              <input
                type="text"
                className="form-control"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Service</label>
              <select
                className="form-select"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Choose Service...</option>
                <option value="Service A">Service A</option>
                <option value="Service B">Service B</option>
                <option value="Service C">Service C</option>
              </select>
            </div>
            <div className="row">
              <div className="mb-3 col-6">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Choose Department...</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                </select>
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Choose Priority...</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Upload File</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-danger">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}


{viewModalOpen && selectedRequest && (
    <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Request Details</h5>
                    <button type="button" className="btn-close" onClick={() => setViewModalOpen(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Request ID:</strong> {selectedRequest.id}</p>
                            <p><strong>Created On:</strong> {new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                            <p><strong>Floor:</strong> {selectedRequest.floor}</p>
                            <p><strong>Room/Unit:</strong> {selectedRequest.room_unit}</p>
                            <p><strong>Block:</strong> {selectedRequest.block}</p>
                            <p><strong>Location:</strong> {selectedRequest.location}</p>
                            <p><strong>Service:</strong> {selectedRequest.service}</p>
                            <p><strong>Status:</strong> {getStatusBadge(selectedRequest.status)}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Guest Name:</strong> {selectedRequest.guest_name}</p>
                            <p><strong>Phone Number:</strong> {selectedRequest.phone_number}</p>
                            <p><strong>Department:</strong> {selectedRequest.department}</p>
                            <p><strong>Requested By:</strong> {selectedRequest.requested_by}</p>
                            <p><strong>Assigned To:</strong> {selectedRequest.assigned_to}</p>
                            <p><strong>Priority:</strong><span className={`badge ${getPriorityColor(selectedRequest.priority.toLowerCase())}`}>{selectedRequest.priority}</span></p>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-danger" onClick={() => setViewModalOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    </div>
)}

            </AppLayout>


        </>
    );
};

export default Index;
