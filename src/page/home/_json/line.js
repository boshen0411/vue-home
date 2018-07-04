/**
 * 柱狀圖臨時數據
 */
const json = list => {
    let date = []
    let series = [[],[],[]]
    if (list.length) {
        list.forEach(item => {
            date.push(item.date)
            series[0].push(item.warn)
            series[1].push(item.snap)
            series[2].push(item.event)
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
        legend: {
            type: 'plain',
            orient: 'vertical',
            right: 0,
            top: '20%',
            itemWidth: 10,
            itemGap: 28,
            data: [{
                name: '预警',
                icon: 'circle',
                textStyle: {
                    color: '#fff'
                }
            },{
                name: '抓拍',
                icon: 'circle',
                textStyle: {
                    color: '#fff'
                }
            },{
                name: '事件',
                icon: 'circle',
                textStyle: {
                    color: '#fff'
                }
            }]
        },
        xAxis: {
            type : 'category',
            data : date,
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
        yAxis: {
            type : 'value',
            splitLine: {
                show: false
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
        series : [
            {
                name: '预警',
                type: 'bar',
                data: series[0],
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                barWidth: '10',
                itemStyle: {
                    normal: {
                        color: '#15E4B5'
                    },
                }
            },
            {
                name: '抓拍',
                type: 'bar',
                data: series[1],
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                barWidth: '10',
                itemStyle: {
                    normal: {
                        color: '#f87b47'
                    },
                }
            },
            {
                name: '事件',
                type: 'bar',
                data: series[2],
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                barWidth: '10',
                itemStyle: {
                    normal: {
                        color: '#ffbb4a'
                    },
                }
            }
        ]
    };
}

export default json