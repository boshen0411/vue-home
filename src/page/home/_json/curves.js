/**
 * 折綫圖臨時數據
 */
const symbol = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAABElJREFUSA2NVctyI0UQzO55aSRZYvxYE7E+aBefDRE+cIQrH8CdE9+x/AafwH4AV+9xD44guGwQYWwF2LAr25KlGWne3WQN4xdhr+mDWt1dnV2VlVWj8MSw1qrHTJRS9rEz2X/wYguoXrfns0Po/f1bmMNDINqHkZ1vAXnAPvSQvr1CC3r5ylrZ07zvbI3hhX8jcPvoTKYIj4/RlVnWsi/nYif2cu+/Ud54fu3tAQ3HY7i9HtxuCs8L4CkHrirh8lVVBTDKoLY1qjJHuQpRLpeoRiNUX6OJ5iYKl6824wde/KoF3q7gOwYdvYaOkyIkeR2CBcqDclekwEeOGhnPU69A1q+Q0SEc8IE37QMCquSn9Vr/DLg4QuAPEDoF1pwOBosV1gtSnNcYkF3CowwcLHxgNuhiWmdY1D7iYoEUu8i/ASpCGsnBNbj+kdxF5wiGBl1bYuB72IgzPJ9VeDHPzItlhS06EfBS3vcwGQR6HLk4WevgrChxyagWc43VbAv590BNO9PQIqrwx3C6ETwtdDgYxEs8f59We+eZ+iLO7a6BjjRZoTSquMA0Lurf845dM7WrBgOUxkHRjcn/GNXr0b9KcoUSgmMzgPYyeI6DsMoRzQrzsgEu9Oc9z2zv9OEPPeh5CXOa2GhRqL5QSoqSsMDc97Fk8rNNgzzlvuA2ns+YSLKtA0VV5AiXBTbmGUZJqT7ruXb7y2cq3NvQ6NM6qeD8emnCtxNsx4XavXLrs2Hg/BFYXPQCxKRGN3jkvQGX+pjMCb4Op7LwJXmpwVZtsL4zVP7ehsKnofgJkG+AD/21sv67mVlPmQuxNz78WsNhOPplYyketyMRQnNokRvLyK2ZPK2sN/CsFo/vDlnLPpPmGougro2nFbTcT65uq/4GvG9gpUCoFBYBKlGFsaqMS2VIxb0h63lBWnmFoLnj6JKPGLnf/6RpB419A84SRjKEyVl5NC4CYEGuzx2N6Z+JLcgx3jNLSYlmlvXpEjmDnYYuzkX3ukbBwquTGkbwZDQBRyQ/rOi1RmUDpKHCdFg546Ssd+a56r+d2O2zpQmGPpR4fLq0eVLpD1wfUe8nfGBqfaRLtoTQNDJsmprL8O1PDPAih9mKUFLnqecTPMNJ3lV9hg7R+bsrFTEqj+GXGnY2CMzRZlf9EjnqROxrB2m5QnlB8B69FtynK5R6p7ejZWmf0QdWKPKepyb0ehz5+vhjFXoNLvODvWXF3pLWWM8pEFGFJE9yEjqYdv9PbxHypR/f64rsiNpnV6wRemwJhWm8ViIRXyMnN5lQYdgV6xjZBxfFqO2Kr9hXBLPxXP60nVEdMAK2z3v9vMd+LgUiOha5iSokeU/18xudSwLkjTdUzncjlC/Z3XpMLj1OfrsE+xjmZymuZJa17Mu52Im93JP7LQ7/3vG8WbU/11HcfEMZzZ1PKETHIl8x/9g3VLV4j07tQw+e3/XyIYN/AAXFZ2I6M9WYAAAAAElFTkSuQmCC'

export default {
    title: {
        show: true,
        text: '近一月突发事件',
        top: 0,
        left: 0,
        textStyle: {
            color: '#fff',
            lineHeight: '20',
            fontSize: '14'
        }
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
    grid: {
        top: '40',
        left: '0%',
        right: '2%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        boundaryGap : false,
        data : ['周一','周二','周三','周四','周五','周六','周日'],
        axisLabel: {
            color: '#fff'
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
    yAxis: {
        splitLine: {
            show: false
        },
        axisLabel: {
            color: '#fff'
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
    series : [
        {
            type:'line',
            smooth: true,
            symbol: `image://${symbol}`,
            symbolSize: [23, 23],
            showSymbol: false,
            itemStyle: {
                normal: {
                    color: '#41baff',
                    lineStyle: {
                        color: "#8CFF90"
                    }
                }
            },
            areaStyle: {
                normal: {
                    color: '#31CC9F'
                }
            },
            data:[1, 3, 2, 4 ,1, 3, 1]
        }
    ]
};