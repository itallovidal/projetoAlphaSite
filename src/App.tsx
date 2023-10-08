import {ThemeProvider} from "styled-components";
import {mainTheme} from "./styles/theme.ts";
import {GlobalStyles} from "./styles/global.styled.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./pages/registration/registration.tsx";
import Footer from "./globalComponents/footer/Footer.tsx";
import OverviewForm from "./pages/registration/components/OverviewForm.tsx";
import AddressForm from "./pages/registration/components/AddressForm.tsx";
import Conclusion from "./pages/registration/components/Conclusion.tsx";
import GlobalContextProvider from "./context/globalContext.tsx";

function App() {

  return (
    <ThemeProvider theme={mainTheme}>
        <BrowserRouter>
            <GlobalContextProvider>
                <Routes>
                    <Route path={'/:id'} element={<Registration/>}>
                        <Route index element={<OverviewForm/>}/>
                        <Route path={'address'} element={<AddressForm/>}/>
                        <Route path={'conclusion'} element={<Conclusion/>}/>
                    </Route>
                </Routes>
                <Footer/>
            </GlobalContextProvider>
        </BrowserRouter>
        <GlobalStyles/>
    </ThemeProvider>
  )
}

export default App
