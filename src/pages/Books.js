import { useSearchParams } from "react-router-dom"

export default function Books() {
    const [searchParams,setSearchParams] = useSearchParams()
    setSearchParams({search: "name", status:"success"})
    console.log(searchParams.get("search"),searchParams.get("status"));
    return <div>Books Page</div>
}