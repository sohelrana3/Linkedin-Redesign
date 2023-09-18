import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";

// import pages
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Rootlayouts from "./components/Rootlayouts";
import Feed from "./pages/Feed";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/linkedin" element={<Rootlayouts />}>
                <Route index element={<Home />}></Route>
                <Route path="feed" element={<Feed />}></Route>
            </Route>
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
