import Categories from "../components/Categories";
import FeaturedBook from "../components/FeaturedBooks";
import Layout from "../components/Layout";

export default function Home(){
    return (
        <>
            <Layout>
                <Categories></Categories>
                <FeaturedBook></FeaturedBook>
            </Layout>
        </>
    )
}