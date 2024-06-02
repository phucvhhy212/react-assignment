import Footer from "./Footer";
import Navs from "./Navbar";

export default function Layout(props) {
    return (
        <>
            <Navs />
            {props.children}
            <Footer />
        </>
    )
}