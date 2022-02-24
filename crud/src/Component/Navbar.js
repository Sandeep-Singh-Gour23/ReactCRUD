import { Row } from 'antd';
import React from 'react'

const Navbar = () => {
  return (
      <Row lg={24} md={12} sm={6} style={{backgroundColor:'#DAD6D6', padding:'0.8rem'}}>
          <h1 style={{marginLeft:'0.5rem', color:'#E32020', fontFamily:'monospace'}}>
              React Task
          </h1>
      </Row>
  )
}

export default Navbar