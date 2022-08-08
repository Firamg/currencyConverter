//REFERENCIAS SELECTION DOM

const baseURL="https://mindicador.cl/api/"
const result=document.querySelector('.result')
const input=document.querySelector('#input')
const selector=document.querySelector('#selector')
const btn=document.querySelector('#btn')

//REFERENCIAS SELECTION CHART
const myChart = document.querySelector("#myChart");
let canvas;

//FUNTION GET CURRENCY



const getCurrency = async(currency)=>{
    try{
        const res=await fetch(`https://mindicador.cl/api/${currency}`)
        const data=await res.json();
        console.log(data)
        return data;

    } catch (e){
        alert(e.message);
    
    }
}


//FUNCTION CONVERSOR

const convertor = async(currency)=>{
    const datos = await getCurrency(currency);
    const currencyValue=datos.serie[0].valor;
    const convertor=input.value/currencyValue;

    result.innerHTML=convertor.toFixed(4);
    
}

// CONFIGURACIÒN GRÁFICA

const configGrafica = (currencies)=>{
    if (canvas) canvas.destroy();
    //CREACIÓN DE VARIABLES

    const type= 'line';
    const title= 'Currency';
    const bgColor='blue'
    const arrayTenDays= currencies.serie.slice(0,10);
    const dates=arrayTenDays.map((x)=>{
        const date=new Date(x.fecha);
        return date.toLocaleDateString();

    });

    const value=arrayTenDays.map((x)=>+x.valor);
    const config={
        type: type,
        data:{
            labels:dates,
            datasets:[
                {
                    label:title,
                    backgroundColor: bgColor,
                    data: value,
                },
            ],
        },
    }

    return config

}


//RENDER GRAFICA

const renderChart=async(values)=>{

    const currencies=await getCurrency(values);
    const config = configGrafica(currencies);
    canvas= new Chart(myChart,config);
};


//ADD EVENT LISTENER

btn.addEventListener('click', async()=>{


    await convertor(selector.value);
    await renderChart(selector.value);
});



