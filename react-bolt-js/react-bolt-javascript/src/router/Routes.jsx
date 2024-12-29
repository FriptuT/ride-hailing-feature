import { createBrowserRouter } from "react-router";
import App from "../App";
import Header from "../components/Header/Header";
import HomePage from "../components/HomePage/HomePage";
import DriversPage from "../components/Drivers/Drivers";
import PassengersPage from "../components/Passengers/PassengersPage";
import RidePage from "../components/RidePage/RidePage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path:'homepage', element: <HomePage/>},
            {path:'drivers', element: <DriversPage />},
            {path:'passengers', element: <PassengersPage />},
            {path:'ask-a-ride', element: <RidePage />}
        ]
    }
])