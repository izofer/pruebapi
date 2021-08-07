var $api = localStorage.getItem('api')
var url  = `${$api}/pruebapi/public/api`
var token = localStorage.getItem('token')
var text = document.getElementById('warnText')
var $id = localStorage.getItem('id')
index()
logout()
delet()

function index()
{
	if(localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === null)
	{
		location.href = "login.html"
	}
	else
	{
		enter()
		getUser()
	}
}


function getUser()
{
	fetch(`${url}/profile/${$id}`,{
		headers:{
			'Authorization':`Bearer ${token}`,
			'Accept':'application/json',
		},
		method: "GET",
	})
	.then((response)=>{
		if(response.status === 401)
		{
			localStorage.removeItem('token')
			location.reload()
		}
		else
		{
			return response.json()
		}
	})
	.then((data)=>{
		if(data.errors)
		{
			text.innerHTML = `El usuario ${data.error}`
		}
		else
		{
			if(data.response)
			{	
				document.getElementById('rol_id').value = data.data.rol_id
				document.getElementById('name').value = data.data.name
				document.getElementById('identification').value = data.data.identification
				document.getElementById('email').value = data.data.email
				document.getElementById('cellphone').value = data.data.cellphone
			}
		}
	})
	.catch((error)=>{
		console.log(error)
	})
}

function editUser()
{

	let payload = {
		"rol_id":document.getElementById('rol_id').value,
		"name":document.getElementById('name').value,
		"identification":document.getElementById('identification').value,
		"email":document.getElementById('email').value,
		"cellphone":document.getElementById('cellphone').value,
	}

	fetch(`${url}/profile/${$id}`,{
		headers:{
			'Authorization':`Bearer ${token}`,
			'Accept':'application/json',
			'Content-Type':'application/json'
		},
		method: "PUT",
		body:JSON.stringify(payload)
	})
	.then((response)=>{
		if(response.status === 401)
		{
			localStorage.removeItem('token')
			location.reload()
		}
		else
		{
			return response.json()
		}
	})
	.then((data)=>{
		console.log(data)
		if(data.errors || !data.response )
		{
			text.innerHTML = `El usuario ${data.error}`
		}
		else{
			if(data.response)
			{	
				text.innerHTML = `${data.message}`
			}
		}
	})
	.catch((error)=>{
		console.log(error)
	})
}

function enter()
{
	const btn = document.getElementById('btn')

	btn.addEventListener('click',(e) => {
   		text.innerHTML = 'Agregando usuario...'
		editUser()
	})	
}

function atras()
{
	localStorage.removeItem('id')
	location.href = 'inicio.html'
}

function logout()
{
	let logout = document.getElementById('apiLogout')

	logout.addEventListener('click',() => {

		fetch(`${url}/logout`,{
			headers:{
				'Authorization':`Bearer ${token}`
			},
			method: "POST",
		})
		.then((response)=>{
			return response.json()
		})
		.then((data)=>{
			localStorage.removeItem('token')
			location.href ="login.html"
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}

function delet()
{
	let delet = document.getElementById('delete')
	let id = localStorage.getItem('id')

	delet.addEventListener('click',()=>{

		fetch(`${url}/profile/${id}`,{
			headers:{
				'Authorization':`Bearer ${token}`,
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			method: "DELETE",
		})
		.then((response)=>{
			if(response.status === 401)
			{
				localStorage.removeItem('token')
				location.reload()
			}
			else
			{
				return response.json()
			}
		})
		.then((data)=>{
			if(data.errors)
			{
				text.innerHTML = `La ${data.errors.city[0]}`
			}
			else
			{
				if(data.response)
				{	
					text.innerHTML = `${data.message} Redirigiendo...`
				}
				else
				{
					text.innerHTML = `${data.error}`
				}
			}

			setTimeout((e)=>{
				location.href = "inicio.html"
			},3000)
		})
		.catch((error)=>{
			console.log(error)
		})

	})
}