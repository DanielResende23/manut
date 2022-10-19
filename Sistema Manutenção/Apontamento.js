const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sOrdemServico = document.querySelector('#m-os')
const sData = document.querySelector('#m-data')
const sMatrícula = document.querySelector('#m-matricula')
const sOcorrência = document.querySelector('#m-ocorrencia')
const sHorainício = document.querySelector('#m-hinicio')
const sHoraTérmino = document.querySelector('#m-htermino')
const sTotalMinutos = document.querySelector('#m-tminutos')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e=> {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        sData.value = itens[index].data
        sOcorrência.value = itens[index].ocorrencia
        sOrdemServico.value = itens[index].os
        sMatrícula.value = itens[index].matricula
        sHorainício.value = itens[index].horainicio
        sHoraTérmino.value = itens[index].horatermino
        sTotalMinutos.value = itens[index].totalminutos
        id = index
    } else {
        sData.value = ''
        sOrdemServico.value = ''
        sOcorrência.value = ''
        sMatrícula.value = ''
        sHorainício.value = ''
        sHoraTérmino.value = ''
        sTotalMinutos.value = ''
    }

}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.os}</td>
    <td>${item.data}</td>
    <td>${item.matricula}</td>
    <td>R$ ${item.ocorrencia}</td>
    <td>R$ ${item.horainicio}</td>
    <td>R$ ${item.horatermino}</td>
    <td>R$ ${item.totalminutos}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    
  `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

    if (sData.value == '' || sHoraTérmino.value == '' || sMatrícula.value == '' || sOcorrência.value == '' || sHorainício.value == ''
    || sOrdemServico.value == '' || sTotalMinutos.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].data = sData.value
        itens[id].horatermino = sHoraTérmino.value
        itens[id].horainicio = sHorainício.value
        itens[id].os = sOrdemServico.value
        itens[id].totalminutos = sTotalMinutos.value
        itens[id].matricula = sMatrícula.value
        itens[id].ocorrencia = sOcorrência.value
    } else {
        itens.push({ 'data': sData.value, 'ocorrencia': sOcorrência.value, 'matricula': sMatrícula.value,
         'horatermino': sHoraTérmino.value, 'horainicio': sHorainício.value , 'os': sOrdemServico.value, 'totalminutos': sTotalMinutos.value  })
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })

}


const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()