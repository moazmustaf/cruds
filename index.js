let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let catogry=document.getElementById('catogry')
let submit=document.getElementById('submit')
let mood='create';
let tmp;



// get total
function getotal(){
if(price.value !=''){
    let result=(+price.value + +taxes.value + +ads.value)
    - +discount.value;
    total.innerHTML=result;
    total.style.background='#040';
}else{
    total.innerHTML='';
    total.style.background='#bf0101';

}
}
// create product
let datapro;
if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}
submit.onclick=function(){
    let nwepro= {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catogry:catogry.value,
    }
 if(title.value !='' && price.value !=''
     && taxes.value!='' && ads.value !=''
     && discount.value!=''
       && catogry.value!=''
    && nwepro.count<100){

     if(mood==='create'){
 
         if (nwepro.count > 1){
             for( let i=0; i< nwepro.count; i++){
                 datapro.push(nwepro);
             }
         }else{
             datapro.push(nwepro);
         
         
         }
 
             
     }else{
 
         datapro[ tmp  ]=nwepro;
         mood='create';
         submit.innerHTML='create';
         count.style.display='block';
 
     }
     cleardata()
 }
 

    // save localstorge
    localStorage.setItem('product' , JSON.stringify(datapro))
    
    showData()
}
// clear input
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    catogry.value='';
}

//read
function showData()
{

    getotal()
let table='';
for(let i=0; i < datapro.length; i++){
   table+=`  
   <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catogry}</td>
             <td><button onclick="Updatedata(${i})" id="Update">Update</button></td>
            <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
   `;
}
document.getElementById('tbody').innerHTML=table;
let deleteAll=document.getElementById('deleteAll');
if(datapro.length>0){
    deleteAll.innerHTML=`
    <button onclick="deleteAll()">deleteAll ${datapro.length} </button>
    `
}else{
    deleteAll.innerHTML='';
}
}
showData()
// delete
function deleteData(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro)
    showData()
}
function deleteAll(){
    localStorage.clear()
    datapro.splice(0);
    showData()
}

// update
function Updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getotal()
    catogry.value=datapro[i].catogry;
    catogry.style.display='none';
    submit.innerHTML='update';
    mood='update';
    tmp=i;
    scroll({
top:0,
behavior:'smooth',
    })
    


}



// search
let searchmood='title';

function getsearchmood(id){
    let search=document.getElementById('search');
    if(id == 'searchtitle'){
        searchmood='title';
    }else{
        searchmood='catogry';

    }
    search.placeholder='search By '+searchmood;


    search.focus()

    search.value='';
    showData()

}


function searchData(value)
{
    let table='';
    for(let i=0; i < datapro.length; i++){
    if(searchmood == 'title')
        {
     
        
            if(datapro[i].title.toLowerCase().includes(value))
                {
                table+=`  
                <tr>
                         <td>${i}</td>
                         <td>${datapro[i].title}</td>
                         <td>${datapro[i].price}</td>
                         <td>${datapro[i].taxes}</td>
                         <td>${datapro[i].ads}</td>
                         <td>${datapro[i].discount}</td>
                         <td>${datapro[i].total}</td>
                         <td>${datapro[i].catogry}</td>
                          <td><button onclick="Updatedata(${i})" id="Update">Update</button></td>
                         <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
                     </tr>
                `;
             }
        
         
        }

    else{  
            if(datapro[i].catogry.includes(value.toLowerCase()))
                {
                table+=`  
                <tr>
                         <td>${i}</td>
                         <td>${datapro[i].title}</td>
                         <td>${datapro[i].price}</td>
                         <td>${datapro[i].taxes}</td>
                         <td>${datapro[i].ads}</td>
                         <td>${datapro[i].discount}</td>
                         <td>${datapro[i].total}</td>
                         <td>${datapro[i].catogry}</td>
                          <td><button onclick="Updatedata(${i})" id="Update">Update</button></td>
                         <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
                     </tr>
                `;
             }
                
         
    }
}
    document.getElementById('tbody').innerHTML=table;

}
