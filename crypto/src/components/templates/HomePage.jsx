import { useEffect, useState } from "react"


import TableCoin from "../module/TableCoin";
import { getCoinList } from "../../services/CryptoApi";
import Pagination from "../module/Pagination";
import Search from "../module/Search";
import Chart from "../module/Chart";

function HomePage() {

    const [coins , setCoins] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const [page , setPage] = useState(1) ;
    const [currency , setCurrency] = useState("usd") ;
    const [chart , setChart] = useState(null) ;




    useEffect(() => {
        const fecthData = async () => {
          try {
            setIsLoading(true)
            const res = await fetch(getCoinList(page , currency));
            const json = await res.json()
            setCoins(json)
            setIsLoading(false)
          } catch (error) {
            console.log(error);
          }
        }
        fecthData()
    } , [page , currency])
  return (
    <div>
      <Search currency ={currency} setCurrency = {setCurrency}/>
        <TableCoin coins = {coins} isLoading = {isLoading} setChart= {setChart }/>
        <Pagination page= {page} setPage = {setPage}/>
      {!!chart && <Chart  chart ={chart} setChart={setChart}/>}
    </div>
  )
}

export default HomePage