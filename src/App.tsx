import {ThemeProvider} from "styled-components";
import {mainTheme} from "./styles/theme.ts";
import {GlobalStyles} from "./styles/global.styled.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./pages/registration/registration.tsx";
import Footer from "./globalComponents/footer/Footer.tsx";
import OverviewForm from "./pages/registration/components/OverviewForm.tsx";
import AddressForm from "./pages/registration/components/AddressForm.tsx";
import Conclusion from "./pages/registration/components/Conclusion.tsx";

function App() {

  return (
    <ThemeProvider theme={mainTheme}>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Registration/>}>
                    <Route index element={<OverviewForm/>}/>
                    <Route path={'address'} element={<AddressForm/>}/>
                    <Route path={'conclusion'} element={<Conclusion/>}/>
                </Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
        <GlobalStyles/>
    </ThemeProvider>
  )
}

export default App
