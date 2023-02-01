import React from "react";

function Footer() {

    const year = new Date();
    const y  = year.getFullYear();
        
  return (
        <footer>
          <p>Copyright {y}</p>
        </footer>
  )
}

export default Footer;
