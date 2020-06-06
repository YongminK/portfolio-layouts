import React, {useState, useEffect} from "react";
import {fetchDailyData} from "../../api";
import {Line, Doughnut} from "react-chartjs-2";
import useWindowWidth from "use-window-width";

import styles from './Chart.module.css'

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);
    const width = useWindowWidth();

    useEffect(() => {
        const fetchAPIDailyData = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchAPIDailyData();
    }, [])
    const lineChart = (
        dailyData.length ? (<Line
            width={width < 768 && 150}
            height={width < 768 && 200}
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: "Infected",
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: "Deaths",
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0 , 0.5)',
                    fill: true
                }]
            }}
        />) : null
    )

    const barChart = (
        confirmed ?
            (<Doughnut
                width={width < 768 && 150}
                height={width < 768 && 150}
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: "People",
                        backgroundColor: ['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {
                        display: false,
                    },
                    layout: {
                        right: 0,
                        left: 0
                    },
                    title: {
                        display: true,
                        text: `Current state in ${country}`
                    }
                }}
            />) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;