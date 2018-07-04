/** 
 * 双折线图
 */

const symbol = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAABElJREFUSA2NVctyI0UQzO55aSRZYvxYE7E+aBefDRE+cIQrH8CdE9+x/AafwH4AV+9xD44guGwQYWwF2LAr25KlGWne3WQN4xdhr+mDWt1dnV2VlVWj8MSw1qrHTJRS9rEz2X/wYguoXrfns0Po/f1bmMNDINqHkZ1vAXnAPvSQvr1CC3r5ylrZ07zvbI3hhX8jcPvoTKYIj4/RlVnWsi/nYif2cu+/Ud54fu3tAQ3HY7i9HtxuCs8L4CkHrirh8lVVBTDKoLY1qjJHuQpRLpeoRiNUX6OJ5iYKl6824wde/KoF3q7gOwYdvYaOkyIkeR2CBcqDclekwEeOGhnPU69A1q+Q0SEc8IE37QMCquSn9Vr/DLg4QuAPEDoF1pwOBosV1gtSnNcYkF3CowwcLHxgNuhiWmdY1D7iYoEUu8i/ASpCGsnBNbj+kdxF5wiGBl1bYuB72IgzPJ9VeDHPzItlhS06EfBS3vcwGQR6HLk4WevgrChxyagWc43VbAv590BNO9PQIqrwx3C6ETwtdDgYxEs8f59We+eZ+iLO7a6BjjRZoTSquMA0Lurf845dM7WrBgOUxkHRjcn/GNXr0b9KcoUSgmMzgPYyeI6DsMoRzQrzsgEu9Oc9z2zv9OEPPeh5CXOa2GhRqL5QSoqSsMDc97Fk8rNNgzzlvuA2ns+YSLKtA0VV5AiXBTbmGUZJqT7ruXb7y2cq3NvQ6NM6qeD8emnCtxNsx4XavXLrs2Hg/BFYXPQCxKRGN3jkvQGX+pjMCb4Op7LwJXmpwVZtsL4zVP7ehsKnofgJkG+AD/21sv67mVlPmQuxNz78WsNhOPplYyketyMRQnNokRvLyK2ZPK2sN/CsFo/vDlnLPpPmGougro2nFbTcT65uq/4GvG9gpUCoFBYBKlGFsaqMS2VIxb0h63lBWnmFoLnj6JKPGLnf/6RpB419A84SRjKEyVl5NC4CYEGuzx2N6Z+JLcgx3jNLSYlmlvXpEjmDnYYuzkX3ukbBwquTGkbwZDQBRyQ/rOi1RmUDpKHCdFg546Ssd+a56r+d2O2zpQmGPpR4fLq0eVLpD1wfUe8nfGBqfaRLtoTQNDJsmprL8O1PDPAih9mKUFLnqecTPMNJ3lV9hg7R+bsrFTEqj+GXGnY2CMzRZlf9EjnqROxrB2m5QnlB8B69FtynK5R6p7ejZWmf0QdWKPKepyb0ehz5+vhjFXoNLvODvWXF3pLWWM8pEFGFJE9yEjqYdv9PbxHypR/f64rsiNpnV6wRemwJhWm8ViIRXyMnN5lQYdgV6xjZBxfFqO2Kr9hXBLPxXP60nVEdMAK2z3v9vMd+LgUiOha5iSokeU/18xudSwLkjTdUzncjlC/Z3XpMLj1OfrsE+xjmZymuZJa17Mu52Im93JP7LQ7/3vG8WbU/11HcfEMZzZ1PKETHIl8x/9g3VLV4j07tQw+e3/XyIYN/AAXFZ2I6M9WYAAAAAElFTkSuQmCC'
const color = ['#50e3c2', '#41baff']
const json = list => {
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
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    width: 2,
                    color: '#fff'
                },
            },
            textStyle: {
                color: '#fff'
            },
            backgroundColor: '#00204f',
            borderWidth: 1,
            borderColor: '#fff',
            padding: [8,12],
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
            data: date,
            axisLabel: {
                color: '#fff'
            },
            axisTick: {
                show: false
            },
            boundaryGap : false,
            axisLine: {
                lineStyle: {
                    color: '#003fa7'
                }
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 30,
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
        series: [
            {
                name:'抓拍',
                type:'line',
                symbol: `image://${symbol}`,
                symbolSize: [23, 23],
                showSymbol: false,
                data:series[0],
                lineStyle: {
                    normal: {
                        color: color[0]
                    }
                },
                itemStyle: {
                    normal: {
                        color: color[0]
                    }
                },
                animation: true
            },
            {
                name:'人口',
                type:'line',
                symbol: `image://${symbol}`,
                symbolSize: [23, 23],
                showSymbol: false,
                data:series[1],
                lineStyle: {
                    normal: {
                        color: color[1]
                    }
                },
                itemStyle: {
                    normal: {
                        color: color[1]
                    }
                },
                animation: true
            }
        ]
    };
}

export default json