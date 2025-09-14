import React, { useState } from 'react';
import { Table, Input, Button, Spinner } from 'reactstrap';
import { FaSearch, FaEdit, FaEye } from 'react-icons/fa';

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  searchPlaceholder = "Search...",
  onEdit = null,
  onView = null,
  emptyMessage = "No data found",
  tableHeight = "auto",
  searchable = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    
    return columns.some(column => {
      const value = getNestedValue(item, column.key);
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Helper function to get nested object values
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current && current[key], obj);
  };

  // Render cell content
  const renderCellContent = (item, column) => {
    const value = getNestedValue(item, column.key);
    
    // If column has a custom render function, use it
    if (column.render) {
      return column.render(value, item);
    }
    
    // Default rendering - handle different data types
    if (value === null || value === undefined) {
      return '-';
    }
    
    // If it's a number and should be formatted as currency
    if (typeof value === 'number' && (column.key.includes('price') || column.key.includes('Price'))) {
      return `$${value.toFixed(2)}`;
    }
    
    // If it's a date string
    if (column.key.includes('date') || column.key.includes('Date')) {
      try {
        return new Date(value).toLocaleDateString();
      } catch (e) {
        return value.toString();
      }
    }
    
    return value.toString();
  };

  // Render action buttons
  const renderActions = (item) => {
    return (
      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
        {onView && (
          <Button
            size="sm"
            color="info"
            onClick={() => onView(item)}
            title="View Details"
            style={{ padding: '4px 8px' }}
          >
            <FaEye size={12} />
          </Button>
        )}
        {onEdit && (
          <Button
            size="sm"
            color="warning"
            onClick={() => onEdit(item)}
            title="Edit"
            style={{ padding: '4px 8px' }}
          >
            <FaEdit size={12} />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
      {/* Search Bar */}
      {searchable && (
        <div style={{ 
          padding: '15px', 
          borderBottom: '1px solid #dee2e6',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{ 
            position: 'relative', 
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <FaSearch 
              style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#6c757d',
                zIndex: 1
              }} 
            />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '40px',
                border: '2px solid #dee2e6',
                borderRadius: '25px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          backgroundColor: 'white'
        }}>
          <Spinner color="primary" />
          <p style={{ marginTop: '10px', color: '#6c757d' }}>Loading data...</p>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div style={{ 
          overflowX: 'auto',
          maxHeight: tableHeight === 'auto' ? 'none' : tableHeight
        }}>
          <Table 
            bordered 
            hover 
            responsive 
            style={{ 
              marginBottom: 0,
              fontSize: '14px'
            }}
          >
            <thead style={{ backgroundColor: '#f8f9fa', position: 'sticky', top: 0 }}>
              <tr>
                {columns.map((column, index) => (
                  <th 
                    key={index}
                    style={{ 
                      padding: '12px',
                      textAlign: column.align || 'left',
                      width: column.width || 'auto',
                      fontWeight: '600',
                      color: '#495057',
                      borderBottom: '2px solid #dee2e6'
                    }}
                  >
                    {column.title}
                  </th>
                ))}
                {(onEdit || onView) && (
                  <th 
                    style={{ 
                      padding: '12px',
                      textAlign: 'center',
                      width: '100px',
                      fontWeight: '600',
                      color: '#495057',
                      borderBottom: '2px solid #dee2e6'
                    }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (onEdit || onView ? 1 : 0)}
                    style={{ 
                      textAlign: 'center', 
                      padding: '40px',
                      color: '#6c757d',
                      fontStyle: 'italic'
                    }}
                  >
                    {searchTerm ? `No results found for "${searchTerm}"` : emptyMessage}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, rowIndex) => (
                  <tr 
                    key={rowIndex}
                    style={{ 
                      backgroundColor: rowIndex % 2 === 0 ? 'white' : '#f8f9fa'
                    }}
                  >
                    {columns.map((column, colIndex) => (
                      <td 
                        key={colIndex}
                        style={{ 
                          padding: '12px',
                          textAlign: column.align || 'left',
                          verticalAlign: 'middle',
                          borderColor: '#dee2e6'
                        }}
                      >
                        {renderCellContent(item, column)}
                      </td>
                    ))}
                    {(onEdit || onView) && (
                      <td 
                        style={{ 
                          padding: '12px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderColor: '#dee2e6'
                        }}
                      >
                        {renderActions(item)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* Results Summary */}
      {!loading && filteredData.length > 0 && (
        <div style={{ 
          padding: '10px 15px',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #dee2e6',
          fontSize: '12px',
          color: '#6c757d',
          textAlign: 'center'
        }}>
          Showing {filteredData.length} of {data.length} results
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}
    </div>
  );
};

export default DataTable;