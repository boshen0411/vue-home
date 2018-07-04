/** 
 * 折柱图
 */
const json = (list, color) => {
    let date = []
    let series = [[],[]]
    if (list.length) {
        list.forEach(item => {
            date.push(item.date)
            series[0].push(item.amount)
            series[1].push(item.percent)
        })
    }
    return {
        grid: {
            top: '24',
            left: '0%',
            right: '60',
            bottom: '0%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{a0}: {c0}<br /> {a1}: {c1}%'
        },
        legend: {
            data:['变化量','变化率'],
            right: '15%',
            itemWidth: 10,
            textStyle: {
                color: '#fff'
            }
        },
        xAxis: {
            type: 'category',
            data: date,
            axisPointer: {
                type: 'shadow'
            },
            axisLine: {
                lineStyle: {
                    color: '#003fa7'
                }
            },
            axisLabel: {
                color: '#fff'
            },
            axisTick: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 20,
                interval: 50,
                axisLabel: {
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#003fa7'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            {
                type: 'value',
                min: 0,
                max: 30,
                interval: 10,
                axisLabel: {
                    formatter: '{value}%',
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#003fa7'
                    }
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name:'变化量',
                type:'bar',
                data:series[0],
                barWidth: 20,
                itemStyle: {
                    normal: {
                        color
                    }
                }
            },
            {
                name:'变化率',
                type:'line',
                yAxisIndex: 1,
                data:series[1],
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color
                    }
                },
                itemStyle: {
                    normal: {
                        color
                    }
                }
            }
        ]
    };
}

export default json