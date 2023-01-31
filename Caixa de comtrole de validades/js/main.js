const formulario = document.getElementById("novoItem");
const lista = document.getElementById('lista')

const itens = JSON.parse(localStorage.getItem('itens')) || []


itens.forEach( (element) => {
    criarElemento(element)
});

var praso = new Date();

var dia = String(praso.getDate()).padStart(2 ,'0');
var mes = String(praso.getMonth()+1).padStart(2,'0');
var ano = praso.getFullYear();

var dataDeHoje = `${ano}-${mes}-${dia}`;

var mesNovo = String(parseInt(mes)+1.).padStart(2 ,'0')
var anoNovo = `${ano+1}`

var dataUmNaFrente= `${ano}-${mesNovo}-${dia}`;

if (mesNovo == 13) {
    
    mesNovoNovo = String(parseInt(mesNovo )- 12)
    
    dataUmNaFrente= `${anoNovo}-${mesNovoNovo}-${dia}`;
    
}
//console.log(dataDeHoje);
//console.log(dataUmMesAtras);

formulario.addEventListener('submit' , (eventoSubmit)=>{
    eventoSubmit.preventDefault();//preivir que o subite haja de forma normal
    
    const nome = eventoSubmit.target.elements['nome'];
    const quantidade = eventoSubmit.target.elements['quantidade'];
    const data = eventoSubmit.target.elements['data'];
    
   
    const itemAtual = {
        'nome':nome.value,
        'quantidade':quantidade.value,
        'data':data.value,
    }

    itens.push(itemAtual)

    criarElemento(itemAtual)
    itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id +1 :0;

    localStorage.setItem('itens',JSON.stringify(itens))
    
      nome.value='',
      quantidade.value='',
      data.value=''
        
        
    
       
})

function criarElemento(itens){
    
    
    

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = itens.quantidade
    
    const dataDeComparaçao =  itens.data ;
    //adicinar uma classe pra mudar a cor de acorsdo com a data 
   console.log(dataDeComparaçao)
    if(dataDeComparaçao <= dataDeHoje){
        numeroItem.classList.add('vermelho');
    }else{
        if (dataDeComparaçao <= dataUmNaFrente){
            numeroItem.classList.add('amarelo');
        }
        else{
           
                numeroItem.classList.add('verde');
            
        }
            
    }
    novoItem.dataset.id = itens.id
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += itens.nome;
    
    const lista = document.getElementById('lista')

    novoItem.appendChild(elementoDeApagar(itens.id))
    lista.appendChild(novoItem)
    
    }

function elementoDeApagar(id){
        const botaoDeApagar = document.createElement("button")
        botaoDeApagar.innerText = "x"
        botaoDeApagar.addEventListener('click',function (){
            apagaelemento(this.parentNode, id)
        })

        return botaoDeApagar
    }
function apagaelemento(elemnetoHTML, id){
        elemnetoHTML.remove()
        itens.splice(itens.findIndex(element => element.id == id),1)
        console.log(itens)
        localStorage.setItem('itens', JSON.stringify(itens))
    }