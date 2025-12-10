import React, { useEffect, useState } from 'react'
import DashboardBox from '../../Components/Main/DashboardBox'
import TextView from '../../Components/Main/TextView'
import DateWithIcon from '../../Components/Main/DateWithIcon'
import StatusBadge from '../../Components/Main/StatusBadge'
import CommonDatePicker from '../../Components/Main/CommonDatePicker'
import apiClient from '../../utils/ApiClient'
import InputText from '../../Components/Main/InputText'
import DotBadge from '../../Components/Main/DotBadge'

function ReportVendor() {
  const [activeTab, setActiveTab] = useState('leads')
  const [loading, setLoading] = useState(false)
  const [leads, setLeads] = useState([])
  const [transactions, setTransactions] = useState([])
  const [redeems, setRedeems] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [activeTab, startDate, endDate])

  useEffect(() => {
    console.log('Dates changed:', { startDate, endDate, activeTab })
  }, [startDate, endDate, activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      let response
      switch (activeTab) {
        case 'leads':
          response = await apiClient.get('/vendor/getleads')
          if (response?.result?.status === 1) {
            setLeads(response.result.data || [])
          }
          break
        case 'transactions':
          response = await apiClient.get('/vendor/get_transaction')
          if (response?.result?.status === 1) {
            setTransactions(response.result.data || [])
          }
          break
        case 'redeems':
          response = await apiClient.get('/vendor/get_redeem')
          if (response?.result?.status === 1) {
            setRedeems(response.result.data || [])
          }
          break
        default:
          break
      }
    } catch (error) {
      console.error(`Failed to fetch ${activeTab}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const filterData = (data) => {
    let filteredData = data

    // Apply date filtering
    if (startDate || endDate) {
      console.log('Date filtering:', { startDate, endDate, activeTab })
      filteredData = filteredData.filter(item => {
        let itemDate
        if (activeTab === 'leads') {
          itemDate = new Date(item.created_at)
        } else if (activeTab === 'transactions') {
          itemDate = new Date(item.transaction_created_at)
        } else if (activeTab === 'redeems') {
          itemDate = new Date(item.redeem_created_at)
        }

        if (!itemDate || isNaN(itemDate.getTime())) {
          console.log('Invalid date for item:', item)
          return false
        }

        const start = startDate ? new Date(startDate) : null
        const end = endDate ? new Date(endDate) : null

        if (start && end) {
          // Set end date to end of day for inclusive filtering
          const endOfDay = new Date(end)
          endOfDay.setHours(23, 59, 59, 999)
          const result = itemDate >= start && itemDate <= endOfDay
          console.log('Date range filter:', { itemDate, start, endOfDay, result })
          return result
        } else if (start) {
          const result = itemDate >= start
          console.log('Start date filter:', { itemDate, start, result })
          return result
        } else if (end) {
          // Set end date to end of day for inclusive filtering
          const endOfDay = new Date(end)
          endOfDay.setHours(23, 59, 59, 999)
          const result = itemDate <= endOfDay
          console.log('End date filter:', { itemDate, endOfDay, result })
          return result
        }
        return true
      })
      console.log('After date filtering:', filteredData.length, 'items')
    }

    // Apply text search filtering
    if (searchTerm) {
      filteredData = filteredData.filter(item => {
        const searchLower = searchTerm.toLowerCase()
        if (activeTab === 'leads') {
          return (
            item.vendor_name?.toLowerCase().includes(searchLower) ||
            item.lead_status?.toString().includes(searchLower) ||
            item.lead_id?.toString().includes(searchLower)
          )
        } else if (activeTab === 'transactions') {
          return (
            item.transaction_title?.toLowerCase().includes(searchLower) ||
            item.vendor_name?.toLowerCase().includes(searchLower) ||
            item.transaction_id?.toString().includes(searchLower)
          )
        } else if (activeTab === 'redeems') {
          return (
            item.notes?.toLowerCase().includes(searchLower) ||
            item.redeem_status?.toString().includes(searchLower) ||
            item.redeem_id?.toString().includes(searchLower)
          )
        }
        return false
      })
      console.log('After text filtering:', filteredData.length, 'items')
    }

    return filteredData
  }



  const getStatusText = (status, type) => {
    if (type === 'leads') {
      switch (status) {
        case 0: return 'Pending'
        case 1: return 'Review'
        case 2: return 'Processing'
        case 3: return 'Done'
        case 4: return 'Rejected'
        default: return 'Unknown'
      }
    } else if (type === 'redeems') {
      switch (status) {
        case 0: return 'Pending'
        case 1: return 'Approved'
        case 2: return 'Rejected'
        default: return 'Unknown'
      }
    }
    return status
  }

  const getStatusColor = (status, type) => {
    if (type === 'leads' || type === 'redeems') {
      switch (status) {
        case 0: return 'warning'
        case 1: return 'success'
        case 2: return 'error'
        default: return 'default'
      }
    }
    return 'default'
  }

  const renderLeadsTable = () => {
    const filteredLeads = filterData(leads)
    
    return (
      <div className="report-table-container">
        <div className="report-table-header">
          <div className="report-table-cell">Date</div>
          <div className="report-table-cell">Vendor</div>
          <div className="report-table-cell">Status</div>
          <div className="report-table-cell">Lead ID</div>
        </div>
        <div className="report-table-body">
          {filteredLeads.length === 0 ? (
            <div className="no-data-message">
              <TextView type="subDark" text="No leads found" />
            </div>
          ) : (
            filteredLeads.map((lead, index) => (
              <div key={index} className="report-table-row">
                <div className="report-table-cell" data-label="Date">
                  <DateWithIcon text={new Date(lead.created_at).toLocaleDateString()} />
                </div>
                <div className="report-table-cell" data-label="Vendor">
                  <TextView type="subDarkBold" text={lead.vendor_name || 'N/A'} />
                </div>
                <div className="report-table-cell" data-label="Status">
                  <DotBadge status={lead.lead_status} type="leads" />
                  <TextView type="subDark" text={getStatusText(lead.lead_status, 'leads')} />
                </div>
                <div className="report-table-cell" data-label="Lead ID">
                  <TextView type="subDark" text={`#${lead.lead_id}`} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  const renderTransactionsTable = () => {
    const filteredTransactions = filterData(transactions)
    
    return (
      <div className="report-table-container">
        <div className="report-table-header">
          <div className="report-table-cell">Date</div>
          <div className="report-table-cell">Title</div>
          <div className="report-table-cell">Vendor</div>
          <div className="report-table-cell">Amount</div>
          <div className="report-table-cell">Type</div>
        </div>
        <div className="report-table-body">
          {filteredTransactions.length === 0 ? (
            <div className="no-data-message">
              <TextView type="subDark" text="No transactions found" />
            </div>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <div key={index} className="report-table-row">
                <div className="report-table-cell" data-label="Date">
                  <DateWithIcon text={new Date(transaction.transaction_created_at).toLocaleDateString()} />
                </div>
                <div className="report-table-cell" data-label="Title">
                  <TextView type="subDarkBold" text={transaction.transaction_title || 'N/A'} />
                </div>
                <div className="report-table-cell" data-label="Vendor">
                  <TextView type="subDark" text={transaction.vendor_name || 'N/A'} />
                </div>
                <div className="report-table-cell" data-label="Amount">
                  <TextView 
                    type="darkBold" 
                    text={transaction.transaction_type === 1 ? transaction.transaction_cr : transaction.transaction_dr} 
                  />
                </div>
                <div className="report-table-cell" data-label="Type">
                  <TextView 
                    type="subDarkBold" 
                    text={transaction.transaction_type === 1 ? "Credit" : "Debit"} 
                    style={{color: transaction.transaction_type === 1 ? 'green' : 'red'}}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  const renderRedeemsTable = () => {
    const filteredRedeems = filterData(redeems)
    
    return (
      <div className="report-table-container">
        <div className="report-table-header">
          <div className="report-table-cell">Date</div>
          <div className="report-table-cell">Notes</div>
          <div className="report-table-cell">Points</div>
          <div className="report-table-cell">Status</div>
          <div className="report-table-cell">Redeem ID</div>
        </div>
        <div className="report-table-body">
          {filteredRedeems.length === 0 ? (
            <div className="no-data-message">
              <TextView type="subDark" text="No redeems found" />
            </div>
          ) : (
            filteredRedeems.map((redeem, index) => (
              <div key={index} className="report-table-row">
                <div className="report-table-cell" data-label="Date">
                  <DateWithIcon text={new Date(redeem.redeem_created_at).toLocaleDateString()} />
                </div>
                <div className="report-table-cell" data-label="Notes">
                  <TextView type="subDarkBold" text={redeem.notes || 'N/A'} />
                </div>
                <div className="report-table-cell" data-label="Points">
                  <TextView type="darkBold" text={redeem.point || '0'} />
                </div>
                <div className="report-table-cell" data-label="Status">
                  <DotBadge status={redeem.lead_status} type="leads" />
                  <TextView type="subDark" text={getStatusText(redeem.redeem_status, 'redeems')} />
                </div>
                <div className="report-table-cell" data-label="Redeem ID">
                  <TextView type="subDark" text={`#${redeem.redeem_id}`} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  const renderSummaryCards = () => {
    const totalLeads = leads.length
    const totalTransactions = transactions.length
    const totalRedeems = redeems.length
    
    const approvedLeads = leads.filter(lead => lead.lead_status === 1).length
    const approvedRedeems = redeems.filter(redeem => redeem.redeem_status === 1).length
    
    const totalCredits = transactions
      .filter(t => t.transaction_type === 1)
      .reduce((sum, t) => sum + (parseFloat(t.transaction_cr) || 0), 0)
    
    const totalDebits = transactions
      .filter(t => t.transaction_type !== 1)
      .reduce((sum, t) => sum + (parseFloat(t.transaction_dr) || 0), 0)
    
    const totalPoints = redeems
      .filter(r => r.redeem_status === 1)
      .reduce((sum, r) => sum + (parseFloat(r.point) || 0), 0)

    const cardStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '18px',
      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
      borderRadius: '16px',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      marginBottom: '12px',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'visible'
    }

    const iconStyle = (gradient) => ({
      width: '50px',
      height: '50px',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      background: gradient,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      flexShrink: 0
    })

    const contentStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      minWidth: 0
    }

    const pointsStyle = {
      padding: '12px 18px',
      background: 'linear-gradient(135deg, #f8d307 0%, #e6c200 100%)',
      borderRadius: '12px',
      boxShadow: '0 4px 14px rgba(248,211,7,0.4)',
      flexShrink: 0
    }

    const labelStyle = {
      fontSize: '13px',
      color: '#666',
      margin: 0,
      fontWeight: '500'
    }

    const subLabelStyle = {
      fontSize: '11px',
      color: '#888',
      margin: 0
    }

    const valueStyle = {
      fontSize: '22px',
      fontWeight: '700',
      color: '#222',
      margin: 0
    }

    return (
      <div style={{ padding: '12px 8px', width: '100%', boxSizing: 'border-box' }}>
        <div style={cardStyle}>
          <div style={iconStyle('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')}>📊</div>
          <div style={contentStyle}>
            <p style={labelStyle}>Total Leads</p>
            <p style={subLabelStyle}>{approvedLeads} Approved</p>
          </div>
          <div style={pointsStyle}>
            <p style={valueStyle}>{totalLeads}</p>
          </div>
        </div>
        
        <div style={cardStyle}>
          <div style={iconStyle('linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')}>💰</div>
          <div style={contentStyle}>
            <p style={labelStyle}>Net Balance</p>
            <p style={subLabelStyle}>{totalCredits.toFixed(0)} Credits</p>
          </div>
          <div style={pointsStyle}>
            <p style={valueStyle}>{(totalCredits - totalDebits).toFixed(0)}</p>
          </div>
        </div>
        
        <div style={cardStyle}>
          <div style={iconStyle('linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)')}>🎁</div>
          <div style={contentStyle}>
            <p style={labelStyle}>Total Redeems</p>
            <p style={subLabelStyle}>{totalPoints} Points Used</p>
          </div>
          <div style={pointsStyle}>
            <p style={valueStyle}>{totalRedeems}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'leads':
        return renderLeadsTable()
      case 'transactions':
        return renderTransactionsTable()
      case 'redeems':
        return renderRedeemsTable()
      default:
        return null
    }
  }

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    let csvContent = ''
    let headers = []
    
    if (activeTab === 'leads') {
      headers = ['Date', 'Vendor', 'Status', 'Lead ID']
      csvContent = headers.join(',') + '\n'
      data.forEach(lead => {
        const row = [
          new Date(lead.created_at).toLocaleDateString(),
          lead.vendor_name || 'N/A',
          getStatusText(lead.lead_status, 'leads'),
          lead.lead_id
        ]
        csvContent += row.join(',') + '\n'
      })
    } else if (activeTab === 'transactions') {
      headers = ['Date', 'Title', 'Vendor', 'Amount', 'Type']
      csvContent = headers.join(',') + '\n'
      data.forEach(transaction => {
        const row = [
          new Date(transaction.transaction_created_at).toLocaleDateString(),
          transaction.transaction_title || 'N/A',
          transaction.vendor_name || 'N/A',
          transaction.transaction_type === 1 ? transaction.transaction_cr : transaction.transaction_dr,
          transaction.transaction_type === 1 ? 'Credit' : 'Debit'
        ]
        csvContent += row.join(',') + '\n'
      })
    } else if (activeTab === 'redeems') {
      headers = ['Date', 'Notes', 'Points', 'Status', 'Redeem ID']
      csvContent = headers.join(',') + '\n'
      data.forEach(redeem => {
        const row = [
          new Date(redeem.redeem_created_at).toLocaleDateString(),
          redeem.notes || 'N/A',
          redeem.point || '0',
          getStatusText(redeem.redeem_status, 'redeems'),
          redeem.redeem_id
        ]
        csvContent += row.join(',') + '\n'
      })
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = () => {
    let data, filename
    switch (activeTab) {
      case 'leads':
        data = filterData(leads)
        filename = 'leads_report'
        break
      case 'transactions':
        data = filterData(transactions)
        filename = 'transactions_report'
        break
      case 'redeems':
        data = filterData(redeems)
        filename = 'redeems_report'
        break
      default:
        return
    }
    exportToCSV(data, filename)
  }

  const clearFilters = () => {
    setStartDate('')
    setEndDate('')
    setSearchTerm('')
  }

  const hasActiveFilters = () => {
    return startDate || endDate || searchTerm
  }

  return (

<div  className='content-view'>
        <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '16px'
            }}>

                <div style={{
                  width: '30%',
                  minWidth: '280px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2px'
                }}>
                    <DashboardBox>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                            <div className="tab-container">
                                <button 
                                    className={`tab-button ${activeTab === 'leads' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('leads')}
                                >
                                    <TextView type="subDarkBold" text="Leads" />
                                </button>
                                <button 
                                    className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('transactions')}
                                >
                                    <TextView type="subDarkBold" text="Transactions" />
                                </button>
                                <button 
                                    className={`tab-button ${activeTab === 'redeems' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('redeems')}
                                >
                                    <TextView type="subDarkBold" text="Redeems" />
                                </button>
                            </div>

                            <div >
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '0px',
                                    marginTop: '0px',
                                    justifyContent: 'space-between',
                                    padding: '0px',
                                }}>
                                    <CommonDatePicker
                                    style={{
                                        width: '40%',
                                    }}
                                    label="Start Date"
                                    value={startDate}
                                    onChange={setStartDate}
                                    placeholder="Start Date"
                                    />
                                    <CommonDatePicker
                                    style={{
                                        width: '40%',
                                    }}
                                    label="End Date"
                                    value={endDate}
                                    onChange={setEndDate}
                                    placeholder="End Date"
                                    />
                                </div>

                                <div style={{
                                    height: '60px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent:'center',
                                    justifyItems: 'center',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                    }}> 

                                    <InputText 
                                            type="text"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />

                                </div>

                            </div>

                            {renderSummaryCards()}


                            <div >
                                {hasActiveFilters() && (
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#666',
                                            marginRight: '0px',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            justifyItems: 'center',
                                            alignItems: 'center',
                                            marginTop: '20px',
                                            textAlign: 'center',
                                        }}>
                                            {(() => {
                                                let totalItems, filteredItems
                                                switch (activeTab) {
                                                    case 'leads':
                                                        totalItems = leads.length
                                                        filteredItems = filterData(leads).length
                                                        break
                                                    case 'transactions':
                                                        totalItems = transactions.length
                                                        filteredItems = filterData(transactions).length
                                                        break
                                                    case 'redeems':
                                                        totalItems = redeems.length
                                                        filteredItems = filterData(redeems).length
                                                        break
                                                    default:
                                                        return null
                                                }
                                                return `Showing ${filteredItems} of ${totalItems} items`
                                            })()}
                                        </div>
                                )}
                            </div>

                            

                            <div className="search-export-controls">
                                {hasActiveFilters() && (
                                    <button 
                                        className="clear-filters-button"
                                        onClick={clearFilters}
                                    >
                                        🗑️ Clear Filters
                                    </button>
                                )}
                                
                                
                                   
                                    <button 
                                    className="export-button"
                                    onClick={handleExport}
                                    disabled={loading}
                                    >
                                    📊 Export CSV
                                    </button>
                            </div>

                            </div>

                        </div>

                    </DashboardBox>
                </div>

                <div style={{
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2px',
                  minWidth: 0
                }}>
                    <DashboardBox style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="report-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        {loading ? (
                            <div className="loading-container">
                            <div className="spinner"></div>
                            <TextView type="subDark" text="Loading..." />
                            </div>
                        ) : (
                            renderContent()
                        )}
                        </div>
                    </DashboardBox>
                </div>
            </div>
    </div>
)}

export default ReportVendor
