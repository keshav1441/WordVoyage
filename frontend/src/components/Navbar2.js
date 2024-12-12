import React from "react";
import { Link, useParams } from "react-router-dom";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Add } from "@mui/icons-material"; // Importing Add icon for the plus sign

const Navbar2 = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userId } = useParams(); // Extract the userId from the URL params
  const user = JSON.parse(localStorage.getItem("user")) || {}; // Assuming user data is stored in localStorage

  // Handle dropdown menu opening
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const currentUrl = window.location.pathname; // Get the current path
const userId1 = currentUrl.split('/dashboard/')[1]; // Split and get everything after "dashboard/"
console.log(userId1); // This will log the part after "dashboard/"


  // Handle dropdown menu closing
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Construct the URL for the Add Blog page using the extracted userId
  const addBlogLink = userId ? `/dashboard/${userId1}/addblog` : "/addblog";

  return (
    <nav className="bg-white shadow-md px-4 py-2">
      <div className="flex justify-between items-center">
        {/* Left section: Dashboard, About, Contact Us, Feedback */}
        <div className="flex space-x-6">
          <Link className="text-gray-700 hover:text-gray-900" to="/home">
            Home
          </Link>
          <Link className="text-gray-700 hover:text-gray-900" to="/about">
            About
          </Link>
          <Link className="text-gray-700 hover:text-gray-900" to="/contact">
            Contact Us
          </Link>
          <Link className="text-gray-700 hover:text-gray-900" to="/feedback">
            Feedback
          </Link>
        </div>

        {/* Middle section: WordVoyage */}
        <div className="text-2xl font-semibold text-gray-800">
          WordVoyage
        </div>

        {/* Right section: My Blog, Profile, User Account Dropdown, and Add Blog button */}
        <div className="flex items-center space-x-4">
          <Link className="text-gray-700 hover:text-gray-900" to="/blog">
            My Blog
          </Link>

          {/* Circular Profile Image */}
          <div className="relative">
            <Avatar
              alt="User Profile"
              src={user.profileImage || "/default-avatar.png"} // Default avatar if no profile image
              sx={{
                width: 40,
                height: 40,
              }}
            />
          </div>

          {/* User Account Dropdown */}
          <IconButton onClick={handleMenuClick} size="large">
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link className="text-gray-700" to="/profile">
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link className="text-gray-700" to="/settings">
                Settings
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link className="text-gray-700" to="/logout">
                Logout
              </Link>
            </MenuItem>
          </Menu>

          {/* Add Blog Button */}
          <Link to={addBlogLink}>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#4CAF50", // Green color for the button
                color: "white",
                "&:hover": {
                  backgroundColor: "#45a049", // Slightly darker green on hover
                },
              }}
            >
              <Add />
            </IconButton>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
