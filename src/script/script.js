const leftSidebar = document.querySelector('.left-sidebar')
const topBar = document.querySelector('.top-bar')
const toggle = document.querySelector('.toggle-menu')
const lastestTransactions = document.querySelectorAll('.lastest-transactions ul li')

function toggleMenu (){
    const toggleIcon = toggle.querySelector('ion-icon')
    if(leftSidebar.classList.contains('active')){
        topBar.querySelector('.crypto-bank').style.display = 'none'
        toggleIcon.style.transform = 'rotate(0deg)'
        leftSidebar.classList.remove('active')
    }
    else{
        topBar.querySelector('.crypto-bank').style.display = 'flex'
        leftSidebar.classList.add('active')
        toggleIcon.style.transform = 'rotate(90deg)'
    }
}

toggle.addEventListener('click', toggleMenu)

const crypto = [
    {
        name : 'Bitcoin',
        devise : 'BTC',
        src : 'Bitcoin.svg',
        rate : -0.74,
        prices : [49160.38, 48504.61, 48079.12, 47980.60, 47948.45, 47400.00, 48069.21, 48458.93, 48289.12],
        wallet: 553.84,
        color : '#f7931a'
    },
    {
        name : 'Ethereum',
        devise : 'ETH',
        src : 'Ethereum.svg',
        rate : 2.73,
        prices : [3238.64, 3202.22, 3163.90, 3185.61, 3182.87, 3160.60, 3224.01, 3315.15, 3314.91],
        wallet: 273.81,
        color : '#e2e2e2'
    },
    {
        name : 'Litecoin',
        devise : 'LTC',
        src : 'Litecoin.svg',
        rate : -0.97,
        prices : [175.92, 173.01, 173.04, 172.06, 172.57, 167.70, 171.34, 173.88, 173.68],
        wallet: 310.25,
        color : '#345d9d'
    },
    {
        name : 'Cardano',
        devise : 'ADA',
        src : 'Cardano.svg',
        rate : -2.04,
        prices : [2.87, 2.86, 2.80, 2.82, 2.81, 2.78, 2.83, 2.80, 2.81],
        wallet: 440.37,
        color : '#0033ad'
    },
]

const dateTime = {
    day : {
        label : ['7:23 PM', '10:23 PM', '1:23 AM', '4:23 AM', '7:23 AM', '10:23 AM', '1:23 PM', '4:23 PM', '7:23 PM'],
        data : [1588.19, 1568.64, 1571.87, 1548.13, 1544.81, 1529.04, 1582.42, 1592.25, 1578.27]
    }, 
    week : {
        label : ['8/24', '8/25', '8/26', '8/27', '8/28', '8/29', '8/30', '8/31'],
        data : [1536.95, 1625.83, 1545.47, 1556.48, 1492.43, 1582.51, 1572.36, 1578.27]
    },
    month : {
        label : ['8/1', '8/4', '8/7', '8/10', '8/13', '8/16', '8/19', '8/22', '8/25', '8/28', '8/31'],
        data : [1112.95, 1060.51, 1173.35, 1288.36, 1310.67, 1456.24, 1351.84, 1518.81, 1625.83, 1492.43, 1578.27]
    },
    year : {
        label : ['Aug. 20', 'Sep. 20', 'Oct. 20', 'Nov. 20', 'Dec. 20', 'Jan. 21', 'Feb. 21', 'Mar. 21', 'Apr. 21', 'May. 21', 'Jun. 21', 'Jul. 21', 'Aug. 21'],
        data : [1501.77, 1439.22, 1571.47, 1459.52, 1254.64, 1083.15, 1101.21, 1148.14, 1079.57, 1153.54, 1016.25, 1107.91, 1578.27]
    }
}

const controlDatetime = document.querySelectorAll('.control-datetime ul li')
let indexDatetime = 'day'

const walletLine = document.querySelector('.line-chart')

let lineChart
loadBalanceChart(indexDatetime)

function loadBalanceChart(index){
    const walletPrice = document.querySelector('.wallet-amount')
    const cryptoRate = walletPrice.querySelector('.crypto-rate')
    let fisrtValue = dateTime[index].data[0]
    let secondValue = dateTime[index].data[dateTime[index].data.length-1]

    let rate = ((secondValue - fisrtValue) /fisrtValue) * 100
    if(rate < 0){
        cryptoRate.classList.remove('up')
        cryptoRate.classList.add('down')
        cryptoRate.querySelector('span').innerHTML = rate.toFixed(2)*-1+'%'
        cryptoRate.querySelector('ion-icon').setAttribute('name', 'arrow-down-circle-outline')
    } 
    else{
        cryptoRate.classList.remove('down')
        cryptoRate.classList.add('up')
        cryptoRate.querySelector('span').innerHTML = rate.toFixed(2)+'%'
        cryptoRate.querySelector('ion-icon').setAttribute('name', 'arrow-up-circle-outline')
    }
    walletPrice.querySelector('h2').innerHTML = dateTime[index].data[dateTime[index].data.length-1]+'$'

    lineChart = new Chart(walletLine, {
        type : 'line',
        data : {
            labels : dateTime[index].label,
            datasets : [{
                label: '',
                data: dateTime[index].data,
                fill : true,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 3,
            }]
        },
        options : {
            responsive : true,
            maintainAspectRatio: false,
            tension : .4,
            plugins : {legend : {display : false}},
            scales : {
                xAxis : {display:true},
                yAxis : {display:true}
            },
            elements : {point:{radius:1}},
        }
    })
}

function changeData(element){
    if(!element.classList.contains('active')){
        lineChart.destroy()
        indexDatetime = element.getAttribute("li-index")
        loadBalanceChart(indexDatetime)
        controlDatetime.forEach(li => {
            li.classList.remove('active')
        });
        element.classList.add('active')
    }
}

const convertMaxBtn = document.querySelector('.convert .max')
const convertInput = document.querySelector('.convert .amount input')
const convertCrypto = document.querySelector('.convert .amount span.crypto-amount')
const convertSelectFrom = document.querySelector('.convert-control .from select')
const convertSelectTo = document.querySelector('.convert-control .to select')
const convertSelectOptionFrom = convertSelectFrom.querySelectorAll('option')
const convertSelectOptionTo = convertSelectTo.querySelectorAll('option')
const convertSelectFromImg = document.querySelector('.convert-control .from img')
const convertSelectToImg = document.querySelector('.convert-control .to img')

function resetConvertFrom(){
    convertInput.value = null
    crypto.forEach(element => {
        if(element.devise == convertSelectFrom.value)
            convertSelectFromImg.src = `./src/img/crypto/${element.src}`
            convertCrypto.innerHTML = '0 '+convertSelectFrom.value
    })
    convertSelectOptionTo.forEach(e=>{
        if(e.value == convertSelectFrom.value) e.setAttribute('disabled', true)
        else e.removeAttribute('disabled')
    })
}

function resetConvertTo(){
    crypto.forEach(element => {
        if(element.devise == convertSelectTo.value)
            convertSelectToImg.src = `./src/img/crypto/${element.src}` 
    })
    convertSelectOptionFrom.forEach(e=>{
        if(e.value == convertSelectTo.value) e.setAttribute('disabled', true)
        else e.removeAttribute('disabled')
    })
}

function maxConvert(){
    crypto.forEach(element => {
        if(element.devise == convertSelectFrom.value) {
            convertInput.value = element.wallet
            convertCrypto.innerHTML = parseFloat((convertInput.value / element.prices[element.prices.length-1]).toFixed(8))+' '+convertSelectFrom.value
        }
    })
}

function cryptoAmountConvert(){
    crypto.forEach(element => {
        if(element.devise == convertSelectFrom.value)
            convertCrypto.innerHTML = parseFloat((convertInput.value / element.prices[element.prices.length-1]).toFixed(8))+' '+convertSelectFrom.value
    })
}

convertMaxBtn.addEventListener('click', maxConvert)
convertSelectFrom.addEventListener('change', resetConvertFrom)
convertSelectTo.addEventListener('change', resetConvertTo)
convertInput.addEventListener('input', cryptoAmountConvert)

const transfertMaxBtn = document.querySelector('.transfert .max')
const transfertInput = document.querySelector('.transfert .amount input')
const transfertCrypto = document.querySelector('.transfert .amount span.crypto-amount')
const transfertSelect = document.querySelector('.transfert select')
const transfertSelectImg = document.querySelector('.transfert .select-crypto img')

function resetTransfert(){
    transfertInput.value = null
    crypto.forEach(element => {
        if(element.devise == transfertSelect.value)
            transfertSelectImg.src = `./src/img/crypto/${element.src}`
            transfertCrypto.innerHTML = '0 '+transfertSelect.value
    })
}

function maxTransfert(){
    crypto.forEach(element => {
        if(element.devise == transfertSelect.value) {
            transfertInput.value = element.wallet
            transfertCrypto.innerHTML = parseFloat((transfertInput.value / element.prices[element.prices.length-1]).toFixed(8))+' '+transfertSelect.value
        }
    })
}


function cryptoAmountTransfert(){
    crypto.forEach(element => {
        if(element.devise == transfertSelect.value)
            transfertCrypto.innerHTML = parseFloat((transfertInput.value / element.prices[element.prices.length-1]).toFixed(8))+' '+transfertSelect.value
    })
}

transfertMaxBtn.addEventListener('click', maxTransfert)
transfertSelect.addEventListener('change', resetTransfert)
transfertInput.addEventListener('input', cryptoAmountTransfert)

const cards = document.querySelectorAll('.card canvas')
for(let i = 0; i<cards.length; i++){
    var chart = new Chart(cards[i], {
        type : 'line',
        data : {
            labels : dateTime['day'].label,
            datasets : [{
                label : crypto[i].name,
                data : crypto[i].prices,
                fill : true,
                borderColor : crypto[i].color,
                borderWidth : 5,
                tension : .4 
            }]
        },
        options : {
            plugins : { legend : {display: false}},
            scales : {
                xAxis : {display:false},
                YAxis : {display:false}
            },
            elements : {point:{radius:0}}
        }
    })
    
}

const walletDoughnut = document.querySelector('.doughnut-chart')

const walletCryptoName = []
crypto.forEach(element => {
    walletCryptoName.push(element.name)
})

const walletCryptoAmount = []
crypto.forEach(element => {
    walletCryptoAmount.push(element.wallet)
})

const walletCryptoColor = []
crypto.forEach(element => {
    walletCryptoColor.push(element.color)
})

document.querySelector('.doughnut span').innerHTML = dateTime.day.data[dateTime.day.data.length-1]+"$" 

var doughnutChart = new Chart(walletDoughnut, {
    type : 'doughnut',
    data : {
        labels : walletCryptoName,
        datasets : [{
            label: '',
            data: walletCryptoAmount,
            borderWidth : 0,
            backgroundColor : walletCryptoColor,
            datalabels : { 
                color : 'white',
                font : {
                    family : "'Poppins', sans-serif",
                    weight : 600
                }
            },
        }]
    },
    plugins : [ChartDataLabels],
    options : {
        responsive : true,
        maintainAspectRatio: false,
        plugins : {
            legend : {display : false},
            datalabels:{
                formatter : function(value, context){
                    return crypto[context.dataIndex].devise + '\n' + value + ' $'
                },
                textAlign : 'center'
            }
        }
    },
})


