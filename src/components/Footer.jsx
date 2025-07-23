import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - this is a demo project</p>
      </aside>
    </footer>
  );
};

export default Footer;
