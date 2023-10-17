import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import About from "./About";
import UserList from "./UserList";
import FriendRequest from "./FriendRequest";
import FriendList from "./FriendList"; 
import Post from "./Post";

const Navbar = () => {
    const [value, setValue] = useState("1");
    let handleChange = (e, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="tabList">
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            className="tabList"
                        >
                            <Tab label="Profile" value="1" />
                            <Tab label="Friends" value="2" />
                            <Tab label="Post" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <About />
                    </TabPanel>
                    <TabPanel value="2">
                        <UserList />
                        <FriendRequest />
                        <FriendList />
                    </TabPanel>
                    <TabPanel value="3">
                        <Post />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default Navbar;
