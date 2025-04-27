import 'swiper/swiper.min.css';
import './assets/boxicons-2.1.4/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Routes from './config/Routes';

function App() {
    return (
        <BrowserRouter>
        <BrowserRouter basename="/MovieWebGR2">
            <Route render={props => (
                <>
                    <Header {...props}/>
                    <Routes/>
                    <Footer/>
                </>
            )}/>
        </BrowserRouter>
        </BrowserRouter>
    );
}

export default App;
