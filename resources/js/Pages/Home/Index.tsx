import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppLayout from "@/Layouts/AppLayout";
import axios from "axios";
import { Request } from "@/../src/interfaces/Request";
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Index = () => {
    const [showFilters, setShowFilters] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [requestData, setRequestData] = useState({
        floor: "",
        room_unit: "",
        block: "",
        guest_name: "",
        phone_number: "",
        file: null,
        service: '',
        department: '',
        priority: '',
        location: '',
        requested_by: '',
        assigned_to: '',
    });
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);

    const handleViewRequest = (request: Request) => {
        setSelectedRequest(request);
        setViewModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRequestData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setRequestData((prevData: any) => ({
                ...prevData,
                file: files[0],
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in requestData) {
                if (requestData[key as keyof typeof requestData]) {
                    formData.append(key, requestData[key as keyof typeof requestData] as string);
                }
            }

            await axios.post("http://127.0.0.1:8000/api/requests", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setRequestData({
                floor: "",
                room_unit: "",
                block: "",
                guest_name: "",
                phone_number: "",
                file: null,
                service: '',
                department: '',
                priority: '',
                location: '',
                requested_by: '',
                assigned_to: '',
            });
            setShowModal(false);
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
        }
    };

    const handleEditClick = (request: Request) => {
        setSelectedRequest(request);
        setRequestData({
            floor: request.floor,
            room_unit: request.room_unit,
            block: request.block,
            guest_name: request.guest_name,
            phone_number: request.phone_number,
            file: null,
            service: request.service,
            department: request.department,
            priority: request.priority,
            location: request.location,
            requested_by: request.requested_by,
            assigned_to: request.assigned_to || '',
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!selectedRequest) return;

            const formData = new FormData();
            for (const key in requestData) {
                if (requestData[key as keyof typeof requestData]) {
                    formData.append(key, requestData[key as keyof typeof requestData] as string);
                    console.log(key, requestData[key as keyof typeof requestData]);
                }
            }

            await axios.post(`http://127.0.0.1:8000/api/requests/${selectedRequest.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setRequestData({
                floor: "",
                room_unit: "",
                block: "",
                guest_name: "",
                phone_number: "",
                file: null,
                service: '',
                department: '',
                priority: '',
                location: '',
                requested_by: '',
                assigned_to: '',
            });
            setShowEditModal(false);
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
        }
    };

    const [requests, setRequests] = useState<Request[]>([]);
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

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
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority.toUpperCase()) {
            case 'HIGH':
                return 'bg-danger';
            case 'MEDIUM':
                return 'bg-warning';
            case 'LOW':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case 'NEW':
                return <span className="badge bg-warning text-dark">NEW</span>;
            case 'IN_PROGRESS':
                return <span className="badge bg-success">IN PROGRESS</span>;
            case 'ON_HOLD':
                return <span className="badge bg-purple">ON HOLD</span>;
            case 'REJECTED':
                return <span className="badge bg-danger">REJECTED</span>;
            case 'CANCELLED':
                return <span className="badge bg-black">CANCELLED</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
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
            confirmButtonColor: '#830823',
            cancelButtonText: 'Cancel',
            iconColor: '#830823',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/requests/${request.id}`);
                    Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
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

        return (
            (searchTextLower === '' ||
                request.id.toString().toLowerCase().includes(searchTextLower) ||
                request.location?.toLowerCase().includes(searchTextLower) ||
                request.service?.toLowerCase().includes(searchTextLower) ||
                request.department?.toLowerCase().includes(searchTextLower) ||
                request.requested_by?.toLowerCase().includes(searchTextLower) ||
                request.assigned_to?.toLowerCase().includes(searchTextLower) ||
                request.priority?.toLowerCase().includes(searchTextLower) ||
                request.status?.toLowerCase().includes(searchTextLower) ||
                request.phone_number?.toLowerCase().includes(searchTextLower) ||
                request.floor?.toLowerCase().includes(searchTextLower) ||
                request.room_unit?.toLowerCase().includes(searchTextLower) ||
                request.block?.toLowerCase().includes(searchTextLower) ||
                request.guest_name?.toLowerCase().includes(searchTextLower)) &&
            (!selectedDate || (request.created_at && new Date(request.created_at).toLocaleDateString() === selectedDate.toLocaleDateString())) &&
            (selectedDepartment === '' || request.department === selectedDepartment) &&
            (selectedStatus === '' || request.status === selectedStatus)
        );
    });

    const countNew = filteredRequests.filter(request => request.status === 'NEW').length;
    const countInProgress = filteredRequests.filter(request => request.status === 'IN_PROGRESS').length;
    const countOnHold = filteredRequests.filter(request => request.status === 'ON_HOLD').length;
    const countRejected = filteredRequests.filter(request => request.status === 'REJECTED').length;
    const countCancelled = filteredRequests.filter(request => request.status === 'CANCELLED').length;

    const totalPages = Math.ceil(filteredRequests.length / pageSize);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleNewRequestClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const generatePDF = () => {
        const input = document.getElementById('table-container');
        if (input) {
            html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('landscape', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                pdf.save("download.pdf");
            });
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (

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
                                        {showFilters && (
                                        <div className="d-flex">
                                            <div className="col-md-4">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-search" />
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
                                    )}
                                        </div>
                                        <div className="col-md-3 text-end">
                                        <button className="btn btn-dark"  onClick={toggleFilters}>
                                        <i className="bi bi-funnel" />
                                    </button>
                                    <button className="btn btn-dark ms-2" onClick={generatePDF}>
                                        <i className="bi bi-download" />
                                    </button>
                                        </div>
                                    </div>

                                    <div className="card rounded-3">
                                        <div id="table-container" className="table-responsive rounded-3">
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
                                                                    <a className="text-secondary" style={{ cursor: 'pointer' }} onClick={() => handleViewRequest(request)}>
                                                                        <i className="bi bi-eye" />
                                                                    </a>

                                                                    <a className="text-success ms-2" style={{ cursor: 'pointer' }} onClick={() => handleEditClick(request)}>
                                                                        <i className="bi bi-pencil" />
                                                                    </a>
                                                                    <a href="#" className="text-danger ms-2" style={{ cursor: 'pointer' }} onClick={() => handleDeleteRequest(request)}>
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
                        <div className="modal-dialog modal-lg">
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
                                                    name="floor"
                                                    value={requestData.floor}
                                                    onChange={handleInputChange}
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
                                                    name="room_unit"
                                                    value={requestData.room_unit}
                                                    onChange={handleInputChange}
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
                                                name="block"
                                                value={requestData.block}
                                                onChange={handleInputChange}
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
                                                name="guest_name"
                                                value={requestData.guest_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phone_number"
                                                value={requestData.phone_number}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Service</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="service"
                                                value={requestData.service}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="row">
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Department</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="department"
                                                value={requestData.department}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                            <div className="mb-3 col-6">
                                                <label className="form-label">Priority</label>
                                                <select
                                                    className="form-select"
                                                    name="priority"
                                                    value={requestData.priority}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Choose Priority...</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Location</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="location"
                                                value={requestData.location}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Requested By</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="requested_by"
                                                value={requestData.requested_by}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Assigned To</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="assigned_to"
                                                value={requestData.assigned_to}
                                                onChange={handleInputChange}
                                            />
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
                        <div className="modal-dialog modal-lg">
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
                                                    name="floor"
                                                    value={requestData.floor}
                                                    onChange={handleInputChange}
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
                                                    name="room_unit"
                                                    value={requestData.room_unit}
                                                    onChange={handleInputChange}
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
                                                name="block"
                                                value={requestData.block}
                                                onChange={handleInputChange}
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
                                                name="guest_name"
                                                value={requestData.guest_name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phone_number"
                                                value={requestData.phone_number}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Service</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="service"
                                                value={requestData.service}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="row">
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Department</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="department"
                                                value={requestData.department}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                            <div className="mb-3 col-6">
                                                <label className="form-label">Priority</label>
                                                <select
                                                    className="form-select"
                                                    name="priority"
                                                    value={requestData.priority}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Choose Priority...</option>
                                                    <option value="HIGH">High</option>
                                                    <option value="MEDIUM">Medium</option>
                                                    <option value="LOW">Low</option>
                                                </select>
                                            </div>
                                            <div className="mb-3 col-6">
                                                <label className="form-label">Location</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="location"
                                                    value={requestData.location}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="mb-3 col-6">
                                                <label className="form-label">Requested By</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="requested_by"
                                                    value={requestData.requested_by}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Assigned To</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="assigned_to"
                                                    value={requestData.assigned_to}
                                                    onChange={handleInputChange}
                                                />
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

    );
};

export default Index;
