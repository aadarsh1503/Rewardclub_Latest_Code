import React,{useEffect,useState} from 'react'
import TitleView from '../../Components/Main/TitleView'
import DashboardBox from '../../Components/Main/DashboardBox';
import apiClient from '../../utils/ApiClient';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import CommonPopup from '../../Components/Main/CommonPopup';
import TextView from '../../Components/Main/TextView';
import ImportantPopup from '../../Components/Main/ImportantPopup';

function DashboardVendor() {
  const [dashboard, setDashboard] = useState({});
  const [trReport, setTrReport] = useState([]);
  const [leadReport, setLeadReport] = useState([]);
  const [cat, setCat] = useState([]);
  const [catPopup, setCatPopup] = useState(false);
  const [loadingCat, setLoadingCat] = useState(false);

  // Helper function to format numbers
  const formatNumber = (num) => {
    if (!num) return '0';
    return num.toLocaleString();
  };

  const optionsBrand = {
        chart: {
            type: 'bar', // 👈 This sets the chart to bar
             backgroundColor: 'transparent'
        },
        title: {
            text: 'Top 5 Vendors'
        },
        xAxis: {
            categories: dashboard?.vendors_report?.map(item => String(item.vendor_name)),
            title: {
            text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
            text: 'Sales',
            align: 'high'
            },
            labels: {
            overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' units'
        },
        plotOptions: {
            bar: {
            dataLabels: {
                enabled: true
            }
            }
        },
        credits: {
            enabled: true
        },
        series: [
            {
            name: '2025',
            data: dashboard?.vendors_report?.map(item => Number(item.lead_count)),
            }
        ]
    };


    const transaction_options = {
      chart: {
        type: 'line',
         backgroundColor: 'transparent',
         height: 270,
      },
      title: {
        text: 'Weekly Transaction Report (Current Month)'
      },
      xAxis: {
        categories: trReport.map(item => `Week ${item.week_number}`),
       
      },
      yAxis: {
        title: {
          text: 'Amount'
        },
        min: 0
      },
      tooltip: {
        shared: true,
        valuePrefix: '$'
      },
      series: [
        {
          name: 'Total Credit',
          data: dashboard?.transaction_report?.map(item => Number(item.total_credit)),
          color: 'green'
        },
        {
          name: 'Total Debit',
          data: dashboard?.transaction_report?.map(item => Number(item.total_debit)),
          color: 'red'
        }
      ],
      responsive: {
        rules: [{
          condition: {
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };

    const leads_options = {
      chart: {
        type: 'line',
         backgroundColor: 'transparent',
         height: 270,
      },
      title: {
        text: 'Weekly Leads Report (Current Month)'
      },
      xAxis: {
        categories: leadReport.map(item => `Week ${item.week_number}`),
       
      },
      yAxis: {
        title: {
          text: 'Count'
        },
        min: 0
      },
      tooltip: {
        shared: true,
        valuePrefix: '$'
      },
      series: [
        {
          name: 'Total Leads',
          data: dashboard?.leads_report?.map(item => Number(item.total_leads)),
          color: 'green'
        }
      ],
      responsive: {
        rules: [{
          condition: {
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };

    useEffect(() => {
        fetchDashboard();
    },[]);

    
    const handleCatListClick = (index) => {
      addCategory(cat[index].id)
    };


    ///API CALLING
    const fetchDashboard = async () => {
      setLoadingCat(true);
      try {
      const response = await apiClient.get("/vendor/get_dashboard");
      if (response?.result?.status === 1) {
          console.warn("Get Transaction successfully");
          setDashboard(response.result);
          setTrReport(response.result.transaction_report);
          setLeadReport(response.result.transaction_report);
          setCat(response.result.categorys);
          if(response.result.catData.length == 0)
          {
            setCatPopup(true)
          }
          else
          {
            setCatPopup(false)
          }

      } else {
          console.warn("No Transaction found or status != 1");
      }
      } catch (error) {
      console.error("Failed to fetch Transaction:", error);
      } finally {
      setLoadingCat(false);
      }
    };

    const addCategory = async (id) => {
      setLoadingCat(true)
      try {

          const payload = {
              id: id
          };

          console.log("SANTHOSH payload: "+payload)
          
          //console.log("SANTHOSH Vendor ID:", payload);
          const data = await apiClient.post("/vendor/add_vendor_category", payload);

          //if (data && data.result?.data.status === 1) {
          if (data?.result?.status === 1) {
                //getCategory();
                
          }
      } catch (err) {
          console.error("Something went wrong fetching vendors", err);
      }
      finally {
        setLoadingCat(false); // Hide loader
        setCatPopup(false)
      }
  };



  // Sexy stat card styles
  const statCardStyle = (gradient, shadowColor) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: '20px',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: `0 8px 24px ${shadowColor}`,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  });

  const iconStyle = (gradient) => ({
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    background: gradient,
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    flexShrink: 0
  });

  return (
    <div className='content-view'>
      <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px'
            }}>

               <div style={{
                  width: '30%',
                  minWidth: '280px',
                  height: '100%',
                  backgroundColor: 'transparent', 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  padding: '8px'
                }}>

                  {/* Sexy Stats Cards */}
                  <div style={statCardStyle('linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'rgba(102, 126, 234, 0.25)')}>
                    <div style={iconStyle('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')}>👥</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1a1a2e' }}>{formatNumber(dashboard?.member_total)}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666', fontWeight: '500' }}>Total Members</p>
                    </div>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 100%)', borderRadius: '50%' }}></div>
                  </div>

                  <div style={statCardStyle('linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', 'rgba(17, 153, 142, 0.25)')}>
                    <div style={iconStyle('linear-gradient(135deg, #11998e 0%, #38ef7d 100%)')}>📊</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1a1a2e' }}>{formatNumber(dashboard?.leads_total)}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666', fontWeight: '500' }}>Total Leads</p>
                    </div>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(17, 153, 142, 0.2) 0%, rgba(56, 239, 125, 0.1) 100%)', borderRadius: '50%' }}></div>
                  </div>

                  <div style={statCardStyle('linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'rgba(240, 147, 251, 0.25)')}>
                    <div style={iconStyle('linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')}>💰</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1a1a2e' }}>{formatNumber(dashboard?.transaction_total)}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666', fontWeight: '500' }}>Transactions</p>
                    </div>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.2) 0%, rgba(245, 87, 108, 0.1) 100%)', borderRadius: '50%' }}></div>
                  </div>

                  <div style={statCardStyle('linear-gradient(135deg, #f8d307 0%, #ffa751 100%)', 'rgba(248, 211, 7, 0.25)')}>
                    <div style={iconStyle('linear-gradient(135deg, #f8d307 0%, #ffa751 100%)')}>🏆</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1a1a2e' }}>{formatNumber(dashboard?.vendor_total)}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666', fontWeight: '500' }}>Active Vendors</p>
                    </div>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(248, 211, 7, 0.2) 0%, rgba(255, 167, 81, 0.1) 100%)', borderRadius: '50%' }}></div>
                  </div>

              </div>

              <div style={{
                  width: '35%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px'
                }}>

                  {/* Transaction Chart - Sexy Design */}
                  <div style={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    height: '100%'
                  }}>
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '8px', height: '24px', background: 'linear-gradient(180deg, #f093fb 0%, #f5576c 100%)', borderRadius: '4px' }}></span>
                        Transaction Trends
                      </h3>
                      <p style={{ margin: '6px 0 0 18px', fontSize: '13px', color: '#888' }}>Weekly credit vs debit analysis</p>
                    </div>
                    <HighchartsReact highcharts={Highcharts} options={transaction_options} />
                  </div>
                  

              </div>

              <div style={{
                  boxSizing: 'border-box',
                  width: '35%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px'
              }}>

                {/* Leads Chart - Sexy Design */}
                <div style={{
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  borderRadius: '24px',
                  padding: '24px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  height: '100%'
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '8px', height: '24px', background: 'linear-gradient(180deg, #11998e 0%, #38ef7d 100%)', borderRadius: '4px' }}></span>
                      Lead Generation
                    </h3>
                    <p style={{ margin: '6px 0 0 18px', fontSize: '13px', color: '#888' }}>Weekly lead performance</p>
                  </div>
                  <HighchartsReact highcharts={Highcharts} options={leads_options} />
                </div>
                  
            </div>
      </div>
      {/* Category Selection Popup */}
      {catPopup && (
        <ImportantPopup>
          <div className="category-popup-content">
            <TextView type="darkBold" text="Select Your Brand Type" />
            <p className="category-subtitle">Choose the category that best describes your business</p>
            
            <div className="category-list">
              {loadingCat ? (
                <div className="loader-container">
                  <div className="spinner"></div>
                  <p>Loading categories...</p>
                </div>
              ) : (
                cat.map((catItems, index) => (
                  <div className="category-item" key={index}>
                    <DashboardBox>
                      <div className="category-item-content" onClick={() => handleCatListClick(index)}>
                        <div className="category-info">
                          <TextView type="darkBold" text={catItems?.name} />
                          <p className="category-description">Click to select this category</p>
                        </div>
                        <div className="category-arrow">→</div>
                      </div>
                    </DashboardBox>
                  </div>
                ))
              )}
            </div>
          </div>
        </ImportantPopup>
      )}
    </div>
  )
}

export default DashboardVendor
