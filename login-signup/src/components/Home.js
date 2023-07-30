import React from 'react'
import "./Home.css"
import table from "../img/table-1.jpg"
import {Link} from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className='book-heading'>
        <h2>Book For Today</h2>
      </div>
      <div className='table-booking'>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-1</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-2</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-3</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-4</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-5</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-6</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-7</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-8</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-9</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
        <div className='table-1'> 
          <img src={table} alt="Table-1" />
          <div className='table-1-butt'>
            <h3>Table-10</h3>
            <div className='table-1-button'>
              <Link to="/Book"><button>book</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
