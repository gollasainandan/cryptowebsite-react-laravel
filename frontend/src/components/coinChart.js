import axios from "axios";
import React, {useContext, useEffect,useState} from "react";
import {CurrencyConetxt} from '../context/CurrencyContext';
//import ProgressBar from 'react-bootstrap/ProgressBar';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

function CoinChart({coin}){
    
    const [historicalData,setHistoricalData] = useState();
    const [days,setDays] =useState("1");
    const {currency} =  useContext(CurrencyConetxt);
    //console.log(coin.id +'---'+currency+'--'+days);
    const fetchHistoricalData = async () => {
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency))
        setHistoricalData(data.prices);
    }
    useEffect(()=>{
        fetchHistoricalData();
    },[currency],[days]);

    //console.log(historicalData);
    return(
        <div>
            {!historicalData ? (<MDBProgress>
    <MDBProgressBar width={75} valuemin={0} valuemax={100} />
  </MDBProgress>):(
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            )}
        </div>
    );
}
export default CoinChart;