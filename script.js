const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"


const  drop=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")



for(let select of drop){
    for(code in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=code
        newOption.value=code
        if(select.name=="from" && code=="USD"){
            newOption.selected="selected"
        }else if(select.name=="to" && code=="INR"){
              newOption.selected="selected"
        }
        select.append(newOption)
    }  
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async ()=>{
    let amt =document.querySelector("form input");
    let amtVal=amt.value;
    
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amt.value="1";
    }
   const URL=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
   let response =await fetch(URL);
   let data=await response.json()
   let rate=data[toCurr.value.toLowerCase()];
   msg.innerText=`${amtVal} ${fromCurr.value} = ${amtVal*rate} ${toCurr.value} `
}
const updateFlag=(element)=>{
        let currCode=element.value
        let countryCode=countryList[currCode]
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
        let img= element.parentElement.querySelector("img")
        img.src=newSrc
}

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();//when refereseh it does not referesh the page 
    updateExchangeRate()
    
})


window.addEventListener("load",()=>{
    updateExchangeRate();   
})



