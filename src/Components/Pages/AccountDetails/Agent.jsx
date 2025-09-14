import React, { useState } from 'react';

import {
  Container,
  Input,
  Table,
} from 'reactstrap';
import { FaUserCircle, FaSearch } from 'react-icons/fa';

const agentsData = [
  { name: 'Saman Perera', company: 'Munchee' },
  { name: 'Nimal Silva', company: 'Maliban' },
  { name: 'Kamal Fernando', company: 'Tiyara' },
  { name: 'Ruwan Jayasinghe', company: 'Risbury' },
  { name: 'Anura Bandara', company: 'Kandox' },
  { name: 'Chathura Gunawardena', company: 'Sunlight' },
  { name: 'Pradeep Senanayake', company: 'Magic' },
];


const Agent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agentsData.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#292F63' }}>
     

      <Container className="mt-5">
        {/* Search Bar */}
        <div
          className="d-flex align-items-center mb-4"
          style={{
            border: '2px solid #292F63',
            borderRadius: '50px',
            padding: '8px 20px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          <FaSearch style={{ color: '#292F63', fontSize: '20px', marginRight: '10px' }} />
          <Input
            type="text"
            placeholder="Search Agent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              color: '#292F63',
            }}
          />
        </div>

        {/* Agent Table */}
        <Table bordered hover responsive style={{ color: '#292F63' }}>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th style={{ width: '60px', textAlign: 'center' }}><FaUserCircle /></th>
              <th>Name</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center' }}>
                  <FaUserCircle size={24} color="#292F63" />
                </td>
                <td>{agent.name}</td>
                <td>{agent.company}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Agent;
