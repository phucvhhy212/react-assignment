import { useParams } from "react-router-dom"

export default function BookDetail() {
    var a  = useParams()
    console.log(a.id);
    return <div>Book Detail Page</div>
}