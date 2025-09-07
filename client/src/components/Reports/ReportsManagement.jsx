import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Search, 
  RefreshCw, 
  BarChart3,
  Loader2,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Users,
  Truck,
  MapPin,
  DollarSign,
  Package,
  Leaf,
  Clock,
  Eye
} from "lucide-react";
import { getReport } from "../../services/ReportService";
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf'

const ReportsManagement = () => {
  const [reportConfig, setReportConfig] = useState({
    reportType: "",
    fromDate: "",
    toDate: "",
    downloadType: "pdf",
    additionalFilters: {}
  });
  const [reportData, setReportData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasGeneratedReport, setHasGeneratedReport] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  const reportTypes = [
    {
      value: "salary",
      label: "Salary Reports",
      icon: DollarSign,
      description: "Employee payroll and compensation data",
      sampleColumns: ["Employee ID", "Name","Month", "Basic Salary", "OT Payment", "Total","Created Date"]
    },
    {
      value: "inventory",
      label: "Inventory Reports",
      icon: Package,
      description: "Stock levels, usage, and inventory movements",
      sampleColumns: ["Item ID", "Product Name", "Category", "Quantity", "Unit Price","Created Date"]
    },
    {
      value: "tea_plucking",
      label: "Tea Plucking Reports",
      icon: Leaf,
      description: "Daily tea collection records",
      sampleColumns: ["Plucking ID", "Worker", "Date", "Weight (Kg)","Rate Per Kg", "Total Payment","Created Date"]
    },
    {
      value: "tasks",
      label: "Task Reports",
      icon: CheckCircle,
      description: "Task assignments, completion, and productivity",
      sampleColumns: ["Task ID", "Task Name", "Description","Task Type", "Status","Creator","Supervisor","Team","Worker","Assigned Date", "Created Date"]
    },
    {
      value: "place",
      label: "Places Reports",
      icon: MapPin,
      description: "Farm sections, areas, and location-based data",
      sampleColumns: ["Place Code","Description", "Area (Hectares)", "Created Date"]
    },
    {
      value: "attendance",
      label: "Attendance Reports",
      icon: Users,
      description: "Employee attendance and working hours",
      sampleColumns: ["Employee", "Date", "Check In", "Check Out","Status", "Hours Worked", "Created Date"]
    },
    {
      value: "workers",
      label: "Workers Reports",
      icon: Users,
      description: "Workers Details",
      sampleColumns: ["Worker ID", "Name","Role","NIC", "Email","Phone", "Address","Gender","Created Date"]
    },
    {
      value: "ai-solutions",
      label: "Solutions Reports",
      icon: BarChart3,
      description: "Tea Diseases and Solutions",
      sampleColumns: ["Disease", "Solution", "Created Date"]
    }
  ];

  const generateData = (reportType, fromDate, toDate,fetchData) => {
    console.log(fetchData);
    const data = [];
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    for (let i = 0; i < fetchData.length; i++) {
      switch (reportType) {
        case "salary":
          data.push({
            "Employee ID": `${fetchData[i].person.personCode}`,
            "Name": `${fetchData[i].person.firstName}`,
            "Month":`${fetchData[i].month}`,
            "Basic Salary": `${fetchData[i].basicSalary}`,
            "OT Payment": `${fetchData[i].otPayment}`,
            "Total": `${fetchData[i].totalPayment}`,
            "Created Date Time" : `${new Date(fetchData[i].createdAt).toLocaleString()}`
          });
          break;
        case "inventory":
          data.push({
            "Item ID": `ITM-${fetchData[i].itemId}`,
            "Product Name": fetchData[i].name,
            "Category": fetchData[i].category,
            "Quantity": `${fetchData[i].quantity} ${fetchData[i].unit? fetchData[i].unit:""}`,
            "Unit Price": `${fetchData[i].unitPrice} LKR`,
            "Created Date Time" : `${new Date(fetchData[i].createdAt).toLocaleString()}`
          });
          break;
        case "tea_plucking":
          data.push({
            "Plucking ID": `TP-${fetchData[i].tpId}`,
            "Worker": `${fetchData[i].person.personCode}`,
            "Date": `${new Date(fetchData[i].date).toDateString()}`,
            "Weight (kg)": `${fetchData[i].weightKg} Kg`,
            "Rate Per Kg": `${fetchData[i].ratePerKg} Kg`,
            "Total Payment": `${fetchData[i].totalPayment}`,
            "Created Date Time" : `${new Date(fetchData[i].createdAt).toLocaleString()}`
          });
          break;
        case "tasks":
          data.push({
            "Task ID": `TSK-${fetchData[i].taskCode}`,
            "Task Name": `${fetchData[i].taskName}`,
            "Description": `${fetchData[i].description}`,
            "Task Type": `${fetchData[i].taskType}`,
            "Status": `${fetchData[i].taskStatus}`,
            "Creator": `${fetchData[i].creator.personCode}`,
            "Supervisor": fetchData[i].supervisor.personCode,
            "Team": fetchData[i].assignedTeam.name,
            "Worker": fetchData[i].worker? fetchData[i].worker.personCode : "",
            "Assigned Date":`${new Date(fetchData[i].startDateTime).toLocaleString()}`,
            "Created Date":`${new Date(fetchData[i].createdAt).toLocaleString()}`
          });
          break;
        case "place":
          data.push({
            "Place Code": `${fetchData[i].placeCode}`,
            "Description": `${fetchData[i].description}`,
            "Area (Hectares)": `${fetchData[i].size}`,
            "Created Date":`${new Date(fetchData[i].createdAt).toLocaleString()}`
          });
          break;
        case "attendance":
          data.push({
            "Employee": `${fetchData[i].person.personCode}`,
            "Date": `${new Date(fetchData[i].currentDate).toDateString()}`,
            "Check In": `${new Date(fetchData[i].startDttm).toLocaleTimeString()}`,
            "Check Out": `${new Date(fetchData[i].endDttm).toLocaleTimeString()}`,
            "Status":`${fetchData[i].status}`,
            "Hours Worked": `${fetchData[i].workHours}`,
            "Created Date": `${new Date(fetchData[i].createdAt).toLocaleString()}`
          });
          break;
        case "workers":
          data.push({
            "Worker ID": `${fetchData[i].personCode}`,
            "Name": `${fetchData[i].firstName}`,
            "Role": `${fetchData[i].role.userRole}`,
            "NIC": `${fetchData[i].nicNumber}`,
            "Email": `${fetchData[i].email?fetchData[i].email : "-"}`,
            "Phone": `${fetchData[i].phone}`,
            "Address": `${fetchData[i].address}`,
            "Gender": `${fetchData[i].gender}`,
            "Created Date": `${new Date(fetchData[i].createdAt).toLocaleString()}`
          });
          break;
        default:
          break;
      }
    }
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportConfig(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };


  const handleGenerateReport = async () => {
    if (!reportConfig.reportType) {
      setError("Please select a report type");
      return;
    }
    if (!reportConfig.fromDate || !reportConfig.toDate) {
      setError("Please select both from and to dates");
      return;
    }
    if (new Date(reportConfig.fromDate) > new Date(reportConfig.toDate)) {
      setError("From date cannot be later than to date");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const reportResponse = await getReport(reportConfig);
      if(reportResponse.data.success)
      {
        if(reportResponse.data.data.length>0)
        {
          const reportData = generateData(
            reportConfig.reportType, 
            reportConfig.fromDate, 
            reportConfig.toDate,
            reportResponse.data.data
          );
          setReportData(reportData);
          setHasGeneratedReport(true);
      }else{
        toast.error("Data not found", {
            position: 'top-center',
          });
      }
    }else{
      toast.error("Something went Wrong", {
            position: 'top-center',
          });
    }
    } catch (err) {
      setError("Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  // Download report
  const handleDownloadReport = async () => {
    if (!hasGeneratedReport || reportData.length === 0) {
      setError("Please generate a report first");
      return;
    }

    setIsDownloading(true);

    try {
      const selectedReportType = reportTypes.find(rt => rt.value === reportConfig.reportType);
      const fileName = `${selectedReportType?.label.replace(/\s+/g, '_')}_${reportConfig.fromDate}_to_${reportConfig.toDate}`;
      
      if (reportConfig.downloadType === "excel") {
        await downloadExcel(fileName, reportData, selectedReportType);
      } else {
        await downloadPDF(fileName, reportData, selectedReportType);
      }
      
    } catch (err) {
      setError("Failed to download report");
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };


  const downloadExcel = async (fileName, data, reportType) => {
    // Create workbook and worksheet
    const ws_data = [
      // Header row
      Object.keys(data[0] || {}),
      // Data rows
      ...data.map(row => Object.values(row))
    ];

    // Create CSV content (Excel compatible)
    const csvContent = ws_data.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    // Add BOM for proper Excel UTF-8 support
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { 
      type: 'application/vnd.ms-excel;charset=utf-8' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Download PDF file using jsPDF
  const downloadPDF = async (fileName, data, reportType) => {
    
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    // Add title
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(reportType?.label || 'Report', 20, yPosition);
    yPosition += 10;

    // Add date range
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Date Range: ${reportConfig.fromDate} to ${reportConfig.toDate}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, yPosition);
    yPosition += 15;

    // Add table headers
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    
    const headers = Object.keys(data[0] || {});
    const columnWidth = (doc.internal.pageSize.width - 40) / headers.length;
    
    headers.forEach((header, index) => {
      doc.text(header, 20 + (index * columnWidth), yPosition);
    });
    yPosition += 8;

    doc.line(20, yPosition, doc.internal.pageSize.width - 20, yPosition);
    yPosition += 5;

    // Add data rows
    doc.setFont(undefined, 'normal');
    data.forEach((row, rowIndex) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }

      Object.values(row).forEach((value, colIndex) => {
        const text = String(value);
        const maxWidth = columnWidth - 5;
        
        // Handle text wrapping for long content
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines[0] || '', 20 + (colIndex * columnWidth), yPosition);
      });
      yPosition += 6;
    });

    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${totalPages} | Tea Factory Management System`,
        20,
        pageHeight - 10
      );
    }

    // Save the PDF
    doc.save(`${fileName}.pdf`);
  };


  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };


  const getDefaultFromDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  };

  // Calculate report stats
  const getReportStats = () => {
    if (!hasGeneratedReport || !reportData.length) return null;

    const totalRecords = reportData.length;
    const dateRange = `${reportConfig.fromDate} to ${reportConfig.toDate}`;
    const selectedReportType = reportTypes.find(rt => rt.value === reportConfig.reportType);

    return {
      totalRecords,
      dateRange,
      reportType: selectedReportType?.label,
      generatedAt: new Date().toLocaleString()
    };
  };

  const stats = getReportStats();

  return (
    <div className="space-y-6">
      <ToastContainer autoClose={2000} />
      {/* Report Configuration */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Reports & Analytics</h2>
            <p className="text-sm text-gray-600 mt-1">Generate and download comprehensive reports</p>
          </div>
          <FileText className="h-8 w-8 text-green-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type *
              </label>
              <select
                name="reportType"
                value={reportConfig.reportType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select report type</option>
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {reportConfig.reportType && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  {React.createElement(reportTypes.find(rt => rt.value === reportConfig.reportType)?.icon, {
                    className: "h-4 w-4 text-blue-600 mt-0.5"
                  })}
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      {reportTypes.find(rt => rt.value === reportConfig.reportType)?.label}
                    </p>
                    <p className="text-xs text-blue-700">
                      {reportTypes.find(rt => rt.value === reportConfig.reportType)?.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date *
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={reportConfig.fromDate}
                  onChange={handleInputChange}
                  max={getCurrentDate()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date *
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={reportConfig.toDate}
                  onChange={handleInputChange}
                  max={getCurrentDate()}
                  min={reportConfig.fromDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Download Format
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="downloadType"
                    value="pdf"
                    checked={reportConfig.downloadType === "pdf"}
                    onChange={handleInputChange}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">PDF</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="downloadType"
                    value="excel"
                    checked={reportConfig.downloadType === "excel"}
                    onChange={handleInputChange}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Excel</span>
                </label>
              </div>
            </div>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-4">
            {reportConfig.reportType && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Report Preview</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  {reportTypes.find(rt => rt.value === reportConfig.reportType)?.sampleColumns.map((col, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-gray-200 last:border-b-0">
                      <span>{col}</span>
                      <span className="text-gray-400">...</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating || !reportConfig.reportType || !reportConfig.fromDate || !reportConfig.toDate}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </button>

              {hasGeneratedReport && (
                <button
                  onClick={handleDownloadReport}
                  disabled={isDownloading}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download {reportConfig.downloadType.toUpperCase()}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Report Stats */}
      {stats && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Records</p>
                  <p className="text-xl font-bold text-green-900 mt-1">{stats.totalRecords}</p>
                </div>
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Report Type</p>
                  <p className="text-sm font-bold text-blue-900 mt-1">{stats.reportType}</p>
                </div>
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Date Range</p>
                  <p className="text-xs font-medium text-purple-900 mt-1">{stats.dateRange}</p>
                </div>
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Generated</p>
                  <p className="text-xs font-medium text-orange-900 mt-1">{stats.generatedAt}</p>
                </div>
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Report Data */}
      {hasGeneratedReport && reportData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Generated Report Data
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{reportData.length} records</span>
                <button
                  onClick={handleDownloadReport}
                  disabled={isDownloading}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm flex items-center"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>

          {isMobile ? (
            /* Mobile Card View */
            <div className="p-4 space-y-3">
              {reportData.slice(0, 10).map((row, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="space-y-2">
                    {Object.entries(row).map(([key, value], idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600 font-medium">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {reportData.length > 10 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    Showing first 10 of {reportData.length} records. Download the full report to view all data.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Desktop Table View */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {Object.keys(reportData[0] || {}).map((header, index) => (
                      <th key={index} className="text-left p-4 font-medium text-gray-600">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.slice(0, 15).map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      {Object.values(row).map((value, idx) => (
                        <td key={idx} className="p-4 text-gray-900 text-sm">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {reportData.length > 15 && (
                <div className="p-4 text-center border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Showing first 15 of {reportData.length} records. Download the full report to view all data.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Quick Report Templates */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Report Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button 
            onClick={() => {
              setReportConfig({
                reportType: "tea_plucking",
                fromDate: getDefaultFromDate(),
                toDate: getCurrentDate(),
                downloadType: "excel"
              });
            }}
            className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <Leaf className="h-5 w-5 text-gray-400 group-hover:text-green-600 mr-2" />
            <span className="text-gray-600 group-hover:text-green-600 font-medium text-sm">
              Monthly Tea Collection
            </span>
          </button>
          
          <button 
            onClick={() => {
              setReportConfig({
                reportType: "salary",
                fromDate: getDefaultFromDate(),
                toDate: getCurrentDate(),
                downloadType: "pdf"
              });
            }}
            className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <DollarSign className="h-5 w-5 text-gray-400 group-hover:text-blue-600 mr-2" />
            <span className="text-gray-600 group-hover:text-blue-600 font-medium text-sm">
              Payroll Summary
            </span>
          </button>
          
          <button 
            onClick={() => {
              setReportConfig({
                reportType: "vehicle",
                fromDate: getDefaultFromDate(),
                toDate: getCurrentDate(),
                downloadType: "excel"
              });
            }}
            className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
          >
            <Truck className="h-5 w-5 text-gray-400 group-hover:text-purple-600 mr-2" />
            <span className="text-gray-600 group-hover:text-purple-600 font-medium text-sm">
              Fleet Status
            </span>
          </button>
          
          <button 
            onClick={() => {
              setReportConfig({
                reportType: "inventory",
                fromDate: getDefaultFromDate(),
                toDate: getCurrentDate(),
                downloadType: "pdf"
              });
            }}
            className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group"
          >
            <Package className="h-5 w-5 text-gray-400 group-hover:text-orange-600 mr-2" />
            <span className="text-gray-600 group-hover:text-orange-600 font-medium text-sm">
              Stock Report
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;